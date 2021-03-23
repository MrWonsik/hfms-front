import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Jumbotron } from 'react-bootstrap';

const MainUserPage = () => {

    return (
        <>
            <h1 className="text-center">Home</h1>
            <Row className="justify-content-md-center">
                <Col className="main-user-page-summary m-2">short summary (for example some info about this month)</Col>
            </Row>
            <Row className="justify-space-between">
                <Col className="main-user-page-summary-last-exp m-2">List of last added expenses and income</Col>
                <Col className="main-user-page-last-shops m-2">List of last added shops</Col>
                <Col className="main-user-page-last-categories m-2">List of last added categories</Col>
            </Row>
        </>
    );
}

export default MainUserPage;