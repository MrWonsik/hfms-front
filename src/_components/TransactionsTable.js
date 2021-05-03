import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight, BsPlus } from 'react-icons/bs';
import { changePage } from '../user/user.actions';
import { getIconWithActionAndTooltip } from '../_helpers/wrapWithTooltip';
import Form from 'react-bootstrap/Form';
import { EXPENSE_TRANSACTION, INCOME_TRANSACTION } from '../finance/TransactionType';
import { useDispatch, useSelector } from 'react-redux';
import { BsCalendar, BsPencil, BsTrash } from 'react-icons/bs'
import Alert from "react-bootstrap/Alert";
import { dateSort } from '../_helpers/tableBootstrapSorter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { openConfirmationModal, openModalAddNewTransaction } from '../modal/modal.actions';
import ConfirmationModal from './modal/ConfirmationModal';
import { deleteTransaction } from '../finance/finance.actions';
import Loader from '../_helpers/Loader';
import { getTransactions } from '../finance/finance.actions';
import { getMonth } from '../_helpers/dateHelper';
import moment from 'moment';

const TransactionsTable = () => {
    const dispatch = useDispatch();

    let [date, setDate] = useState(moment());

    useEffect(() => {
        dispatch(changePage("Transaction list"));
        dispatch(getTransactions(EXPENSE_TRANSACTION, {year: date.year(), month: date.month()} ));
        dispatch(getTransactions(INCOME_TRANSACTION, {year: date.year(), month: date.month()} )); // not implemented yet in backend
      }, []);

      const handleAddNewFinance = () => {
        dispatch(openModalAddNewTransaction());
    }

    useEffect(() => {
        dispatch(getTransactions(EXPENSE_TRANSACTION, {year: date.year(), month: date.month()} ));
        dispatch(getTransactions(INCOME_TRANSACTION, {year: date.year(), month: date.month()} )); // not implemented yet in backend
    }, [date])
    
    const { expenseTransactions, incomeTransactions, isLoading } = useSelector(( state ) => ({
        expenseTransactions: state.finance.expenseTransactions,
        incomeTransactions: state.finance.incomeTransactions,
        isLoading: state.finance.isTransactionsLoading
    }));

    let transactions = expenseTransactions.concat(incomeTransactions);

    const generateTransactionsMap = () => {
        return  transactions?.map((transaction) => ({
            id: transaction.id,
            name: <>{transaction.name} <span className="additionaly-info">({transaction.id})</span></>,
            created: <><BsCalendar /> {transaction.createdDate}</>,
            cost: transaction.cost,
            actions: <>
                {getIconWithActionAndTooltip(BsPencil, "table-action-icon", () => console.log("not implemented yet"), "top", "Edit")}
                {getIconWithActionAndTooltip(BsTrash, "table-action-icon", () => showDeleteConfirmationModal(transaction), "top", "Delete")}
            </>,
            type: transaction.type
        }))
    }

    const showDeleteConfirmationModal = (transaction) => {
        dispatch(openConfirmationModal("transaction_confirmation_" + transaction.name.trim() + "_" + transaction.id));
    }

    const handleAddTransaction = () => {
        dispatch(openModalAddNewTransaction());
    }

    const handleDeleteTransaction = (id, transactionType) => {
        dispatch(deleteTransaction(id, transactionType));
    }

    const costFormatter = (cell, transactionRow) => {
        switch(transactionRow.type) {
            case EXPENSE_TRANSACTION:
                return (
                    <span className={"expense-transaction-cost-style"} >
                        - {cell} zł
                    </span>
                )
            case INCOME_TRANSACTION:
                return (
                    <span className={"income-transaction-cost-style"} >
                        + {cell} zł
                    </span>
                )
        }
    }
    
    const columns = [{
        dataField: 'name',
        text: 'Name',
      }, {
        dataField: 'created',
        text: 'Created',
        sort: true,
        sortFunc: dateSort
      }, {
        dataField: 'cost',
        text: 'Cost',
        formatter: costFormatter,
        formatExtraData: transactions
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
                        keyField="id" 
                        data={ generateTransactionsMap() } 
                        columns={ columns }
                        bordered={false}
                        defaultSorted={defaultSorted}
                        pagination={ paginationFactory(paginationOptions) }
                    />
                    {transactions?.map((transaction) => (
                        <div key={transaction.id}>
                            <ConfirmationModal id={"transaction_confirmation_" + transaction.name.trim() + "_" + transaction.id} confirmationFunction={() => handleDeleteTransaction(transaction.id, transaction.type)} confirmationMessage={"Are you sure you want to delete " + transaction.name + "?"} />
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