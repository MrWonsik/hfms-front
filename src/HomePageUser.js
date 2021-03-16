import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import { userActions } from '../_actions';

const HomePageUser = () => {
    // useEffect(() => {
    //     // this.props.dispatch(userActions.getAll());
    // });

    const { user } = useSelector(state => ({
        user: state.authentication.user,
    }));

    return (
        <div className="col-md-6 col-md-offset-3">
            <h1>Hi {user.username}!</h1>
            <p>Your role: {user.role}</p>
            <p>You're logged in with React & JWT!!</p>
            <Link to="/test">Test!</Link>
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export default HomePageUser;