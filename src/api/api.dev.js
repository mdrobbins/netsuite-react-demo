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
};

export default api;
