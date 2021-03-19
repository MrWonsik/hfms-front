import config from 'config';
import { httpHelper } from "../../_helpers"
import { getJwtToken } from "../../index"

export const getAllUsersCall = () => {

    const requestOptions = {
        method: 'GET',
        headers: httpHelper.addAuthHeader({}, getJwtToken())
    };

    return fetch(`${config.apiUrl}/api/user`, requestOptions)
    .then(httpHelper.handleResponse)
    .catch((error) => {
        return Promise.reject(error.toString());
    });
}

export const  editUserStatusCall = (id, isEnabled) => {

    const requestOptions = {
        method: 'PUT',
        headers: httpHelper.addAuthHeader({ 'Content-Type': 'application/json' }, getJwtToken()),
        body: JSON.stringify({ isEnabled })
    };

    return fetch(`${config.apiUrl}/api/user/${id}`, requestOptions)
        .then(httpHelper.handleResponse)
        .catch((error) => {
            return Promise.reject(error.toString());
        });
}


export const deleteUser = (id) => {

    const requestOptions = {
        method: 'DELETE',
        headers: httpHelper.addAuthHeader({}, getJwtToken())
    };

    return fetch(`${config.apiUrl}/api/user/${id}`, requestOptions)
        .then(httpHelper.handleResponse)
        .catch((error) => {
            return Promise.reject(error.toString());
        });
}