import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EXPENSE, INCOME } from '../finance/CategoryType';
import { getCategories } from '../finance/finance.actions';
import { changePage } from '../user/user.actions';
import { GrMoney } from 'react-icons/gr'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BsStarFill } from 'react-icons/bs';
import moment from "moment";
import { getCurrency } from '../_helpers';
import { Spinner } from 'react-bootstrap';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';

const SummaryPage = () => {
    const today = moment().format("YYYY-MM");
    const dispatch = useDispatch();

    const { expenseCategories, incomeCategories, isExpenseCategoriesLoading, isIncomeCategoriesLoading } = useSelector((state) => ({
        expenseCategories: state.finance.expenseCategories,
        incomeCategories: state.finance.incomeCategories,
        isExpenseCategoriesLoading: state.finance.isExpenseCategoriesLoading,
        isIncomeCategoriesLoading: state.finance.isIncomeCategoriesLoading
    }));

    useEffect(() => {
        dispatch(changePage("Summary"))
        dispatch(getCategories(EXPENSE));
        dispatch(getCategories(INCOME));
    }, []);

    const getSumOfTransactions = (type) => type?.map(category => category.summaryTransactionMap[today] ? category.summaryTransactionMap[today] : 0).reduce((a,b) => a + b, 0).toFixed(2);
    const getPlannedAmmountOfTransactions = () => expenseCategories?.map(category => category.currentVersion.maximumAmount).reduce((a,b) => a + b, 0).toFixed(2);

    const categories = expenseCategories?.concat(incomeCategories);
    console.log(expenseCategories);
    const categoriesSummary = {
        expensesSum: getSumOfTransactions(expenseCategories),
        plannedExpensesSum: getPlannedAmmountOfTransactions(),
        incomesSum: getSumOfTransactions(incomeCategories),
        categoriesQuantity: categories.length
    }

    return (
        <Col className="summary-page-container">
            {(isExpenseCategoriesLoading || isIncomeCategoriesLoading) ? <div className="text-center"><Spinner animation="border" size="lg" /></div> : 
                <>
                    <Row className="summary-page-block summary-page-main-block">
                    <Col className="summary-page-block-income">
                            <span className="title"><GiReceiveMoney className="income-icon"/> Incomes: {categoriesSummary.incomesSum} {getCurrency()}</span>
                        </Col>
                        <Col className="summary-page-block-expense">
                                <span className="title"><GiPayMoney className="expense-icon"/> Expenses: {categoriesSummary.expensesSum} {getCurrency()}
                                </span>
                        </Col>
                        <Col className="summary-page-block-expense">
                                <span className="title"><GrMoney className="expense-icon"/> Planned expenses: {categoriesSummary.plannedExpensesSum} {getCurrency()}
                                </span>
                        </Col>
                        <Col className="summary-page-block-categories-quantity">
                            <span className="title">Categories quantity: {categoriesSummary.categoriesQuantity}</span>
                        </Col>
                    </Row>
                    <Row className="summary-page-categories-blocks">
                        {categories?.map(category => {
                            console.log(category);
                            let avarageLast12Month = () => {
                                let sumOfAll = 0;
                                for(var sumOfMonth in category?.summaryTransactionMap) {
                                    sumOfAll += category.summaryTransactionMap[sumOfMonth];
                                }
                                console.log(Object.keys(category?.summaryTransactionMap).length);
                                return Object.keys(category?.summaryTransactionMap).length > 0 ? sumOfAll / Object.keys(category?.summaryTransactionMap).length : 0;
                            }
                            // let plannedExpense = category?.currentVersion.maximumAmount;
                            return (
                                <Col key={category.categoryName + category.id} className="summary-page-block-category summary-page-block" style={{backgroundImage: `radial-gradient(circle at 100% 0%, ${category.colorHex}, transparent 10%)`}}>
                                    <p className="text-center summary-page-block-title">{category.categoryName} {category.favourite && <BsStarFill className="summary-page-block-favourite-icon"/>}</p>
                                    <span>Amount:</span><br/>
                                    <span>Avarage (last 12 month): {avarageLast12Month().toFixed(2)}</span><br/>
                                    <span>Compared to the last month: </span><br/>
                                    <span>Suggested amount for the next month:</span><br/>
                                    <span>action...</span>
                                </Col>
                            )
                        })}
                    </Row>
                </>
            }
        </Col>
    );
}

export default SummaryPage;