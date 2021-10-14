import config from 'config'
import { httpHelper } from '../../_utils'

export const getAllUsersCall = () => {
  const requestOptions = {
    method: 'GET',
    headers: httpHelper.addAuthHeader({})
  }

  return fetch(`${config.API_URL}/api/user`, requestOptions)
    .then(httpHelper.handleResponse)
    .catch(httpHelper.handleError)
}

export const editUserStatusCall = (id, isEnabled) => {
  const requestOptions = {
    method: 'PUT',
    headers: httpHelper.addAuthHeader(
      { 'Content-Type': 'application/json' }
    ),
    body: JSON.stringify({ isEnabled })
  }

  return fetch(`${config.API_URL}/api/user/${id}`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(user => user)
    .catch(httpHelper.handleError)
}

export const editUserPasswordCall = (newPassword, id) => {
  const requestOptions = {
    method: 'PUT',
    headers: httpHelper.addAuthHeader(
      { 'Content-Type': 'application/json' }
    ),
    body: JSON.stringify({ password: newPassword })
  }

  return fetch(`${config.API_URL}/api/user/${id}`, requestOptions)
    .then(httpHelper.handleResponse)
    .catch(httpHelper.handleError)
}

export const deleteUserCall = (id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: httpHelper.addAuthHeader({})
  }

  return fetch(`${config.API_URL}/api/user/${id}`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(user => user)
    .catch(httpHelper.handleError)
}

export const createUserCall = (username, password, role) => {
  const requestOptions = {
    method: 'POST',
    headers: httpHelper.addAuthHeader(
      { 'Content-Type': 'application/json' }
    ),
    body: JSON.stringify({ username, password, role })
  }

  return fetch(`${config.API_URL}/api/user`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(user => user)
    .catch(httpHelper.handleError)
}
