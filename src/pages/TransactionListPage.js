import React from 'react';
import TransactionsTable from '../_components/TransactionsTable';
import AddNewTransactionModal from '../_components/modal/AddNewTransactionModal';



const TransactionListPage = () => {
    return (
        <>
            <TransactionsTable />            

            <AddNewTransactionModal />
        </>
    );
}

export default TransactionListPage;