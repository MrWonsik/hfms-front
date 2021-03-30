import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { mapRoleToString } from "../_helpers"
import AddNewUserModal from "./modal/AddNewUserModal"
import ChangeUserPasswordModal from "./modal/ChangeUserPasswordModal"
import { BsTrash, BsPersonPlusFill, BsPencil, BsPersonCheck, BsPerson, BsCalendar } from 'react-icons/bs'

import { getAllUsers, editUserStatus, deleteUser } from '../user/users/users.actions';
import { openModalAddNewUser, openModalChangePasswordUsers } from "../modal/modal.actions";
import { useHistory } from "react-router";

const UsersTable = () => {
    let history = useHistory();

    const dispatch = useDispatch();  
    const { currentUser, users, isUsersLoading } = useSelector((state) => ({
        currentUser: state.user.user,
        users: state.users.users,
        isUsersLoading: state.users.isLoading
    }));

    useEffect(() => {
        dispatch(getAllUsers()).catch((shouldRedirect) => shouldRedirect && history.push("/login"));
    }, []);


    const handleUserStatus = (id, isEnabled) => {
        dispatch(editUserStatus(id, isEnabled)).catch(shouldRedirect => shouldRedirect && history.push("/login"));;
    }

    const handleChangeUserPassword = (id) => {
        dispatch(openModalChangePasswordUsers(id));
    }

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id)).catch(shouldRedirect => shouldRedirect && history.push("/login"));;
    }

    const handleAddNewUser = () => {
        dispatch(openModalAddNewUser());
    }

    //TODO: add paggination!

    return (
        <>
            {!users && isUsersLoading ? <Spinner animation="border text-center" size="lg" /> : 
                <>
                    <Form.Group className="text-right">
                        <BsPersonPlusFill tabIndex="0" className="icon-add-user" onClick={() => handleAddNewUser()} onKeyPress={e => e.key === 'Enter' && handleAddNewUser()}/>
                    </Form.Group>
                    <Table responsive className="list-table">
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
                        {users?.map((user) => (
                        <tr key={user.id} className={!user.isEnabled ? "disabled" : ""}>
                                <td><BsPerson />  {user.username}</td>
                                <td>{mapRoleToString(user.role)}</td>
                                <td><BsCalendar />  {user.createDate}</td>
                                <td><BsCalendar />  {user.updateDate}</td>
                                <td>
                                    {currentUser.id == user.id ? "" : 
                                    <>
                                        {user.isEnabled 
                                        ? <BsPersonCheck tabIndex="0" className="table-action-icon" onClick={() => handleUserStatus(user.id, !user.isEnabled)} onKeyPress={e => e.key === 'Enter' && handleUserStatus(user.id, !user.isEnabled)}/> 
                                        : <BsPerson tabIndex="0" className="table-action-icon" onClick={() => handleUserStatus(user.id, !user.isEnabled)} onKeyPress={e => e.key === 'Enter' && handleUserStatus(user.id, !user.isEnabled)}/>}
                                        <BsPencil tabIndex="0" className="table-action-icon" onClick={() => handleChangeUserPassword(user.id)} onKeyPress={e => e.key === 'Enter' && handleChangeUserPassword(user.id)}/>
                                        <BsTrash tabIndex="0" className="table-action-icon" onClick={() => handleDeleteUser(user.id)} onKeyPress={e => e.key === 'Enter' && handleDeleteUser(user.id)}/>
                                    </>
                                    }
                                </td>
                        </tr>
                        ))}
                    </tbody>
                    </Table>
                   
                    <AddNewUserModal />
                    <ChangeUserPasswordModal />
                </>
            }
        </>
    );
};

export default UsersTable;
