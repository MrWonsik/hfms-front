import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { mapRole } from "../_helpers"

import { getAllUsers, editUserStatus } from '../user/users/users.actions';

const UsersTable = () => {

    const dispatch = useDispatch();  
    const { currentUser, users, isUsersLoading } = useSelector((state) => ({
        currentUser: state.user.user,
        users: state.users,
        isUsersLoading: state.users.isLoading
    }));

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);


    const handleUserStatus = (id, isEnabled) => {
        // dispatch(editUserStatus(id, isEnabled))
        dispatch(editUserStatus(id, isEnabled)).then((isUpdated) => {
            if(isUpdated) {
                dispatch(getAllUsers());
            }
        });
    }

    const handleChangeUserPassword = (id) => {
        console.log(id);
    }

    const handleDeleteUser = (id) => {
        console.log(id);
    }

    return (
        <>
            <h1 className="d-inline">Users list: </h1> {!users.users && isUsersLoading ? <Spinner animation="border" size="lg" /> : 
                <>
                    <Table borderless responsive className="user-list-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Created</th>
                            <th>Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.users?.map((user) => (
                        <tr key={user.id} className={!user.isEnabled ? "disabled" : ""}>
                                <td>{user.username}</td>
                                <td>{mapRole(user.role)}</td>
                                <td>{user.createDate}</td>
                                <td>{user.updateDate}</td>
                                <td>
                                    <ButtonGroup aria-label="Basic example">
                                        {/*TODO: find a way to generate only one button field (with additional disabled attribue)*/}
                                        {currentUser.id == user.id ? 
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">You cannot disable yourself!</Tooltip>}>
                                                <span className="d-inline-block">
                                                    <Button disabled size="sm" style={{ pointerEvents: "none "}}>{user.isEnabled ? "Disable" : "Enable"}</Button>
                                                </span>
                                            </OverlayTrigger>
                                        : 
                                        <Button size="sm" onClick={() => handleUserStatus(user.id, !user.isEnabled)}>{user.isEnabled ? "Disable" : "Enable"}</Button> 
                                        }
                                        
                                        <Button size="sm" onClick={() => handleChangeUserPassword(user.id)}>Change password</Button>
                                        <Button size="sm" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                                    </ButtonGroup>
                                </td>
                        </tr>
                        ))}
                    </tbody>
                    </Table>
                    <Form.Group className="text-right">
                        <Button variant="primary">Add new user</Button>
                    </Form.Group>
                </>
            }
        </>
    );
};

export default UsersTable;
