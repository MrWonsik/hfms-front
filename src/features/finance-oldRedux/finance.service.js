import config from 'config'
import { httpHelper, mapCategoryTypeToDomain, mapTransactionTypeToDomain } from '../../_services'
import { getJwtToken } from '../../index'

// <================= SHOPS:

export const getShopsCall = () => {
  const requestOptions = {
    method: 'GET',
    headers: httpHelper.addAuthHeader({}, getJwtToken())
  }

  return fetch(`${config.API_URL}/api/shop`, requestOptions)
    .then(httpHelper.handleResponse)
    .catch(httpHelper.handleError)
}

export const createShopCall = (shopName) => {
  const requestOptions = {
    method: 'POST',
    headers: httpHelper.addAuthHeader(
      { 'Content-Type': 'application/json' },
      getJwtToken()
    ),
    body: JSON.stringify({ name: shopName })
  }

  return fetch(`${config.API_URL}/api/shop`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(shop => shop)
    .catch(httpHelper.handleError)
}

export const deleteShopCall = (id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: httpHelper.addAuthHeader({}, getJwtToken())
  }

  return fetch(`${config.API_URL}/api/shop/${id}`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(shop => shop)
    .catch(httpHelper.handleError)
}

// <================= CATEGORIES

export const getCategoriesCall = (categoryType) => {
  const type = mapCategoryTypeToDomain(categoryType).toLowerCase()

  const requestOptions = {
    method: 'GET',
    headers: httpHelper.addAuthHeader({}, getJwtToken())
  }

  return fetch(`${config.API_URL}/api/category/${type}`, requestOptions)
    .then(httpHelper.handleResponse)
    .catch(httpHelper.handleError)
}

export const createCategoryCall = (category) => {
  const type = mapCategoryTypeToDomain(category.categoryType)
  category.categoryType = type
  const requestOptions = {
    method: 'POST',
    headers: httpHelper.addAuthHeader(
      { 'Content-Type': 'application/json' },
      getJwtToken()
    ),
    body: JSON.stringify(category)
  }

  return fetch(`${config.API_URL}/api/category/${type}`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(createdCategory => createdCategory)
    .catch(httpHelper.handleError)
}

export const changeStateFavouriteCategoryCall = (category) => {
  const type = mapCategoryTypeToDomain(category.type)
  const requestOptions = {
    method: 'PATCH',
    headers: httpHelper.addAuthHeader(
      { 'Content-Type': 'application/json' },
      getJwtToken()
    ),
    body: JSON.stringify({ isFavourite: !category.favourite })
  }

  return fetch(`${config.API_URL}/api/category/${type}/favourite/${category.id}`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(expenseCategory => expenseCategory)
    .catch(httpHelper.handleError)
}

export const deleteCategoryCall = (id, categoryType) => {
  const type = mapCategoryTypeToDomain(categoryType)

  const requestOptions = {
    method: 'DELETE',
    headers: httpHelper.addAuthHeader({}, getJwtToken())
  }

  return fetch(`${config.API_URL}/api/category/${type}/${id}`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(deletedCategory => deletedCategory)
    .catch(httpHelper.handleError)
}

export const editExpenseCategoryMaximumAmountCall = (categoryId, newMaximumAmount, isValidFromNextMonth) => {
  const requestOptions = {
    method: 'PUT',
    headers: httpHelper.addAuthHeader(
      { 'Content-Type': 'application/json' },
      getJwtToken()
    ),
    body: JSON.stringify({ newMaximumAmount, isValidFromNextMonth })
  }

  return fetch(`${config.API_URL}/api/category/expense/${categoryId}/version`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(editedCategoryVersion => editedCategoryVersion)
    .catch(httpHelper.handleError)
}

export const editCategoryCall = (categoryId, categoryName, colorHex, categoryType) => {
  const type = mapCategoryTypeToDomain(categoryType).toLowerCase()
  const requestOptions = {
    method: 'PATCH',
    headers: httpHelper.addAuthHeader(
      { 'Content-Type': 'application/json' },
      getJwtToken()
    ),
    body: JSON.stringify({ categoryName, colorHex })
  }

  return fetch(`${config.API_URL}/api/category/${type}/${categoryId}`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(editedCategory => editedCategory)
    .catch(httpHelper.handleError)
}

export const getTransactionsCall = (transactionType, date) => {
  const type = mapTransactionTypeToDomain(transactionType).toLowerCase()

  const requestOptions = {
    method: 'GET',
    headers: httpHelper.addAuthHeader({}, getJwtToken())
  }

  const urlGetRequest = date ? `${config.API_URL}/api/transaction/${type}?year=${date.year}&month=${date.month + 1}` : `${config.API_URL}/api/transaction/${type}`

  return fetch(urlGetRequest, requestOptions)
    .then(httpHelper.handleResponse)
    .catch(httpHelper.handleError)
}

export const createTransactionCall = (transaction) => {
  const type = mapTransactionTypeToDomain(transaction.transactionType)
  transaction.transactionType = type
  const formData = new FormData()
  transaction.receiptFile && formData.append('file', transaction.receiptFile)
  formData.append('transaction', new Blob([JSON.stringify(transaction)], {
    type: 'application/json'
  }))

  const requestOptions = {
    method: 'POST',
    headers: httpHelper.addAuthHeader({}, getJwtToken()),
    body: formData
  }

  return fetch(`${config.API_URL}/api/transaction/${type}`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(createdTransaction => createdTransaction)
    .catch(httpHelper.handleError)
}

export const deleteTransactionCall = (transactionId, transactionType) => {
  const type = mapTransactionTypeToDomain(transactionType)

  const requestOptions = {
    method: 'DELETE',
    headers: httpHelper.addAuthHeader({}, getJwtToken())
  }

  return fetch(`${config.API_URL}/api/transaction/${type}/${transactionId}`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(deletedTransaction => deletedTransaction)
    .catch(httpHelper.handleError)
}

export const getExpenseFileCall = (transactionId) => {
  const requestOptions = {
    method: 'GET',
    headers: httpHelper.addAuthHeader({}, getJwtToken())
  }

  return fetch(`${config.API_URL}/api/transaction/expense/${transactionId}/file`, requestOptions)
    .then(httpHelper.handleResponse)
    .catch(httpHelper.handleError)
}

export const deleteExpenseFileCall = (transactionId) => {
  const requestOptions = {
    method: 'DELETE',
    headers: httpHelper.addAuthHeader({}, getJwtToken())
  }

  return fetch(`${config.API_URL}/api/transaction/expense/${transactionId}/file`, requestOptions)
    .then(httpHelper.handleFileResponse)
    .catch(httpHelper.handleError)
}

export const uploadExpenseFileCall = (transactionId, receiptFile) => {
  const formData = new FormData()
  receiptFile && formData.append('file', receiptFile)

  const requestOptions = {
    method: 'POST',
    headers: httpHelper.addAuthHeader({}, getJwtToken()),
    body: formData
  }

  return fetch(`${config.API_URL}/api/transaction/expense/${transactionId}/file`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(transactionFile => transactionFile)
    .catch(httpHelper.handleError)
}

export const updateTransactionCall = (transaction) => {
  const type = mapTransactionTypeToDomain(transaction.transactionType)
  transaction.transactionType = type
  const requestOptions = {
    method: 'PUT',
    headers: httpHelper.addAuthHeader(
      { 'Content-Type': 'application/json' },
      getJwtToken()
    ),
    body: JSON.stringify(transaction)
  }

  return fetch(`${config.API_URL}/api/transaction/${type}/${transaction.id}`, requestOptions)
    .then(httpHelper.handleResponse)
    .then(editedTransaction => editedTransaction)
    .catch(httpHelper.handleError)
}
