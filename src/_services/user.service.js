import config from 'config';
import { parseJwt } from '../_helpers';
// import { authHeader } from '../_helpers';

export const userService = {
    login,
    // getAll
};

function login(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/api/auth/sign`, requestOptions)
        .then(handleResponse)
        .then(jwt => {
            let decodedJwt = parseJwt(jwt.token);
            let userInfo = decodedJwt && decodedJwt.userInfo;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return userInfo;
        });
}

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

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
            return Promise.reject(error);
        }
        return data;
    });
}