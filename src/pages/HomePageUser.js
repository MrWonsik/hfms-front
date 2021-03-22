import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Route, Switch, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MainUserPage from "../pages/MainUserPage"
import CategoryPage from "../pages/CategoryPage"
import SummaryPage from "../pages/SummaryPage"
import ShopPage from "../pages/ShopPage"
import ExpensseAndIncomeListPage from "../pages/ExpensseAndIncomeListPage"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsHouse, BsFileText, BsGraphUp, BsFillCollectionFill } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import NotFoundPage from './NotFoundPage';

const HomePageUser = ({ match }) => {
    const { user, loggedIn } = useSelector((state) => ({
        user: state.user.user,
        loggedIn: state.user.loggedIn
    }));

    return (
        <>
            <Row className="justify-content-md-center">
                <Col md="6">
                        <Navbar className="justify-content-between justify-content-center user-page-navbar" >
                            <Nav.Item>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to={`${match.url}`}><BsHouse className="user-page-navbar-icon"/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to={`${match.url}/expensse-and-income-list-page`}><BsFileText className="user-page-navbar-icon"/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to={`${match.url}/summary-page`}><BsGraphUp className="user-page-navbar-icon"/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to={`${match.url}/shop-page`}><AiOutlineShop className="user-page-navbar-icon"/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to={`${match.url}/category-page`}><BsFillCollectionFill className="user-page-navbar-icon"/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            </Nav.Item>
                        </Navbar>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="9">
                    <Jumbotron className="user-page-block user-page-content-container">
                        <Switch>
                            <Route path={`${match.path}/summary-page`} component={SummaryPage}/>
                            <Route path={`${match.path}/expensse-and-income-list-page`} component={ExpensseAndIncomeListPage}/>
                            <Route path={`${match.path}/shop-page`} component={ShopPage}/>
                            <Route path={`${match.path}/category-page`} component={CategoryPage}/>
                            <Route exact path={`${match.path}`} component={MainUserPage}/>
                            <Route path="*" component={NotFoundPage}/>
                        </Switch>
                    </Jumbotron>
                </Col>
            </Row>
        </>
    );
}

export default HomePageUser;