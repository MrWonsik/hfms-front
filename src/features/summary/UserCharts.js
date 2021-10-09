import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Pie, Bar } from 'react-chartjs-2'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { EXPENSE, INCOME } from '../../features/finance-oldRedux/CategoryType'
import { getAllTransactions, getCategories } from '../../features/finance-oldRedux/finance.actions'
import { EXPENSE_TRANSACTION } from '../../features/finance-oldRedux/TransactionType'
import { getMonth } from '../../_services/dateHelper'
import { getIconWithActionAndTooltip } from '../../_components/HoverTooltip'
import { getCurrency } from '../../_services/currencyGetter'

const UserCharts = () => {
  const dispatch = useDispatch()

  const [date, setDate] = useState(moment())

  const lastSixMonths = []

  for (let i = 0; i < 6; i += 1) {
    const newDate = new Date(date.year(), date.month() - i, 1)
    lastSixMonths.push(moment(newDate).format('YYYY-MM'))
  }

  lastSixMonths.reverse()

  const { expenseCategories, incomeCategories, expenseTransactions, incomeTransactions, isTransactionsLoading, isExpenseCategoriesLoading, isIncomeCategoriesLoading } = useSelector((state) => ({
    expenseCategories: state.finance.expenseCategories,
    incomeCategories: state.finance.incomeCategories,
    expenseTransactions: state.finance.expenseTransactions,
    incomeTransactions: state.finance.incomeTransactions,
    isTransactionsLoading: state.finance.isTransactionsLoading,
    isExpenseCategoriesLoading: state.finance.isExpenseCategoriesLoading,
    isIncomeCategoriesLoading: state.finance.isIncomeCategoriesLoading
  }))

  useEffect(() => {
    dispatch(getCategories(EXPENSE))
    dispatch(getCategories(INCOME))
    dispatch(getAllTransactions({ year: date.year(), month: date.month() }))
  }, [])

  const transactions = expenseTransactions?.concat(incomeTransactions)

  const activeMonth = lastSixMonths[5]
  const checkIsActiveMonthExistsForCategory = (category) => {
    return category.summaryTransactionMap[activeMonth] && category.summaryTransactionMap[activeMonth] !== 0
  }

  const filteredExpenseCategories = expenseCategories?.map(category => checkIsActiveMonthExistsForCategory(category) ? category : null).filter(category => category != null)
  const filteredIncomeCategories = incomeCategories?.map(category => checkIsActiveMonthExistsForCategory(category) ? category : null).filter(category => category != null)

  const filteredExpenseCategoriesData = {
    labels: filteredExpenseCategories?.map(category => category.categoryName),
    datasets: [
      {
        label: 'Categories expenses and incomes amount',
        data: filteredExpenseCategories?.map(category => category.summaryTransactionMap[lastSixMonths[5]]),
        backgroundColor: filteredExpenseCategories?.map(category => category.colorHex),
        borderWidth: 1
      }
    ]
  }

  const filteredIncomeCategoriesData = {
    labels: filteredIncomeCategories?.map(category => category.categoryName),
    datasets: [
      {
        label: 'Categories expenses and incomes amount',
        data: filteredIncomeCategories?.map(category => category.summaryTransactionMap[lastSixMonths[5]]),
        backgroundColor: filteredIncomeCategories?.map(category => category.colorHex),
        borderWidth: 1
      }
    ]
  }

  const getSumOfTransactions = (type, month) => type?.map(category => category.summaryTransactionMap[month] ? category.summaryTransactionMap[month] : 0).reduce((a, b) => a + b, 0).toFixed(2)

  const incomesSummaryByMonth = lastSixMonths.map(month => getSumOfTransactions(incomeCategories, month))
  const expensesSummaryByMonth = lastSixMonths.map(month => -1 * getSumOfTransactions(expenseCategories, month))

  const expensesAndIncomesSummary = {
    labels: lastSixMonths, // find a way to get array with last six month
    datasets: [
      {
        stack: 'expenses-and-incomes',
        label: 'incomes',
        data: incomesSummaryByMonth,
        backgroundColor: 'rgb(0, 150, 0)'
      },
      {
        stack: 'expenses-and-incomes',
        label: 'expenses',
        data: expensesSummaryByMonth,
        backgroundColor: 'rgb(150, 0, 0)'
      }
    ]
  }

  const expenseAndIncomesOptions = {
    scales: {
      y: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }
      ],
      x: [
        {
          stacked: true
        }
      ]
    }
  }

  const getExpensesAndIncomesAmounts = () => {
    return expensesAndIncomesSummary
  }

  return (<>
      <div className="date-selector-container d-flex justify-content-center">
          {getIconWithActionAndTooltip(BsChevronCompactLeft, 'table-icon-action', () => setDate((curDate) => curDate.clone().subtract(1, 'months')), 'top', 'Previous month')}
              <span className="transaction-current-year-and-month">{getMonth(date.month())} - {date.year()}</span>
          {date.month() === moment().month() && date.year() === moment().year()
            ? getIconWithActionAndTooltip(BsChevronCompactRight, 'table-icon-action disabled', () => '', 'top', 'Disabled')
            : getIconWithActionAndTooltip(BsChevronCompactRight, 'table-icon-action', () => setDate((curDate) => curDate.clone().add(1, 'months')), 'top', 'Next month')}
      </div>
      <Row>
        <Col sm={12} md={12} lg={5} xl={5}>
          <div className="pie-container income-pie-container">
            <div className="users-charts-title-container">
              <p className="users-charts-incomes">Incomes</p>
              {isIncomeCategoriesLoading && <Spinner className="users-charts-incomes users-charts-spinner income" animation="border" size="sm" />}
              <p className="users-charts-sum users-charts-incomes"><GiReceiveMoney/> {getSumOfTransactions(incomeCategories, activeMonth)} {getCurrency()}</p>
            </div>
            { filteredIncomeCategories?.length !== 0
              ? <>
                {!isTransactionsLoading && filteredIncomeCategories && <Pie data={filteredIncomeCategoriesData} />}
              </>
              : <p className="text-center">No incomes transactions found.</p>
            }
          </div>
          <div className="pie-container expense-pie-container">
            <div className="users-charts-title-container">
              <p className="text-center users-charts-expenses">Expenses</p>
              {isExpenseCategoriesLoading && <Spinner className="users-charts-expenses users-charts-spinner expense" animation="border" size="sm" />}
              <p className="text-right users-charts-sum users-charts-expenses"><GiPayMoney/> {getSumOfTransactions(expenseCategories, activeMonth)} {getCurrency()}</p>
            </div>
            { filteredExpenseCategories?.length !== 0
              ? <>
                  {!isTransactionsLoading && filteredExpenseCategories && <Pie data={filteredExpenseCategoriesData}/>}
                </>
              : <p className="text-center">No expenses transactions found.</p>
            }
          </div>
        </Col>
        <Col sm={12} md={12} lg={7} xl={7}>
          {!isTransactionsLoading &&
            <Bar
            data={getExpensesAndIncomesAmounts()}
            options={expenseAndIncomesOptions}
            />
          }
          <hr/>
            <div>
              <p className="text-center font-weight-bold">Last transactions</p>
              {isTransactionsLoading
                ? <div className="text-center"><Spinner animation="border" size="lg" /></div>
                : transactions?.length > 0
                  ? <>
                  <Table striped bordered>
                    <tbody>
                      {transactions?.sort((a, b) => (new Date(b.createdDate) - new Date(a.createdDate)))
                        .slice(0, 4)
                        .map(transaction => {
                          const isExpenseTransaction = transaction.type === EXPENSE_TRANSACTION
                          const sign = isExpenseTransaction ? <GiPayMoney/> : <GiReceiveMoney/>
                          const tdClass = isExpenseTransaction ? 'expense-amount-last-transaction-table' : 'income-amount-last-transaction-table'
                          return (
                            <tr key={transaction.id + transaction.name}>
                              <td>{transaction.name}</td>
                              <td>{transaction.createdDate}</td>
                              <td className={tdClass}>{sign} {transaction.amount.toFixed(2)} {getCurrency()}</td>
                            </tr>)
                        }
                        )
                      }
                    </tbody>
                  </Table>
                  <p className="text-right"><Link className="" to="/home/transaction-list-page">see more</Link></p>
                </>
                  : <>
                  <p>You don`t have any transactins added!</p>
                  <p><Link to="/home/transaction-list-page">Click here</Link> to go to transactions page.</p>
                </>
              }
            </div>
        </Col>
      </Row>
    </>
  )
}

export default UserCharts
