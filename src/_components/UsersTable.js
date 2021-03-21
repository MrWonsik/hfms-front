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
        dispatch(editUserStatus(id, isEnabled));
    }

    const handleChangeUserPassword = (id) => {
        dispatch(openModalChangePasswordUsers(id));
    }

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
    }

    const handleAddNewUser = () => {
        dispatch(openModalAddNewUser());
    }

    //TODO: add paggination!

    return (
        <>
            <h1 className="d-inline">Users list: </h1> {!users.users && isUsersLoading ? <Spinner animation="border" size="lg" /> : 
                <>
                    <Form.Group className="text-right">
                        <BsPersonPlusFill className="icon-insted-button" onClick={() => handleAddNewUser()}/>
                    </Form.Group>
                    <Table bordered responsive className="user-list-table">
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
                                <td><BsPerson />  {user.username}</td>
                                <td>{mapRoleToString(user.role)}</td>
                                <td><BsCalendar />  {user.createDate}</td>
                                <td><BsCalendar />  {user.updateDate}</td>
                                <td>
                                    {/* <ButtonGroup>
                                        {currentUser.id == user.id ? "" : 
                                        <>
                                            <Button size="sm" onClick={() => handleUserStatus(user.id, !user.isEnabled)}>{user.isEnabled ? <BsPersonCheckFill /> : <BsPersonFill />}</Button> 
                                            <Button size="sm" onClick={() => handleChangeUserPassword(user.id)}><BsFillGearFill /></Button>
                                            <Button size="sm" onClick={() => handleDeleteUser(user.id)}><BsPersonDashFill /></Button>
                                        </>
                                        }

                                    </ButtonGroup> */}
                                    {currentUser.id == user.id ? "" : 
                                    <>
                                        {user.isEnabled 
                                        ? <BsPersonCheck className="user-table-action-icon" onClick={() => handleUserStatus(user.id, !user.isEnabled)} /> 
                                        : <BsPerson className="user-table-action-icon" onClick={() => handleUserStatus(user.id, !user.isEnabled)}/>}
                                        <BsPencil className="user-table-action-icon" onClick={() => handleChangeUserPassword(user.id)}/>
                                        <BsTrash className="user-table-action-icon" onClick={() => handleDeleteUser(user.id)} />
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
