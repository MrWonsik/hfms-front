import config from "config";
import { httpHelper, mapCategoryTypeToDomain } from "../_helpers";
import { getJwtToken } from "../index";

export const getShopsCall = () => {
	const requestOptions = {
		method: "GET",
		headers: httpHelper.addAuthHeader({}, getJwtToken()),
	};

	return fetch(`${config.apiUrl}/api/shop/`, requestOptions)
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

	return fetch(`${config.apiUrl}/api/shop/`, requestOptions)
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

export const getExpenseCategoriesCall = () => {
	const requestOptions = {
		method: "GET",
		headers: httpHelper.addAuthHeader({}, getJwtToken()),
	};

	return fetch(`${config.apiUrl}/api/expense-category/`, requestOptions)
		.then(httpHelper.handleResponse)
		.catch(httpHelper.handleError);
};

export const createCategoryCall = (category) => {
	const requestOptions = {
		method: "POST",
		headers: httpHelper.addAuthHeader(
			{ "Content-Type": "application/json" },
			getJwtToken()
		),
		body: JSON.stringify(category),
	};

	return fetch(`${config.apiUrl}/api/category/`, requestOptions)
		.then(httpHelper.handleResponse)
		.then(createdCategory => createdCategory)
		.catch(httpHelper.handleError);
};

export const changeStateFavouriteCategoryCall = ( category ) => {
	const requestOptions = {
		method: "PATCH",
		headers: httpHelper.addAuthHeader(
			{ "Content-Type": "application/json" },
			getJwtToken()
		),
		body: JSON.stringify({ isFavourite: !category.favourite, categoryType: mapCategoryTypeToDomain(category.type) }),
	};

	return fetch(`${config.apiUrl}/api/category/${category.id}`, requestOptions)
		.then(httpHelper.handleResponse)
		.then(expenseCategory => expenseCategory)
		.catch(httpHelper.handleError);
};

export const deleteExpenceCategoryCall = (id) => {
	const requestOptions = {
		method: "DELETE",
		headers: httpHelper.addAuthHeader({}, getJwtToken()),
	};

	return fetch(`${config.apiUrl}/api/expense-category/${id}`, requestOptions)
		.then(httpHelper.handleResponse)
		.then(deletedExpenseCategory => deletedExpenseCategory)
		.catch(httpHelper.handleError);
};