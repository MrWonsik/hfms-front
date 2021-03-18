export const httpHelper = {
    addAuthHeader,
    handleResponse
}

function addAuthHeader(headers, token) {
    if (token) {
        return { 
            ...headers,
            'Authorization': token };
    } else {
        return { ...headers };
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            throw Error(error);
        }
        return data;
    });
}