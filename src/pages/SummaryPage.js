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
                            <span className="title"><GiReceiveMoney className="income-icon"/> Incomes: <b>{categoriesSummary.incomesSum}</b> {getCurrency()}</span>
                        </Col>
                        <Col className="summary-page-block-expense">
                                <span className="title"><GiPayMoney className="expense-icon"/> Expenses: <b>{categoriesSummary.expensesSum}</b> {getCurrency()}
                                </span>
                        </Col>
                        <Col className="summary-page-block-expense">
                                <span className="title"><GrMoney className="expense-icon"/> Planned: <b>{categoriesSummary.plannedExpensesSum}</b> {getCurrency()}
                                </span>
                        </Col>
                    </Row>
                    <Row className="summary-page-categories-blocks">
                        {categories?.map(category => {
                            let sumOfAll = 0;
                            let avarageLast12Month = () => {
                                for(var sumOfMonth in category?.summaryTransactionMap) {
                                    sumOfAll += category.summaryTransactionMap[sumOfMonth];
                                }
                                return Object.keys(category?.summaryTransactionMap).length > 0 ? sumOfAll / Object.keys(category?.summaryTransactionMap).length : 0;
                            }
                            return (
                                <Col key={category.categoryName + category.id} className="summary-page-block-category summary-page-block" style={{backgroundImage: `radial-gradient(circle at 50% 50%, transparent 85%, ${category.colorHex})`}}>
                                    <p className="text-center summary-page-block-title">{category.categoryName} {category.favourite && <BsStarFill className="summary-page-block-favourite-icon"/>}</p>
                                    <span>Amount: <b></b></span><br/>
                                    <span>Avarage: <b>{avarageLast12Month().toFixed(2)} {getCurrency()} </b></span><br/>
                                    <span>Last month: <b></b> </span><br/>
                                    <span>Suggested: <b></b></span><br/>
                                    <span>action... <b></b></span>
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