import config from "config";
import { httpHelper, mapCategoryTypeToDomain } from "../_helpers";
import { getJwtToken } from "../index";


// <================= SHOPS:

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

// <================= CATEGORIES

export const getCategoriesCall = ( categoryType ) => {
	let type = mapCategoryTypeToDomain(categoryType).toLowerCase(); 

	const requestOptions = {
		method: "GET",
		headers: httpHelper.addAuthHeader({}, getJwtToken()),
	};

	return fetch(`${config.apiUrl}/api/category/${type}/`, requestOptions)
		.then(httpHelper.handleResponse)
		.catch(httpHelper.handleError);
};

export const createCategoryCall = (category) => {
	let type = mapCategoryTypeToDomain(category.categoryType); 

	const requestOptions = {
		method: "POST",
		headers: httpHelper.addAuthHeader(
			{ "Content-Type": "application/json" },
			getJwtToken()
		),
		body: JSON.stringify(category),
	};

	return fetch(`${config.apiUrl}/api/category/${type}/`, requestOptions)
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

	return fetch(`${config.apiUrl}/api/category/${type}/${category.id}`, requestOptions)
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
		.then(deletedExpenseCategory => deletedExpenseCategory)
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
		.then(editedCategory => editedCategory)
		.catch(httpHelper.handleError);
};