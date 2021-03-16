import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useEffect } from 'react-redux';

// import { userActions } from '../_actions';

const HomePageAdmin = () => {
    // useEffect(() => {
    //     // this.props.dispatch(userActions.getAll());
    // });

    const { user, users } = useSelector(state => ({
        user: state.authentication.user,
        users: state.users
    }));

    return (
        <div className="col-md-6 col-md-offset-3">
            <h1>Hi {user.username}!</h1>
            <p>Your role: {user.role}</p>
            <p>You're logged in with React & JWT!!</p>
            <h3>Users from secure api end point:</h3>
            <Link to="/test">Test!</Link>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.id}>
                            {user.username}
                        </li>
                    )}
                </ul>
            }
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export default HomePageAdmin;