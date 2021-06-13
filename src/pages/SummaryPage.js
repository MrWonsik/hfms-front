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
import { FiAlertTriangle } from "react-icons/fi";
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { BsArrowUpRight, BsArrowDownRight } from 'react-icons/bs';
import { AiOutlineAreaChart } from 'react-icons/ai';
import { getIconWithActionAndTooltip, getIconWithTooltip } from '../_helpers/wrapWithTooltip';
import CategoryChartModal from '../_components/modal/CategoryChartModal';
import { openCategoryChartModal } from '../modal/modal.actions';
import regression from 'regression';
import { hashCode } from '../_helpers/hashCode';

const SummaryPage = () => {
    const currentMonth = moment().format("YYYY-MM");
    const nextMonth = moment().add(1, "M").format("YYYY-MM");
    const previousMonth = moment().subtract(1, 'M').format("YYYY-MM");
    const months12Earlier = moment().subtract(12, 'M').format("YYYY-MM");
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

    const getSumOfTransactions = (type) => type?.map(category => category.summaryTransactionMap[currentMonth] ? category.summaryTransactionMap[currentMonth] : 0).reduce((a,b) => a + b, 0).toFixed(2);
    const getPlannedAmmountOfTransactions = () => expenseCategories?.map(category => category.currentVersion.maximumAmount).reduce((a,b) => a + b, 0).toFixed(2);

    const categories = expenseCategories?.concat(incomeCategories);
    const categoriesSummary = {
        expensesSum: getSumOfTransactions(expenseCategories),
        plannedExpensesSum: getPlannedAmmountOfTransactions(),
        incomesSum: getSumOfTransactions(incomeCategories),
        categoriesQuantity: categories.length
    }

    const generateCategoryField = (fieldName, fieldValue, showAlert) => {
        return (
            <p className="field"><span className="field-name">{fieldName}:</span> <b>{fieldValue.toFixed(2)} {getCurrency()}</b>{showAlert()}</p>
            )
    }

    const openCategoryChartModalAction = (contextId) => {
        dispatch(openCategoryChartModal(contextId));
    }

    const countAvarageLast12Month = (summaryMap) => {
        let sumOfAll = 0;
        let quantity = 0;
        for(var month in summaryMap) {
            if(month < months12Earlier) {
                continue;
            }
            if(month === currentMonth) {
                break;
            }
            sumOfAll += summaryMap[month];
            quantity++;
        }
        return quantity > 0 ? sumOfAll / quantity : 0;
    }

    const predictValueForNextMonth = (summaryMap) => {
        let array = []
        for(const [key,value] of Object.entries(summaryMap).filter(key => key != currentMonth)) {
            array.push([hashCode(key),value]);
        }
        const result = regression.linear(array);
        return result.predict(hashCode(nextMonth));
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
                    <p className="summary-page-container-title">Expense categories:</p>
                    <Row className="summary-page-categories-blocks">
                        {expenseCategories
                            ?.sort((cat1,cat2) => cat2.favourite - cat1.favourite || parseInt((cat2?.summaryTransactionMap[currentMonth] ?? 0.0) - (cat1?.summaryTransactionMap[currentMonth] ?? 0.0)))
                            .map(category => {
                                let avarageLast12Month = countAvarageLast12Month(category?.summaryTransactionMap);
                                let currentMonthAmount = category?.summaryTransactionMap[currentMonth] ?? 0;
                                let lastMonthAmount = category?.summaryTransactionMap[previousMonth] ?? 0;
                                let suggestedAmount = predictValueForNextMonth(category?.summaryTransactionMap)[1];
                                let plannedAmount = category?.currentVersion ? category?.currentVersion.maximumAmount : 0;
                                let isPlannedAmountHasBeenExceed = plannedAmount != 0 ? currentMonthAmount > category.currentVersion.maximumAmount : false;
                                let isSuggestedAmountIsBiggerThanPlanned = plannedAmount != 0 ? suggestedAmount > plannedAmount : false;
                                
                                return (
                                    <Col key={category.categoryName + category.id} className="summary-page-block-category summary-page-block" style={{border: `3px solid ${category.colorHex}`}}>
                                        <CategoryChartModal 
                                            id={"category_chart_modal_details_expense" + category.categoryName.trim() + "_" + category.id}
                                            category={category}
                                            key={"category_chart_modal_details_expense" + category.categoryName.trim() + "_" + category.id}/>
                                        <p className="text-center summary-page-block-title">
                                            {category.categoryName} {category.favourite && <BsStarFill className="summary-page-block-favourite-icon"/>} 
                                            {getIconWithActionAndTooltip(AiOutlineAreaChart, "category-chart-icon", () => openCategoryChartModalAction("category_chart_modal_details_expense" + category?.categoryName?.trim() + "_" + category.id), "top", "Click to see chart.")}
                                        </p>
                                        <hr style={{borderColor: `${category.colorHex}`}}/>
                                        {generateCategoryField("Amount", currentMonthAmount, () => {return;})}
                                        {generateCategoryField("Planned", category.currentVersion.maximumAmount, () => 
                                            isPlannedAmountHasBeenExceed  && currentMonthAmount != 0 && getIconWithTooltip(FiAlertTriangle, "alert-icon alert-icon-planned-bad", "Planned amount has been exceeded.")
                                        )}
                                        {generateCategoryField("Avarage", avarageLast12Month, 
                                            () => {
                                                if(avarageLast12Month != 0 && currentMonthAmount != 0) {
                                                    return avarageLast12Month > currentMonthAmount
                                                        ? getIconWithTooltip(BsArrowDownRight, "alert-icon alert-icon-good", "Current amount is lower than avarage.") 
                                                        : getIconWithTooltip(BsArrowUpRight, "alert-icon alert-icon-bad", "Current amount is greater than avarage.")
                                                }
                                            })
                                        }
                                        {generateCategoryField("Last month", lastMonthAmount, 
                                            () => {
                                                if(lastMonthAmount != currentMonthAmount && currentMonthAmount != 0) {
                                                return lastMonthAmount > currentMonthAmount
                                                    ? getIconWithTooltip(BsArrowDownRight, "alert-icon alert-icon-good", "Current amount is lower than in last month.") 
                                                    : getIconWithTooltip(BsArrowUpRight, "alert-icon alert-icon-bad", "Current amount is greater than in last month.")
                                                }
                                            })
                                        }
                                        {generateCategoryField("Suggested", suggestedAmount,
                                            () => isSuggestedAmountIsBiggerThanPlanned && getIconWithTooltip(FiAlertTriangle, "alert-icon alert-icon-planned-bad", "Suggested amount is greater than planned amount. Please correct planned amount."))}
                                    </Col>
                                )
                        })}
                    </Row>
                    <hr/>
                    <p className="summary-page-container-title">Income categories:</p>
                    <Row className="summary-page-categories-blocks">
                        {incomeCategories
                            ?.sort((cat1,cat2) => cat2.favourite - cat1.favourite || parseInt((cat2?.summaryTransactionMap[currentMonth] ?? 0.0) - (cat1?.summaryTransactionMap[currentMonth] ?? 0.0)))
                            .map(category => {

                            let avarageLast12Month = countAvarageLast12Month(category?.summaryTransactionMap);
                            let currentMonthAmount = category?.summaryTransactionMap[currentMonth] ?? 0;
                            let lastMonthAmount = category?.summaryTransactionMap[previousMonth] ?? 0;
                            
                            return (
                                <Col key={category.categoryName + category.id} className="summary-page-block-category summary-page-block" style={{border: `3px solid ${category.colorHex}`}}>
                                    <CategoryChartModal 
                                        id={"category_chart_modal_details_income" + category.categoryName.trim() + "_" + category.id}
                                        category={category}
                                        key={"category_chart_modal_details_income" + category.categoryName.trim() + "_" + category.id}/>
                                    <p className="text-center summary-page-block-title">
                                        {category.categoryName} {category.favourite && <BsStarFill className="summary-page-block-favourite-icon"/>}
                                        {getIconWithActionAndTooltip(AiOutlineAreaChart, "category-chart-icon", () => openCategoryChartModalAction("category_chart_modal_details_income" + category?.categoryName?.trim() + "_" + category.id), "top", "Click to see chart.")}
                                    </p>
                                    <hr style={{borderColor: `${category.colorHex}`}}/>
                                    {generateCategoryField("Amount", currentMonthAmount, () => {return;})}
                                    {generateCategoryField("Avarage", avarageLast12Month, 
                                        () => {
                                            if(avarageLast12Month != 0 && currentMonthAmount != 0) {
                                                return avarageLast12Month > currentMonthAmount 
                                                    ? getIconWithTooltip(BsArrowDownRight, "alert-icon alert-icon-bad", "Current amount is lower than avarage.") 
                                                    : getIconWithTooltip(BsArrowUpRight, "alert-icon alert-icon-good", "Current amount is greater than avarage.")
                                            }
                                        })
                                    }
                                    {generateCategoryField("Last month", lastMonthAmount, 
                                        () => {
                                            if(lastMonthAmount != currentMonthAmount && currentMonthAmount != 0) {
                                                return lastMonthAmount > currentMonthAmount
                                                    ? getIconWithTooltip(BsArrowDownRight, "alert-icon alert-icon-bad", "Current amount is lower than in last month.") 
                                                    : getIconWithTooltip(BsArrowUpRight, "alert-icon alert-icon-good", "Current amount is greater than in last month.")
                                            }
                                        })
                                    }
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