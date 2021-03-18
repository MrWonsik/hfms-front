import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import UserTools from "../_components/UserTools";

import { getAllUsers } from '../user/users/users.actions';

const HomePageAdmin = () => {
  const dispatch = useDispatch();  
  const { user, users } = useSelector((state) => ({
    user: state.user.user,
    users: state.users
  }));

  const [usersLoaded, setUsersLoaded] = useState(false);

  useEffect(() => {
      dispatch(getAllUsers(user.token)).then(setUsersLoaded(true));
  }, []);

  return (
    <Col md={{ span: 6, offset: 3 }}>
      <UserTools />
      <h1>Hi {user.username}!</h1>
      <h2>Users list:</h2>
      {usersLoaded && users.users ? 
      <ul>
        {users.users.map((user) => (
          <li key={user.id}>{user.username} ({user.role}) - is enabled: {user.isEnabled}</li>
        ))}
    </ul> : <Spinner animation="border" size="sm" />}
    </Col>
  );
};

export default HomePageAdmin;
