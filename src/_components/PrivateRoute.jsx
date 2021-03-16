import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';

export const PrivateRoute = ({ component: Component, user, role, ...rest }) => {
    return (
        <Route exact {...rest} render={props => {
            if(user === undefined) {
                return <Redirect to="/login" />
            }
            if(user.role === role) {
                return <Component {...props} />
            }
        }} />
)}