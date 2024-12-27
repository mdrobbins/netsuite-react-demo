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
                           c.email,
                           c.phone,
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
