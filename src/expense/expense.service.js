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