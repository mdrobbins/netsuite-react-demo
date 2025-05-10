/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @NModuleScope Public
 */
define([
    'N/error',
    'N/log',
    'N/query',
    'N/runtime',
    './dt.tryCatch',
    './dt.timer',
], function (error, log, query, runtime, tryCatch, Timer) {
    function get(request) {
        const timer = new Timer();

        const { action } = request;

        const actionRouter = {
            searchCustomers,
            getCustomerDetails,
            getProducts,
            getCategories,
            getOpenPurchaseOrders,
        };

        const handler = actionRouter[action] || invalidAction;

        const response = tryCatch(handler, request);

        return {
            ...response,
            elapsedTime: timer.getElapsedSeconds(),
            governanceRemaining: runtime.getCurrentScript().getRemainingUsage(),
        };
    }

    //////////////////////////////////////////////

    function searchCustomers({ searchText }) {
        const filter = searchText.toLowerCase();

        return query
            .runSuiteQL({
                query: `
                    select c.id,
                           c.companyname as company_name,
                           c.email       as email,
                           c.phone       as phone,
                           ea.city       as billing_city,
                           ea.state      as billing_state
                    
                    from customer c
                             inner join entityaddress ea on ea.nkey = c.defaultbillingaddress
                    where 1 = 1
                      and (
                        LOWER(c.companyname) like '%${filter}%'
                            or LOWER(entityid) like '%${filter}%'
                            or LOWER(email) like '%${filter}%'
                            or REGEXP_REPLACE(c.phone, '\D') like '%${filter}%'
                        )
                        
                    order by c.companyname
            `,
            })
            .asMappedResults()
            .map(mapPropertiesToCamelCase);
    }

    function getCustomerDetails({ customerId }) {
        const metrics = getCustomerMetrics(customerId);

        const customerData = getCustomerData(customerId);

        const { id, companyName, email, phone } = customerData[0];

        const shippingAddress = getAddress('shipping', customerData);
        const billingAddress = getAddress('billing', customerData);

        return {
            id,
            companyName,
            email,
            phone,
            metrics,
            shippingAddress,
            billingAddress,
        };
    }

    function getAddress(type, customerData) {
        const address = customerData.find(a => a[type] === 'T');

        const { address1, address2, city, state, zip, country } = address;

        return {
            address1,
            address2,
            city,
            state,
            zip,
            country,
        };
    }

    function getCustomerData(customerId) {
        return query.runSuiteQL({
            query: `
                select c.id,
                       c.companyname       as company_name,
                       c.email,
                       c.phone,
                       cab.defaultshipping as shipping,
                       cab.defaultbilling  as billing,
                       cabea.addr1         as address1,
                       cabea.addr2         as address2,
                       cabea.city,
                       cabea.state,
                       cabea.zip,
                       cabea.country,

                from customer c
                         left join customeraddressbook cab
                                   on cab.entity = c.id and (cab.defaultbilling = 'T' or cab.defaultshipping = 'T')
                         inner join customerAddressbookEntityAddress cabea on cab.addressbookaddress = cabea.nkey

                where 1 = 1
                  and c.id = ${customerId}
            `
        }).asMappedResults().map(mapPropertiesToCamelCase);
    }

    function getCustomerMetrics(customerId) {
        const results = query.runSuiteQL({
            query: `
                select --top 10
                       tl.mainline                                                             as main_line,
                       case when mainline = 'T' then foreignamount else foreignamount * -1 end as amount,
                       tl.foreignamountunpaid                                                  as remaining,
                       tl.item                                                                 as item_id,
                       BUILTIN.DF(tl.item)                                                     as item_name,
                       tl.duedate                                                              as due_date,
                       tl.quantity * -1                                                        as quantity,
                
                from transaction t
                         inner join transactionline tl on tl.transaction = t.id
                
                where 1 = 1
                  and t.entity = ${customerId}
                  and t.recordtype = 'invoice'
                  and tl.mainline = 'T'
                  and tl.taxline = 'F'
                  and tl.iscogs = 'F'
                  and (tl.itemtype is null or tl.itemtype != 'ShipItem')
            `
        }).asMappedResults().map(mapPropertiesToCamelCase);

        const totalSpend = results
            .filter(r => r.mainLine === 'T')
            .reduce((acc, item) => acc + item.amount, 0);

        const orderCount = results
            .filter(r => r.mainLine === 'T')
            .length;

        const openBalance = results
            .filter(r => r.mainLine === 'T')
            .reduce((acc, item) => acc + item.remaining, 0);

        const pastDueBalance = results
            .filter(r => r.mainLine === 'T' && r.remaining > 0 && new Date(r.dueDate) < new Date())
            .reduce((acc, item) => acc + item.remaining, 0);

        return { totalSpend, orderCount, openBalance, pastDueBalance };
    }

    function getProducts({ title, author, category }) {
        let filter = '';

        if (title) {
            filter = `${filter} AND lower(description) like '%${title.toLowerCase()}%'`;
        }

        if (author) {
            filter = `${filter} AND lower(custitem_dt_author) like '%${author.toLowerCase()}%'`;
        }

        if (category) {
            filter = `${filter} AND custitem_dt_category = ${category}`;
        }

        return query
            .runSuiteQL({
                query: `
                select top 10
                    i.id,
                    i.itemid                            as item_number,
                    i.description                       as description,
                    i.custitem_dt_author                as author,
                    i.custitem_dt_image_url             as image_url,
                    i.itemid                            as item_name,
                    i.custitem_dt_category              as category_id,
                    BUILTIN.DF(i.custitem_dt_category)  as category,
                    i.custitem_dt_reviews               as review_count,
                    i.custitem_dt_rating                as rating
                    
                from item i
                
                where 1 = 1
                    and i.itemtype = 'NonInvtPart'
                    ${filter}            
            `,
            })
            .asMappedResults()
            .map(mapPropertiesToCamelCase);
    }

    function getCategories() {
        return query
            .runSuiteQL({
                query: `
                select
                    id   as value,
                    name as text
                    
                from customlist_dt_book_category
            `,
            })
            .asMappedResults()
            .map(mapPropertiesToCamelCase);
    }

    function getOpenPurchaseOrders() {
        return query
            .runSuiteQL({
                query: `
                    select t.id,
                           t.tranid                     as po_number,
                           t.trandate                   as date,
                           t.entity                     as vendor_id,
                           BUILTIN.DF(t.entity)         as vendor_name,
                           t.status                     as status,
                           BUILTIN.DF(t.status)         as status_name,
                           t.approvalstatus             as approval_status,
                           BUILTIN.DF(t.approvalstatus) as approval_status_name,
                           abs(tl.foreignamount)        as amount,
                    from transaction t
                        inner join transactionline tl on tl.transaction = t.id and tl.mainline = 'T'
                    where 1 = 1
                      and t.recordtype = 'purchaseorder'
                      and t.status in ('PurchOrd:A', 'PurchOrd:B')
                `
            }).asMappedResults().map(mapPropertiesToCamelCase);
    }

    function invalidAction({ action }) {
        log.error({
            title: 'INVALID_ACTION',
            details: `Invalid Action: ${action}`,
        });

        throw error.create({
            name: 'INVALID_ACTION',
            message: `Invalid Action: ${action}`,
            notifyOff: true,
        });
    }

    function mapPropertiesToCamelCase(result) {
        const newResult = {};

        for (let prop in result) {
            if (!result.hasOwnProperty(prop)) {
                continue;
            }

            const newProperty = snakeToCamel(prop);

            newResult[newProperty] = result[prop];
        }

        return newResult;
    }

    function snakeToCamel(str) {
        if (!/[_-]/.test(str)) {
            return str;
        }

        return str
            .toLowerCase()
            .replace(/([-_][a-z])/g, group =>
                group.toUpperCase().replace('-', '').replace('_', ''),
            );
    }

    return {
        get,
    };
});
