import config from "config";
import { httpHelper } from "../_helpers";
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

export const createExpenseCategoryCall = (category) => {
	const requestOptions = {
		method: "POST",
		headers: httpHelper.addAuthHeader(
			{ "Content-Type": "application/json" },
			getJwtToken()
		),
		body: JSON.stringify(category),
	};

	return fetch(`${config.apiUrl}/api/expense-category/`, requestOptions)
		.then(httpHelper.handleResponse)
		.then(updatedExpenseCategory => updatedExpenseCategory)
		.catch(httpHelper.handleError);
};

export const changeStateFavouriteExepenseCategoryCall = ( category ) => {
	const requestOptions = {
		method: "PUT",
		headers: httpHelper.addAuthHeader(
			{ "Content-Type": "application/json" },
			getJwtToken()
		),
		body: JSON.stringify({ isFavourite: !category.favourite }),
	};

	return fetch(`${config.apiUrl}/api/expense-category/${category.id}`, requestOptions)
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