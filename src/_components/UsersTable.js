import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { getIconWithActionAndTooltip } from "../_helpers/wrapWithTooltip";
import Loader from "../_helpers/Loader";


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
    
    let products = [];
    products = users?.map((user) => ({
        id: user.id,
        username: user.username,
        role: mapRoleToString(user.role),
        createDate: <><BsCalendar /> {user.createDate}</>,
        updateDate: <><BsCalendar /> {user.updateDate}</>,
        isDisabled: !user.isEnabled,
        actions: <>
            {currentUser.id == user.id ? "" : 
                <>
                    {getIconWithActionAndTooltip(BsPersonCheck, "table-action-icon", () => handleUserStatus(user.id, !user.isEnabled), "top", "Disable", user.isEnabled)}
                    {getIconWithActionAndTooltip(BsPerson, "table-action-icon", () => handleUserStatus(user.id, !user.isEnabled), "top", "Enable", !user.isEnabled)}
                    {getIconWithActionAndTooltip(BsPencil, "table-action-icon", () => handleChangeUserPassword(user.id), "top", "Edit")}
                    {getIconWithActionAndTooltip(BsTrash, "table-action-icon", () => showDeleteConfirmationModal(user), "top", "Delete")}
                </>
            }
        </>
    }));
    
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

    const rowUserDisableClass = (row) => (row.isDisabled ? "disabled" : null)

    return (
        <>
            {!users && isUsersLoading && products ? <Loader /> : 
                <>
                    <Form.Group className="text-right add-new-container">
                        {getIconWithActionAndTooltip(BsPersonPlusFill, "table-icon-action", () => handleAddNewUser(), "top", "Add new user")}
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
