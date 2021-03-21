import history from "./history";

export const httpHelper = {
	addAuthHeader,
	handleResponse,
	handleError,
};

function addAuthHeader(headers, token) {
	if (token) {
		return {
			...headers,
			Authorization: token,
		};
	} else {
		return { ...headers };
	}
}

function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			const error = {
				msg: (data && data.message) || response.statusText,
			};
			error.response = response.status;
			return Promise.reject(error);
		}
		return data;
	});
}

function handleError(error) {
	if (error.response === 401 || typeof error.response === "undefined") {
		history.push("/login");
	}
	let msg = error.msg
		? error.msg
		: "A server error has occurred: " + error.toString();
	return Promise.reject(msg);
}
