import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { mapRoleToString } from "../_helpers"
import AddNewUserModal from "./modal/AddNewUserModal"
import ChangeUserPasswordModal from "./modal/ChangeUserPasswordModal"
import { BsTrash, BsPersonPlusFill, BsPencil, BsPersonCheck, BsPerson, BsCalendar } from 'react-icons/bs'

import { getAllUsers, editUserStatus, deleteUser } from '../user/users/users.actions';
import { openConfirmationModal, openModalAddNewUser, openModalChangePasswordUsers } from "../modal/modal.actions";
import ConfirmationModal from './modal/ConfirmationModal';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { dateSort } from "../_helpers/tableBootstrapSorter";


const UsersTable = () => {
    const dispatch = useDispatch();  
    const { currentUser, users, isUsersLoading } = useSelector((state) => ({
        currentUser: state.user.user,
        users: state.users.users,
        isUsersLoading: state.users.isLoading
    }));

    useEffect(() => {
        dispatch(getAllUsers())
    }, []);

    const showDeleteConfirmationModal = (user) => {
        dispatch(openConfirmationModal("user_" + user.username.trim() + "_" + user.id));
    }

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

    let productsFilled = false;
    const products = [];
    users?.forEach((user) => {
        products.push({
            id: user.id,
            username: user.username,
            role: mapRoleToString(user.role),
            createDate: <><BsCalendar /> {user.createDate}</>,
            updateDate: <><BsCalendar /> {user.updateDate}</>,
            isDisabled: !user.isEnabled,
            actions: <>
                {currentUser.id == user.id ? "" : 
                    <>
                        {user.isEnabled 
                        ? <BsPersonCheck tabIndex="0" className="table-action-icon" onClick={() => handleUserStatus(user.id, !user.isEnabled)} onKeyPress={e => e.key === 'Enter' && handleUserStatus(user.id, !user.isEnabled)}/> 
                        : <BsPerson tabIndex="0" className="table-action-icon" onClick={() => handleUserStatus(user.id, !user.isEnabled)} onKeyPress={e => e.key === 'Enter' && handleUserStatus(user.id, !user.isEnabled)}/>}
                        <BsPencil tabIndex="0" className="table-action-icon" onClick={() => handleChangeUserPassword(user.id)} onKeyPress={e => e.key === 'Enter' && handleChangeUserPassword(user.id)}/>
                        <BsTrash tabIndex="0" className="table-action-icon" onClick={() => showDeleteConfirmationModal(user)} onKeyPress={e => e.key === 'Enter' && showDeleteConfirmationModal(user)}/>
                    </>
                }
            </>
        })
    })
    productsFilled = true;
    
    const columns = [{
        dataField: 'username',
        text: 'Username',
        sort: true
      }, {
        dataField: 'role',
        text: 'Role',
        sort: true
      }, {
        dataField: 'createDate',
        text: 'Created',
        sort: true,
        sortFunc: dateSort
      }, {
        dataField: 'updateDate',
        text: 'Updated',
        sort: true,
        sortFunc: dateSort
      }, {
        dataField: 'actions',
        text: 'Action'  
      }, {
        dataField: 'id',
        hidden: true
      }, {
        dataField: 'isDisabled',
        hidden: true
      }];

    const defaultSorted = [{
        dataField: 'username',
        order: 'asc'
    }]
    
    const paginationOptions = {
        sizePerPage: 5,
        hideSizePerPage: true, 
        hidePageListOnlyOnePage: true,
        alwaysShowAllBtns: false,
    }

    const rowUserDisableClass = (row, rowIndex) => (row.isDisabled ? "disabled" : null)

    return (
        <>
            {!users && isUsersLoading ? <Spinner animation="border text-center" size="lg" /> : 
                <>
                    <Form.Group className="text-right">
                        <BsPersonPlusFill tabIndex="0" className="icon-add" onClick={() => handleAddNewUser()} onKeyPress={e => e.key === 'Enter' && handleAddNewUser()}/>
                    </Form.Group>
                    <BootstrapTable 
                        classes="list-table" 
                        bootstrap4 
                        keyField="id"
                        data={ products } 
                        columns={ columns }
                        bordered={false}
                        defaultSorted={defaultSorted}
                        pagination={ paginationFactory(paginationOptions) }
                        rowClasses={rowUserDisableClass}
                    />
                    {users?.map((user) => (
                        <ConfirmationModal key={user.id} id={"user_" + user.username.trim() + "_" + user.id} confirmationFunction={() => handleDeleteUser(user.id)} confirmationMessage={"Are you sure you want to delete " + user.username + " user?"} />
                    ))}
                    <AddNewUserModal />
                    <ChangeUserPasswordModal />
                </>
            }
        </>
    );
};

export default UsersTable;
