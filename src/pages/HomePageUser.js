import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Route, Switch, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainUserPage from "../pages/MainUserPage"
import CategoryPage from "../pages/CategoryPage"
import SummaryPage from "../pages/SummaryPage"
import ShopManagementPage from "./ShopManagementPage"
import ExpensseAndIncomeListPage from "../pages/ExpensseAndIncomeListPage"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsHouse, BsFileText, BsGraphUp, BsFillCollectionFill } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import NotFoundPage from './NotFoundPage';

import { changePage } from '../user/user.actions'

const HomePageUser = ({ match }) => {
    const dispatch = useDispatch();
    const { currentPage } = useSelector((state) => ({
        currentPage: state.user.currentPage
    }));

    return (
        <>
            <Row className="justify-content-md-center">
                <Col md="5">
                        <Navbar className="justify-content-between justify-content-center user-page-navbar" >
                            <Nav.Item>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to={`${match.url}`} onClick={() => dispatch(changePage("Home"))}>
                                    <BsHouse className={"user-page-navbar-icon " + (currentPage === "Home" ? "current-page" : "")}/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to={`${match.url}/expensse-and-income-list-page`} onClick={() => dispatch(changePage("Expenses and income list"))}>
                                    <BsFileText className={"user-page-navbar-icon " + (currentPage === "Expenses and income list" ? "current-page" : "")}/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to={`${match.url}/summary-page`} onClick={() => dispatch(changePage("Summary"))}>
                                    <BsGraphUp className={"user-page-navbar-icon " + (currentPage === "Summary" ? "current-page" : "")}/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to={`${match.url}/shop-page`} onClick={() => dispatch(changePage("Shop management"))}>
                                    <AiOutlineShop className={"user-page-navbar-icon " + (currentPage === "Shop management" ? "current-page" : "")}/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to={`${match.url}/category-page`} onClick={() => dispatch(changePage("Category management"))}>
                                    <BsFillCollectionFill className={"user-page-navbar-icon " + (currentPage === "Category management" ? "current-page" : "")}/>
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
                            <Route path={`${match.path}/shop-page`} component={ShopManagementPage}/>
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