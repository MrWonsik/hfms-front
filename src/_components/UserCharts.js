import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Pie, Bar } from "react-chartjs-2";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EXPENSE, INCOME } from '../finance/CategoryType';
import { getAllTransactions, getCategories } from '../finance/finance.actions';
import { EXPENSE_TRANSACTION } from '../finance/TransactionType';
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

    const { expenseCategories, incomeCategories, expenseTransactions, incomeTransactions, isTransactionsLoading } = useSelector((state) => ({
        expenseCategories: state.finance.expenseCategories,
        incomeCategories: state.finance.incomeCategories,
        expenseTransactions: state.finance.expenseTransactions,
        incomeTransactions: state.finance.incomeTransactions,
        isTransactionsLoading: state.finance.isTransactionsLoading
    }));
  
    useEffect(() => {
      dispatch(getCategories(EXPENSE));
      dispatch(getCategories(INCOME));
      dispatch(getAllTransactions({year: date.year(), month: date.month()}))
    }, []);

    var transactions = expenseTransactions?.concat(incomeTransactions);
    
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
      <div className="date-selector-container d-flex justify-content-center">
          {getIconWithActionAndTooltip(BsChevronCompactLeft, "table-icon-action", () => setDate((curDate) => curDate.clone().subtract(1, "months")), "top", "Previous month")}
              <span className="transaction-current-year-and-month">{getMonth(date.month())} - {date.year()}</span>
          {date.month() === moment().month() && date.year() === moment().year() 
          ? getIconWithActionAndTooltip(BsChevronCompactRight, "table-icon-action disabled", () => "", "top", "Disabled") 
          : getIconWithActionAndTooltip(BsChevronCompactRight, "table-icon-action", () => setDate((curDate) => curDate.clone().add(1, "months")), "top", "Next month")}
      </div>
      <Row>
        <Col lg={6}>          
          <div className="income-pie-container">
            <p className="text-center users-charts-pie-title">Incomes:</p>
            { filteredIncomeCategories?.length != 0 ?
              <>
                {isTransactionsLoading ? "loading..." : <Pie data={getSumIncomeByCategory()}/>}
              </>
              :
              <p className="text-center">No incomes transactions found.</p>
            }
          </div>
          <div className="expense-pie-container">
            <p className="text-center users-charts-pie-title">Expenses:</p>
            { filteredExpenseCategories?.length != 0 ? 
                <>
                  {isTransactionsLoading ? "loading..." : <Pie data={getSumExpensesByCategory()}/>}
                </>
                :
                <p className="text-center">No expenses transactions found.</p>
            }
          </div>
        </Col>
        <Col lg={6}>
          <Bar
            data={getExpensesAndIncomesAmounts()}
            options={expenseAndIncomesOptions}
          />
          <hr/>
            <div>
              <p className="text-center font-weight-bold">Last added expenses and incomes:</p>
              {isTransactionsLoading ? <div className="text-center"><Spinner animation="border" size="lg" /></div> : transactions?.length > 0 ?
                <> 
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Transaction name</th>
                        <th>Transaction date</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions?.sort((a,b) => (new Date(b.createdDate) - new Date(a.createdDate)))
                        .slice(0, 4)
                        .map(transaction => {
                          let isExpenseTransaction = transaction.type === EXPENSE_TRANSACTION;
                          let sign = isExpenseTransaction ? "-" : "+";
                          let tdClass = isExpenseTransaction ? "expense-amount-last-transaction-table" : "income-amount-last-transaction-table"
                          return (                          
                            <tr key={transaction.id + transaction.name}>
                              <td>{transaction.name}</td>
                              <td>{transaction.createdDate}</td>
                              <td className={tdClass}>{sign}{transaction.amount} zł</td>
                            </tr>)
                        }
                        )
                      }
                    </tbody>
                  </Table>
                  <p className="text-right"><Link className="" to="/home/transaction-list-page">see more</Link></p>
                </> :
                <> 
                  <p>You don`t have any transactins added!</p> 
                  <p><Link to="/home/transaction-list-page">Click here</Link> to go to transactions page.</p>
                </>
              }
            </div>
        </Col>
      </Row>
		</>
	);
};

export default UserCharts;
