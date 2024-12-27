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
