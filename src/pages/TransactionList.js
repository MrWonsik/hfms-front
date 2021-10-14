import React from 'react'
import TransactionsTable from '../features/transactionsManagement/TransactionsTable'
import AddNewTransactionModal from '../features/transactionsManagement/AddNewTransactionModal'

const TransactionList = () => {
  return (
        <>
            <TransactionsTable />
            <AddNewTransactionModal />
        </>
  )
}

export default TransactionList
