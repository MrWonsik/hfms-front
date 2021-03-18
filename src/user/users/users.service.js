import config from 'config';
import { httpHelper } from "../../_helpers"

export const getAllUsersCall = (token) => {
    const requestOptions = {
        method: 'GET',
        headers: httpHelper.addAuthHeader({}, token)
    };

    return fetch(`${config.apiUrl}/api/user`, requestOptions)
    .then(httpHelper.handleResponse)
    .catch((error) => {
        return Promise.reject(error.toString());
    });
}