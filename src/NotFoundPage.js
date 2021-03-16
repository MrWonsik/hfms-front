import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

// import { userActions } from '../_actions';

const NotFoundPage = () => {

    const { user } = useSelector(state => ({
        user: state.authentication.user,
    }));

    console.log(user);

    return (
        <div>
            <p>Page not found!</p>
            <p>Go to login page: </p><Link to="/login">login page.</Link>
        </div>
    );
}

export default NotFoundPage;