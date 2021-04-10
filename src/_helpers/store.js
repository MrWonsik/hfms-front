import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { user } from "../user/user.reducer";
import { alert } from "../alert/alert.reducer";
import { users } from "../user/users/users.reducer";
import { modals } from "../modal/modal.reducer";
import { finance } from "../finance/finance.reducer";

const reducers = combineReducers({
	user,
	alert,
	users,
	modals,
	finance
});

const persistConfig = {
	key: "root",
	storage,
	stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const configureStore = () =>
	createStore(
		persistedReducer,
		composeWithDevTools(applyMiddleware(thunkMiddleware))
	);
