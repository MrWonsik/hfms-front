import config from "config";
import { httpHelper, mapCategoryTypeToDomain, mapTransactionTypeToDomain } from "../_helpers";
import { getJwtToken } from "../index";


// <================= SHOPS:

export const getShopsCall = () => {
	const requestOptions = {
		method: "GET",
		headers: httpHelper.addAuthHeader({}, getJwtToken()),
	};

	return fetch(`${config.apiUrl}/api/shop`, requestOptions)
		.then(httpHelper.handleResponse)
		.catch(httpHelper.handleError);
};

export const createShopCall = (shopName) => {
	const requestOptions = {
		method: "POST",
		headers: httpHelper.addAuthHeader(
			{ "Content-Type": "application/json" },
			getJwtToken()
		),
		body: JSON.stringify({ shopName }),
	};

	return fetch(`${config.apiUrl}/api/shop`, requestOptions)
		.then(httpHelper.handleResponse)
		.then(shop => shop)
		.catch(httpHelper.handleError);
};

export const deleteShopCall = (id) => {
	const requestOptions = {
		method: "DELETE",
		headers: httpHelper.addAuthHeader({}, getJwtToken()),
	};

	return fetch(`${config.apiUrl}/api/shop/${id}`, requestOptions)
		.then(httpHelper.handleResponse)
		.then(shop => shop)
		.catch(httpHelper.handleError);
};

// <================= CATEGORIES

export const getCategoriesCall = ( categoryType ) => {
	let type = mapCategoryTypeToDomain(categoryType).toLowerCase(); 

	const requestOptions = {
		method: "GET",
		headers: httpHelper.addAuthHeader({}, getJwtToken()),
	};

	return fetch(`${config.apiUrl}/api/category/${type}`, requestOptions)
		.then(httpHelper.handleResponse)
		.catch(httpHelper.handleError);
};

export const createCategoryCall = (category) => {
	let type = mapCategoryTypeToDomain(category.categoryType); 
	category.categoryType = type;
	const requestOptions = {
		method: "POST",
		headers: httpHelper.addAuthHeader(
			{ "Content-Type": "application/json" },
			getJwtToken()
		),
		body: JSON.stringify(category),
	};

	return fetch(`${config.apiUrl}/api/category/${type}`, requestOptions)
		.then(httpHelper.handleResponse)
		.then(createdCategory => createdCategory)
		.catch(httpHelper.handleError);
};

export const changeStateFavouriteCategoryCall = ( category ) => {
	let type = mapCategoryTypeToDomain(category.type); 
	const requestOptions = {
		method: "PATCH",
		headers: httpHelper.addAuthHeader(
			{ "Content-Type": "application/json" },
			getJwtToken()
		),
		body: JSON.stringify({ isFavourite: !category.favourite }),
	};

	return fetch(`${config.apiUrl}/api/category/${type}/favourite/${category.id}`, requestOptions)
		.then(httpHelper.handleResponse)
		.then(expenseCategory => expenseCategory)
		.catch(httpHelper.handleError);
};

export const deleteCategoryCall = (id, categoryType) => {
	let type = mapCategoryTypeToDomain(categoryType);

	const requestOptions = {
		method: "DELETE",
		headers: httpHelper.addAuthHeader({}, getJwtToken()),
	};

	return fetch(`${config.apiUrl}/api/category/${type}/${id}`, requestOptions)
		.then(httpHelper.handleResponse)
		.then(deletedCategory => deletedCategory)
		.catch(httpHelper.handleError);
};

export const editExpenseCategoryMaximumCostCall = (categoryId, newMaximumCost, isValidFromNextMonth ) => {

	const requestOptions = {
		method: "PUT",
		headers: httpHelper.addAuthHeader(
			{ "Content-Type": "application/json" },
			getJwtToken()
		),
		body: JSON.stringify({newMaximumCost, isValidFromNextMonth }),
	};

	return fetch(`${config.apiUrl}/api/category/expense/${categoryId}/version`, requestOptions)
		.then(httpHelper.handleResponse)
		.then(editedCategoryVersion => editedCategoryVersion)
		.catch(httpHelper.handleError);
};


export const editCategoryCall = (categoryId, categoryName, colorHex, categoryType ) => {
	let type = mapCategoryTypeToDomain(categoryType).toLowerCase(); 
	const requestOptions = {
		method: "PATCH",
		headers: httpHelper.addAuthHeader(
			{ "Content-Type": "application/json" },
			getJwtToken()
		),
		body: JSON.stringify({categoryName, colorHex }),
	};

	return fetch(`${config.apiUrl}/api/category/${type}/${categoryId}`, requestOptions)
		.then(httpHelper.handleResponse)
		.then(editedCategory => editedCategory)
		.catch(httpHelper.handleError);
};

export const getTransactionsCall = ( transactionType, date ) => {
	let type = mapTransactionTypeToDomain(transactionType).toLowerCase(); 

	const requestOptions = {
		method: "GET",
		headers: httpHelper.addAuthHeader({}, getJwtToken()),
	};

	let urlGetRequest = date ? `${config.apiUrl}/api/transaction/${type}?year=${date.year}&month=${date.month + 1}` : `${config.apiUrl}/api/transaction/${type}`; 

	return fetch(urlGetRequest, requestOptions)
		.then(httpHelper.handleResponse)
		.catch(httpHelper.handleError);
};


export const createTransactionCall = (transaction) => {
	let type =	mapTransactionTypeToDomain(transaction.transactionType); 
	transaction.transactionType = type;
	const formData = new FormData();
	transaction.receiptFile && formData.append("file", transaction.receiptFile);
	formData.append('transaction', new Blob([JSON.stringify(transaction)], {
		type: "application/json"
	}));

	const requestOptions = {
		method: "POST",
		headers: httpHelper.addAuthHeader({}, getJwtToken()),
		body: formData,
	};

	return fetch(`${config.apiUrl}/api/transaction/${type}`, requestOptions)
		.then(httpHelper.handleResponse)
		.then(createdTransaction => createdTransaction)
		.catch(httpHelper.handleError);
};

export const deleteTransactionCall = (transactionId, transactionType) => {
	let type =	mapTransactionTypeToDomain(transactionType); 

	const requestOptions = {
		method: "DELETE",
		headers: httpHelper.addAuthHeader({}, getJwtToken()),
	};

	return fetch(`${config.apiUrl}/api/transaction/${type}/${transactionId}`, requestOptions)
		.then(httpHelper.handleResponse)
		.then(deletedTransaction => deletedTransaction)
		.catch(httpHelper.handleError);
};