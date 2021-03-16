import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useEffect } from 'react-redux';
import { Col } from 'react-bootstrap';

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
        <Col md={{ span: 6, offset: 3 }}>
            <p className="text-right"><Link to="/login">Logout</Link></p>
            <h1>Hi {user.username}!</h1>
            <h2>Users list:</h2>
            {users.loading && <Spinner animation="border" size="sm" />}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                //TODO: change to react table!!!!!!
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.id}>
                            {user.username}
                        </li>
                    )}
                </ul>
            }

        </Col>
    );
}

export default HomePageAdmin;