import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changePage } from '../user/user.actions';

const SummaryPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changePage("Summary"))
      }, []);


    return (
        <div>
            <h1>Summary Page</h1>
        </div>
    );
}

export default SummaryPage;