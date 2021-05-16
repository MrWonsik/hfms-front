import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Pie, Bar } from "react-chartjs-2";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { EXPENSE, INCOME } from '../finance/CategoryType';
import { getCategories } from '../finance/finance.actions';
import { getMonth } from '../_helpers/dateHelper';
import { getIconWithActionAndTooltip } from '../_helpers/wrapWithTooltip';

const UserCharts = () => {
    let dispatch = useDispatch();

    let [date, setDate] = useState(moment());

    let lastSixMonths = []

    for (var i = 0; i < 6; i += 1) {
        const newDate = new Date(date.year(), date.month() - i, 1);
        lastSixMonths.push(moment(newDate).format("YYYY-MM"))
    }

    lastSixMonths.reverse();

    const { expenseCategories, incomeCategories } = useSelector((state) => ({
        expenseCategories: state.finance.expenseCategories,
        incomeCategories: state.finance.incomeCategories,
    }));
  
    useEffect(() => {
      dispatch(getCategories(EXPENSE));
      dispatch(getCategories(INCOME));
    }, []);

    
    let activeMonth = lastSixMonths[5];
    const checkIsActiveMonthExistsForCategory = (category) => {
        return category.summaryTransactionMap[activeMonth] && category.summaryTransactionMap[activeMonth] != 0 
    }

    let filteredExpenseCategories = expenseCategories?.map(category => checkIsActiveMonthExistsForCategory(category) ? category : null).filter(category => category != null);
    let filteredIncomeCategories = incomeCategories?.map(category => checkIsActiveMonthExistsForCategory(category) ? category : null).filter(category => category != null);

    const incomesSummaryByMonth = lastSixMonths.map(month => incomeCategories?.map(category => category.summaryTransactionMap[month] ? category.summaryTransactionMap[month] : 0).reduce((a,b) => a + b, 0));
    const expensesSummaryByMonth = lastSixMonths.map(month => -1 * expenseCategories?.map(category => category.summaryTransactionMap[month] ? category.summaryTransactionMap[month] : 0).reduce((a,b) => a + b, 0));

    const expensesAndIncomesSummary = {
        labels: lastSixMonths, //find a way to get array with last six month
        datasets: [
          {
            label: 'incomes',
            data: incomesSummaryByMonth,
            backgroundColor: 'rgb(0, 150, 0)',
          },
          {
            label: 'expenses',
            data: expensesSummaryByMonth,
            backgroundColor: 'rgb(150, 0, 0)',
          },
        ],
      }
  
      const expenseAndIncomesOptions = {
        scales: {
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              stacked: true,
            },
          ],
        },
      }

      const getSumExpensesByCategory = () => {
        const expenses = {
          labels: filteredExpenseCategories?.map(category => category.categoryName),
          datasets: [
            {
              label: "Categories expenses and incomes amount",
              data: filteredExpenseCategories?.map(category => category.summaryTransactionMap[lastSixMonths[5]]),
              backgroundColor: filteredExpenseCategories?.map(category => category.colorHex),
              borderWidth: 1,
            },
          ],
        }
        return expenses;
      }
  
      const getSumIncomeByCategory = () => {
        const incomes = {
          labels: filteredIncomeCategories?.map(category => category.categoryName),
          datasets: [
            {
              label: "Categories expenses and incomes amount",
              data: filteredIncomeCategories?.map(category => category.summaryTransactionMap[lastSixMonths[5]]),
              backgroundColor: filteredIncomeCategories?.map(category => category.colorHex),
              borderWidth: 1,
            },
          ],
        }
        return incomes;
      }
  
      const getExpensesAndIncomesAmounts = () => {
        return expensesAndIncomesSummary;
      }

	return (
		<>
      <Row>
        <Col>
          <Row className="income-pie-container">
            <p className="text-center users-charts-pie-title">Incomes:</p>
            { filteredIncomeCategories.length != 0 ?
              <>
                <Pie data={getSumIncomeByCategory()} />
              </>
              :
              <span>No incomes transactions found.</span>
            }
          </Row>
          <Row className="justify-content-md-center expense-pie-container">
            <p className="text-center users-charts-pie-title">Expenses:</p>
            { filteredExpenseCategories.length != 0 ? 
                <>
                  <Pie data={getSumExpensesByCategory()} />
                </>
                :
                <span>No expenses transactions found.</span>
            }
          </Row>
        </Col>
        <Col className="align-self-md-center">
          <div className="date-selector-container d-flex justify-content-center">
                      {getIconWithActionAndTooltip(BsChevronCompactLeft, "table-icon-action", () => setDate((curDate) => curDate.clone().subtract(1, "months")), "top", "Previous month")}
                          <span className="transaction-current-year-and-month">{getMonth(date.month())} - {date.year()}</span>
                      {date.month() === moment().month() && date.year() === moment().year() 
                      ? getIconWithActionAndTooltip(BsChevronCompactRight, "table-icon-action disabled", () => "", "top", "Disabled") 
                      : getIconWithActionAndTooltip(BsChevronCompactRight, "table-icon-action", () => setDate((curDate) => curDate.clone().add(1, "months")), "top", "Next month")}
          </div>
          <Bar
            data={getExpensesAndIncomesAmounts()}
            options={expenseAndIncomesOptions}
          />
        </Col>
      </Row>
		</>
	);
};

export default UserCharts;
