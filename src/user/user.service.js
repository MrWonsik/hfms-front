import config from 'config'
import { parseJwt, httpHelper } from '../_helpers'
import { getJwtToken } from '../index'

export const loginRequestCall = (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }

  return fetch(`${config.API_URL}/api/auth/sign`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(jwt => {
      const decodedJwt = parseJwt(jwt.token)
      const user = decodedJwt?.userInfo
      user.token = jwt.token
      return user
    }).catch(httpHelper.handleError)
}

export const changePasswordRequestCall = (oldPassword, newPassword, repeatedNewPassword) => {
  const requestOptions = {
    method: 'POST',
    headers: httpHelper.addAuthHeader({ 'Content-Type': 'application/json' }, getJwtToken()),
    body: JSON.stringify({ oldPassword, newPassword, repeatedNewPassword })
  }

  return fetch(`${config.API_URL}/api/user/password`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(data => {
      return data
    }).catch(httpHelper.handleError)
}
