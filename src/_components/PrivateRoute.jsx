import React from 'react';
import { Route } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';

export const PrivateRoute = ({ component: Component, user, role, ...rest }) => {
    console.log(user);
    console.log(role);
    return (
    <Route {...rest} render={props => (
        user && user !== null && user.role === role
            ? <Component {...props} />
            : <NotFoundPage />
    )} />
)}