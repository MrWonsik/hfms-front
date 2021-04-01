import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changePage } from '../user/user.actions';

const CategoryPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changePage("Category management"))
      }, []);


    return (
        <div>
            <h1>Category page!</h1>
        </div>
    );
}

export default CategoryPage;