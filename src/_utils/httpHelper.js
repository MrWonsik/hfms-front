import { store } from ".."

export const httpHelper = {
  addAuthHeader,
  handleResponse,
  handleError
}

function addAuthHeader (headers) {
  const token = store.getState().user?.user?.token
  if (token) {
    return {
      ...headers,
      Authorization: token
    }
  } else {
    return { ...headers }
  }
}

function handleResponse (response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      const error = {
        msg: (data && data.message) || response.statusText
      }
      error.response = response.status
      return Promise.reject(error)
    }
    return data
  })
}

function handleError (error) {
  const errorResp = { msg: error.msg ? error.msg : 'A server error has occurred: ' + error.toString() }
  return Promise.reject(errorResp)
}
