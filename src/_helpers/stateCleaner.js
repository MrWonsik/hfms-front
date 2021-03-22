import { alertClear } from "../alert/alert.actions";
import { clearModal } from "../modal/modal.actions";
import { logout } from "../user/user.actions";
import { getUsersClear } from "../user/users/users.actions";

export const cleanState = () => (dispatch) => {
	dispatch(logout());
	dispatch(alertClear());
	dispatch(getUsersClear());
	dispatch(clearModal());
};

export const cleanStateWithourAlert = () => dispatch => {
	dispatch(logout());
	dispatch(getUsersClear());
	dispatch(clearModal());
}
