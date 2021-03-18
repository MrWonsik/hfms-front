import React from 'react';
import { useSelector } from 'react-redux';
import UserTools from "../_components/UserTools";

// import { userActions } from '../_actions';

const HomePageUser = () => {
    // useEffect(() => {
    //     // this.props.dispatch(userActions.getAll());
    // });

    const { user } = useSelector(state => ({
        user: state.user.user,
    }));

    return (
        <div className="col-md-6 col-md-offset-3">
            <UserTools />
            <h1>Hi {user.username}!</h1>
            <p>Your role: {user.role}</p>
            <p>You're logged in with React & JWT!!</p>
        </div>
    );
}

export default HomePageUser;