import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changePage } from '../user/user.actions';

const ExpensseAndIncomeListPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changePage("Expenses and income list"));
      }, []);

    return (
        <div>
            <h1>Expensse and Income List Page</h1>
        </div>
    );
}

export default ExpensseAndIncomeListPage;