import { wrap, emptyResponse, delay } from '../lib/util';

const api = {
    searchCustomers: async function (searchText) {
        if (!searchText) {
            return emptyResponse();
        }

        return delay(500).then(async () => {
            const response = await fetch('http://localhost:8000/customers');
            const customers = await response.json();

            const result = customers.filter(customer => {
                return (
                    customer.companyName
                        ?.toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    customer.email
                        ?.toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    customer.phone
                        ?.toLowerCase()
                        .includes(searchText.toLowerCase())
                );
            });

            return wrap(result);
        });
    },

    getCustomerDetails: async function(customerId) {
        return delay(500).then(async () => {
            const response = await fetch('http://localhost:8000/customerDetails');
            const customers = await response.json();

            return wrap(customers);
        });
    },

    getCustomerActivity: async function(customerId) {
        return delay(500).then(async () => {
            const response = await fetch('http://localhost:8000/activity');
            const activity = await response.json();

            return wrap(activity.sort((a, b) => b.date - a.date));
        });
    },

    getCategories: async function () {
        return delay(500).then(async () => {
            const response = await fetch('http://localhost:8000/categories');
            const categories = await response.json();

            return wrap(categories);
        });
    },

    getProducts: async function ({ title, author, category }) {
        return delay(500).then(async () => {
            const response = await fetch('http://localhost:8000/products');
            const products = await response.json();

            const filteredProducts = products
                .filter(
                    p =>
                        !title ||
                        p.description
                            .toLowerCase()
                            .includes(title.toLowerCase()),
                )
                .filter(
                    p =>
                        !author ||
                        p.author.toLowerCase().includes(author.toLowerCase()),
                )
                .filter(p => !category || p.categoryId === category);

            return wrap(filteredProducts);
        });
    },

    getOpenPurchaseOrders: async function () {
        return delay(500).then(async () => {
            const response = await fetch('http://localhost:8000/purchaseOrders');
            const openPOs = await response.json();

            return wrap(openPOs);
        })
    }
};

export default api;
