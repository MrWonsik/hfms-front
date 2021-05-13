import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight, BsEye, BsPlus } from 'react-icons/bs';
import { changePage } from '../user/user.actions';
import { getIconWithActionAndTooltip } from '../_helpers/wrapWithTooltip';
import Form from 'react-bootstrap/Form';
import { EXPENSE_TRANSACTION, INCOME_TRANSACTION } from '../finance/TransactionType';
import { useDispatch, useSelector } from 'react-redux';
import { BsCalendar, BsTrash } from 'react-icons/bs'
import Alert from "react-bootstrap/Alert";
import { dateSort } from '../_helpers/tableBootstrapSorter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { openConfirmationModal, openModalAddNewTransaction, openTransactionDetailsModal } from '../modal/modal.actions';
import ConfirmationModal from './modal/ConfirmationModal';
import { deleteTransaction, getTransactionFile } from '../finance/finance.actions';
import Loader from '../_helpers/Loader';
import { getTransactions } from '../finance/finance.actions';
import { getMonth } from '../_helpers/dateHelper';
import moment from 'moment';
import TransactionDetailsModal from './modal/TransactionDetailsModal';

const TransactionsTable = () => {
    const dispatch = useDispatch();

    let [date, setDate] = useState(moment());

    useEffect(() => {
        dispatch(changePage("Transaction list"));
        dispatch(getTransactions(EXPENSE_TRANSACTION, {year: date.year(), month: date.month()} ));
        dispatch(getTransactions(INCOME_TRANSACTION, {year: date.year(), month: date.month()} ));
      }, []);

    useEffect(() => {
        dispatch(getTransactions(EXPENSE_TRANSACTION, {year: date.year(), month: date.month()} ));
        dispatch(getTransactions(INCOME_TRANSACTION, {year: date.year(), month: date.month()} ));
    }, [date])
    
    const handleAddNewFinance = () => {
        dispatch(openModalAddNewTransaction());
    }

    const { expenseTransactions, incomeTransactions, isLoading } = useSelector(( state ) => ({
        expenseTransactions: state.finance.expenseTransactions,
        incomeTransactions: state.finance.incomeTransactions,
        isLoading: state.finance.isTransactionsLoading
    }));

    let transactions = expenseTransactions?.concat(incomeTransactions);

    const showTransactionDetails = (transaction) => {
        if(transaction.receiptId !== null && transaction.type === EXPENSE_TRANSACTION) {
            dispatch(getTransactionFile(transaction.id))
        }
        dispatch(openTransactionDetailsModal("transaction_details_" + transaction.name.trim() + "_" + transaction.type + "_" + transaction.id));
    }

    const showDeleteConfirmationModal = (transaction) => {
        dispatch(openConfirmationModal("transaction_confirmation_" + transaction.name.trim() + "_" + transaction.type + "_" + transaction.id));
    }

    const handleAddTransaction = () => {
        dispatch(openModalAddNewTransaction());
    }

    const handleDeleteTransaction = (id, transactionType) => {
        dispatch(deleteTransaction(id, transactionType));
    }

    const generateTransactionsMap = () => {
        return  transactions?.map((transaction) => ({
            key: transaction.id + "_" + transaction.type,
            id: transaction.id,
            name: <>{transaction.name} <span className="additionaly-info">({transaction.id})</span></>,
            created: <><BsCalendar /> {transaction.createdDate}</>,
            amount: transaction.amount,
            category: transaction.category.name,
            actions: <>
                {getIconWithActionAndTooltip(BsEye, "table-action-icon", () => showTransactionDetails(transaction), "top", "Show details")}
                {getIconWithActionAndTooltip(BsTrash, "table-action-icon", () => showDeleteConfirmationModal(transaction), "top", "Delete")}
            </>,
            type: transaction.type
        }))
    }

    const amountFormatter = (cell, transactionRow) => {
        switch(transactionRow.type) {
            case EXPENSE_TRANSACTION:
                return (
                    <span className={"expense-transaction-amount-style"} >
                        - {cell} zł
                    </span>
                )
            case INCOME_TRANSACTION:
                return (
                    <span className={"income-transaction-amount-style"} >
                        + {cell} zł
                    </span>
                )
        }
    }
    
    const columns = [{
        dataField: 'name',
        text: 'Name',
      }, {
        dataField: 'amount',
        text: 'Amount',
        formatter: amountFormatter,
        formatExtraData: transactions
      }, {
        dataField: 'category',
        text: 'Category',
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
        order: 'desc'
    }]
    
    const paginationOptions = {
        sizePerPage: 5,
        hideSizePerPage: true, 
        hidePageListOnlyOnePage: true,
        alwaysShowAllBtns: false,
    }

    return (
        <>
            <Form.Group className="d-flex add-new-container">
                <div className="date-selector-container d-flex ml-auto mr-auto">
                    {getIconWithActionAndTooltip(BsChevronCompactLeft, "table-icon-action", () => setDate((curDate) => curDate.clone().subtract(1, "months")), "top", "Previous month")}
                        <span className="transaction-current-year-and-month">{getMonth(date.month())} - {date.year()}</span>
                    {date.month() === moment().month() && date.year() === moment().year() 
                    ? getIconWithActionAndTooltip(BsChevronCompactRight, "table-icon-action disabled", () => "", "top", "Disabled") 
                    : getIconWithActionAndTooltip(BsChevronCompactRight, "table-icon-action", () => setDate((curDate) => curDate.clone().add(1, "months")), "top", "Next month")}
                </div>
                <div className="float-right">
                    {getIconWithActionAndTooltip(BsPlus, "table-icon-action", () => handleAddNewFinance(), "top", "Add new transaction")}
                </div>
            </Form.Group>
            { isLoading === true ? <Loader /> :  transactions?.length > 0 ?  
                <>
                    <BootstrapTable 
                        classes="list-table" 
                        bootstrap4 
                        keyField="key" 
                        data={ generateTransactionsMap() } 
                        columns={ columns }
                        bordered={false}
                        defaultSorted={defaultSorted}
                        pagination={ paginationFactory(paginationOptions) }
                    />

                    {transactions?.map((transaction) => (
                        <div key={transaction.id + "_" + transaction.type}>
                            <ConfirmationModal id={"transaction_confirmation_" + transaction.name.trim() + "_" + transaction.type + "_" + transaction.id} confirmationFunction={() => handleDeleteTransaction(transaction.id, transaction.type)} confirmationMessage={"Are you sure you want to delete " + transaction.name + "?"} />
                            <TransactionDetailsModal id={"transaction_details_" + transaction.name.trim() + "_" + transaction.type + "_" + transaction.id} transaction={transaction} />
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

export default TransactionsTable;