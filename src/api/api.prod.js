const api = {
    apiEndPoint: window.apiEndpoint,

    searchCustomers: async function (searchText) {
        if (!searchText) {
            return wrap([]);
        }

        const url = `${api.apiEndPoint}&action=searchCustomers&searchText=${searchText}`;

        const response = await this.makeAjaxCall(url);

        return await response.json();
    },

    getCustomerDetails: async function(customerId) {
        const url = `${api.apiEndPoint}&action=getCustomerDetails&customerId=${customerId}`;

        const response = await this.makeAjaxCall(url);

        return await response.json();
    },

    getCustomerActivity: async function(customerId) {
        const url = `${api.apiEndPoint}&action=getCustomerActivity&customerId=${customerId}`;

        const response = await this.makeAjaxCall(url);

        return await response.json();
    },

    getProducts: async function ({ title, author, category }) {
        const url = `${api.apiEndPoint}&action=getProducts&title=${title}&author=${author}&category=${category}`;

        const response = await this.makeAjaxCall(url);

        return await response.json();
    },

    getCategories: async function () {
        const url = `${api.apiEndPoint}&action=getCategories`;

        const response = await this.makeAjaxCall(url);

        return await response.json();
    },

    getOpenPOs: async function () {
        const url = `${api.apiEndPoint}&action=getOpenPurchaseOrders`;

        const response = await this.makeAjaxCall(url);

        return await response.json();
    },

    makeAjaxCall: function (url, data = null, method = 'GET') {
        return fetch(url, {
            method: method,
            mode: 'cors',
            body: data ? JSON.stringify(data) : null,
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        });
    },
};

function wrap(response) {
    return {
        result: response,
        elapsedTime: 0.01,
        governanceRemaining: 5000,
    };
}

export default api;
