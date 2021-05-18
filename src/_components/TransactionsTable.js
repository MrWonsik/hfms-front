import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight, BsEye, BsPlus, BsSearch } from 'react-icons/bs';
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
import { deleteTransaction, getAllTransactions, getTransactionFile } from '../finance/finance.actions';
import Loader from '../_helpers/Loader';
import { getMonth } from '../_helpers/dateHelper';
import moment from 'moment';
import TransactionDetailsModal from './modal/TransactionDetailsModal';
import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import { Col, Row } from 'react-bootstrap';

let categoryFilter;
let transactionNameFilter;
let typesFilter;

const TransactionsTable = () => {
    const dispatch = useDispatch();


    let [date, setDate] = useState(moment());
    let [categoryName, setCategoryName] = useState("");
    let [transactionName, setTransactionName] = useState("");
    let [transactionType, setTransactionType] = useState("");
    let [showFilter, setShowFilter] = useState(false);

    const { expenseTransactions, incomeTransactions, isTransactionsLoading, expenseCategories, incomeCategories } = useSelector(( state ) => ({
        expenseTransactions: state.finance.expenseTransactions,
        incomeTransactions: state.finance.incomeTransactions,
        expenseCategories: state.finance.expenseCategories,
        incomeCategories: state.finance.incomeCategories,
        isTransactionsLoading: state.finance.isTransactionsLoading
    }));

    useEffect(() => {
        dispatch(changePage("Transaction list"));
        dispatch(getAllTransactions({year: date.year(), month: date.month()}))
      }, []);

    useEffect(() => {
        dispatch(getAllTransactions({year: date.year(), month: date.month()}))
    }, [date]);

    var transactions = expenseTransactions?.concat(incomeTransactions);

    const generateTransactionsMap = () => {
        return  transactions && transactions.map((transaction) => ({
            key: transaction.id + "_" + transaction.type,
            id: transaction.id,
            name: transaction.name,
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
    
    const showTransactionDetails = (transaction) => {
        if(transaction.receiptId !== null && transaction.type === EXPENSE_TRANSACTION) {
            dispatch(getTransactionFile(transaction.id))
        }
        dispatch(openTransactionDetailsModal("transaction_details_" + transaction.name.trim() + "_" + transaction.type + "_" + transaction.id));
    }

    const showDeleteConfirmationModal = (transaction) => {
        dispatch(openConfirmationModal("transaction_confirmation_" + transaction.name.trim() + "_" + transaction.type + "_" + transaction.id));
    }


    var transactionsMap = generateTransactionsMap();

    const handleAddNewFinance = () => {
        dispatch(openModalAddNewTransaction());
    }

    const handleShowFilterOptions = () => {
        setShowFilter(!showFilter);
    }

    const handleAddTransaction = () => {
        dispatch(openModalAddNewTransaction());
    }

    const handleDeleteTransaction = (id, transactionType) => {
        dispatch(deleteTransaction(id, transactionType));
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

    const nameFormatter = (cell, row) => { 
        return (<>{cell} <span className="additionaly-info">({row.id})</span></>)
    }

    let categories = expenseCategories?.concat(incomeCategories);

    const getCategoriesMap = () => {
        let categoriesMap = {};
        categories.forEach(category => {
            categoriesMap[category.categoryName] = category.categoryName
        })
        return categoriesMap;
    }

    const categoriesMap = getCategoriesMap();

    const typesMap = { "Income": "Income", "Expense": "Expense"}
    
    const columns = [{
        dataField: 'name',
        text: 'Name',
        formatter: nameFormatter, 
        filter: textFilter({
            getFilter: (filter) => {
                transactionNameFilter = filter;
            }
        })
      }, {
        dataField: 'amount',
        text: 'Amount',
        formatter: amountFormatter,
        formatExtraData: transactions
      }, {
        dataField: 'category',
        text: 'Category',
        formatter: cell => categoriesMap[cell],
        filter: selectFilter({
            options: categoriesMap,
            getFilter: (filter) => {
                categoryFilter = filter;
            }
        })
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
      }, {
        dataField: 'type',
        text: "Type",
        headerStyle: {'display': 'none'},
        style: {'display': 'none'},
        filter: selectFilter({
            options: typesMap,
            getFilter: (filter) => {
                typesFilter = filter;
            }
        })
      }
    ];

    const defaultSorted = [{
        dataField: 'created',
        order: 'desc'
    }]


    
    const paginationOptions = {
        sizePerPage: 10,
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
                    {getIconWithActionAndTooltip(BsSearch, "table-icon-action search", () => handleShowFilterOptions(), "top", "Show filter options")}
                    {getIconWithActionAndTooltip(BsPlus, "table-icon-action", () => handleAddNewFinance(), "top", "Add new transaction")}
                </div>
            </Form.Group>
            { isTransactionsLoading ? <Loader /> :  transactions?.length > 0 ?  
                <>
                    <hr/>
                    <div className={"slide-wrapper"}>
                        <Row className={"filter-options " + (showFilter && "open")}>
                            <Form.Group as={Col} lg={4}>
                                <Form.Control
                                    type="text"
                                    name="transactionName"
                                    value={transactionName}
                                    onChange={(e) => {
                                        setTransactionName(e.target.value);
                                        transactionNameFilter(e.target.value);
                                    }}
                                    placeholder="Search by transaction name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} lg={4}>
                            <Form.Control
                                    as="select"
                                    name="category"
                                    value={categoryName}
                                    onChange={(e) => {
                                        setCategoryName(e.target.value);
                                        if(e.target.value === "Search by category") {
                                            categoryFilter("");
                                        } else {
                                            categoryFilter(e.target.value);
                                        }
                                    }}
                                >
                                    <option>Search by category</option>
                                    { categories.map(category => <option key={category.id + category.categoryName}>{category.categoryName}</option>) }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} lg={4}> 
                            <Form.Control
                                    as="select"
                                    name="type"
                                    value={transactionType}
                                    onChange={(e) => {
                                        setTransactionType(e.target.value);
                                        if(e.target.value === "Search by transaction type") {
                                            typesFilter("");
                                        } else {
                                            typesFilter(e.target.value);
                                        }
                                    }}
                                >
                                    <option>Search by transaction type</option>
                                    <option>Expense</option>
                                    <option>Income</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                    </div>
                    <BootstrapTable 
                        classes="list-table" 
                        bootstrap4 
                        keyField="key" 
                        data={ transactionsMap } 
                        columns={ columns }
                        bordered={false}
                        defaultSorted={defaultSorted}
                        pagination={ paginationFactory(paginationOptions) }
                        filter={ filterFactory()}
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