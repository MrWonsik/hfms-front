import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsPower, BsGearFill } from "react-icons/bs";
import { openModalChangePassword } from "../modal/modal.actions";

import ChangePasswordModal from "./modal/ChangePasswordModal";

const UserTools = () => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => ({
		user: state.user.user,
	}));

	const handleChangePasswordModalOpen = () => {
		dispatch(openModalChangePassword());
	};

	return (
		<>
			<Navbar className="navbar-main justify-content-end">
				<Nav>
					<Navbar.Text className="navbar-username-container">
						Logged in as: <span className="navbar-username">{user.username}</span>
					</Navbar.Text>
					<Nav.Item>
						<Nav.Link onClick={handleChangePasswordModalOpen}>
							<BsGearFill className="navbar-icon" />
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link as={Link} to="/login">
							<BsPower className="navbar-icon"/>
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Navbar>

			<ChangePasswordModal />
		</>
	);
};

export default UserTools;
