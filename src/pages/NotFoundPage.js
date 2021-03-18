import React from 'react';
import { Link } from 'react-router-dom';

// import { userActions } from '../_actions';

const NotFoundPage = () => {

    return (
        <div>
            <h1>Page not found!</h1>
            <p>Go to main page: <Link to="/home">home</Link></p>
            <p>Go to login page: <Link to="/login">login</Link></p>
        </div>
    );
}

export default NotFoundPage;