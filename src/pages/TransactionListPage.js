import React, { useEffect } from 'react';
import { BsPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../user/user.actions';
import { getIconWithActionAndTooltip } from '../_helpers/wrapWithTooltip';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { EXPENSE_TRANSACTION, INCOME_TRANSACTION } from '../finance/TransactionType';
import TransactionsTable from '../_components/TransactionsTable';
import AddNewTransactionModal from '../_components/modal/AddNewTransactionModal';
import { openModalAddNewTransaction } from '../modal/modal.actions';
import { getTransactions } from '../finance/finance.actions';


const TransactionListPage = () => {
    const dispatch = useDispatch();

    const { expenseTransactions, incomeTransactions, isExpenseTransactionsLoading, isIncomeTransactionsLoading } = useSelector(( state ) => ({
        expenseTransactions: state.finance.expenseTransactions,
        incomeTransactions: state.finance.incomeTransactions,
        isExpenseTransactionsLoading: state.finance.isExpenseTransactionsLoading,
        isIncomeTransactionsLoading: state.finance.isIncomeTransactionsLoading,

    }));

    useEffect(() => {
        dispatch(changePage("Transaction list"));
        dispatch(getTransactions(EXPENSE_TRANSACTION));
        // dispatch(getTransactions(INCOME_TRANSACTION)); // not implemented yet in backend
      }, []);

    const handleAddNewFinance = () => {
        dispatch(openModalAddNewTransaction());
    }

    return (
        <>
            <Form.Group className="text-right add-new-container">
                {getIconWithActionAndTooltip(BsPlus, "icon-add", () => handleAddNewFinance(), "top", "Add new transaction")}
            </Form.Group>
            <Tabs className="categories-tabs">
                <Tab eventKey="expense" title="expense">
                    <TransactionsTable type={EXPENSE_TRANSACTION} transactions={expenseTransactions} isLoading={isExpenseTransactionsLoading}/>
                </Tab>
                <Tab eventKey="income" title="income">
                    <TransactionsTable type={INCOME_TRANSACTION} transactions={incomeTransactions} isLoading={isIncomeTransactionsLoading}/>
                </Tab>
            </Tabs>
            

            <AddNewTransactionModal />
        </>
    );
}

export default TransactionListPage;