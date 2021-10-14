import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import UsersTable from '../features/usersManagement/UsersTable'

const HomePageAdmin = () => {
  return (
    <>
      <Row className="justify-content-md-center home-page-admin">
        <Col md="9">
          <UsersTable />
        </Col>
      </Row>
    </>
  )
}

export default HomePageAdmin
