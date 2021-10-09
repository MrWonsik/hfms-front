import React from 'react'
import TransactionsTable from './TransactionsTable'
import AddNewTransactionModal from './AddNewTransactionModal'

const TransactionListPage = () => {
  return (
        <>
            <TransactionsTable />
            <AddNewTransactionModal />
        </>
  )
}

export default TransactionListPage
