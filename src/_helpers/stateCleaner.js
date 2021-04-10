import { alertClear } from "../alert/alert.actions";
import { clearFinances } from "../finance/finance.actions";
import { clearModal } from "../modal/modal.actions";
import { logout } from "../user/user.actions";
import { getUsersClear } from "../user/users/users.actions";

export const cleanState = () => (dispatch) => {
	dispatch(cleanStateWithourAlert());
	dispatch(alertClear());
};

export const cleanStateWithourAlert = () => dispatch => {
	dispatch(logout());
	dispatch(getUsersClear());
	dispatch(clearModal());
	dispatch(clearFinances());
}
