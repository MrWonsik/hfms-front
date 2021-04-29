import React from 'react';
import { useDispatch } from 'react-redux';
import Spinner from "react-bootstrap/Spinner";
import { BsCalendar, BsPencil, BsTrash } from 'react-icons/bs'
import Alert from "react-bootstrap/Alert";
import { dateSort, sortByName } from '../_helpers/tableBootstrapSorter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import PropTypes from "prop-types";
import { openConfirmationModal, openModalAddNewTransaction } from '../modal/modal.actions';
import { getIconWithActionAndTooltip } from '../_helpers/wrapWithTooltip';
import ConfirmationModal from './modal/ConfirmationModal';
import { deleteTransaction } from '../finance/finance.actions';

const TransactionsTable = ({ type, transactions, isLoading }) => {
    const dispatch = useDispatch();

    const showDeleteConfirmationModal = (transaction) => {
        dispatch(openConfirmationModal("transaction_confirmation_" + transaction.name.trim() + "_" + transaction.id));
    }

    const handleAddTransaction = () => {
        dispatch(openModalAddNewTransaction());
    }

    const handleDeleteTransaction = (id, transactionType) => {
        dispatch(deleteTransaction(id, transactionType));
    }

    const products = transactions?.map((transaction) => ({
            id: transaction.id,
            transactionName: <>{transaction.name} <span className="additionaly-info">({transaction.id})</span></>,
            created: <><BsCalendar /> {transaction.createdDate}</>,
            actions: <>
                {getIconWithActionAndTooltip(BsPencil, "table-action-icon", () => console.log("not implemented yet"), "top", "Edit")}
                {getIconWithActionAndTooltip(BsTrash, "table-action-icon", () => showDeleteConfirmationModal(transaction), "top", "Delete")}
            </>,
    }))
    
    const columns = [{
        dataField: 'transactionName',
        text: 'Name',
        sort: true,
        sortFunc: sortByName
      }, {
        dataField: 'created',
        text: 'Created',
        sort: true,
        sortFunc: dateSort
      }, {
        dataField: 'actions',
        text: 'Action'  
      }, {
        dataField: 'id',
        hidden: true
      }];

    const defaultSorted = [{
        dataField: 'created',
        order: 'asc'
    }]
    
    const paginationOptions = {
        sizePerPage: 5,
        hideSizePerPage: true, 
        hidePageListOnlyOnePage: true,
        alwaysShowAllBtns: false,
    }

    return (
        <>
            { !transactions && isLoading === true ? <Spinner animation="border text-center" size="lg" /> :  transactions?.length > 0 ?  
                <>
                    <BootstrapTable 
                        classes="list-table" 
                        bootstrap4 
                        keyField="id" 
                        data={ products } 
                        columns={ columns }
                        bordered={false}
                        defaultSorted={defaultSorted}
                        pagination={ paginationFactory(paginationOptions) }
                    />
                    {transactions?.map((transaction) => (
                        <div key={transaction.id}>
                            <ConfirmationModal id={"transaction_confirmation_" + transaction.name.trim() + "_" + transaction.id} confirmationFunction={() => handleDeleteTransaction(transaction.id, type)} confirmationMessage={"Are you sure you want to delete " + transaction.name + "?"} />
                        </div>
                    ))}
                </> :
                <Alert className="text-center" variant="light">
                    You don`t have any transactions yet. To add new transaction <Alert.Link onClick={handleAddTransaction}>click here</Alert.Link>.
                </Alert>
            }
        </>
    );
}

TransactionsTable.propTypes = {
    type: PropTypes.string.isRequired, 
    transactions: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
}

export default TransactionsTable;