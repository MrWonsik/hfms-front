import React from "react";
import Col from "react-bootstrap/Col";
import UserTools from "../_components/UserTools";
import UsersTable from "../_components/UsersTable";


const HomePageAdmin = () => {

  return (
    <>
      <UserTools />
      <Col>
        <UsersTable />
      </Col>
    </>
  );
};

export default HomePageAdmin;
