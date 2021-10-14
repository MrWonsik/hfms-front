import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
        <Row className="justify-content-md-center page-not-found-container">
            <Col md="6" className="justify-content-md-center text-center">
                <h1>Page not found!</h1>
                <Link to="/home">Back to home page...</Link>
            </Col>
        </Row>
  )
}

export default NotFoundPage
