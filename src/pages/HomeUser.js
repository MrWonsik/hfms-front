import React, { useState } from 'react'
import { Jumbotron } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Main from '../pages/Main'
import Category from '../pages/CategoryManagement'
import Summary from '../pages/Summary'
import ShopManagement from '../pages/ShopManagement'
import TransactionList from '../pages/TransactionList'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { BsHouse, BsFiles, BsFillPieChartFill, BsInboxesFill } from 'react-icons/bs'
import { AiOutlineShop } from 'react-icons/ai'
import { Route, Switch, Link, BrowserRouter } from 'react-router-dom'


const HomeUser = () => {
  const { currentPage } = useSelector((state) => ({
    currentPage: state.user.currentPage
  }))

  const [currentPageDisplay, setCurrentPageDisplay] = useState(currentPage || 'Home')

  const getIconWihtAction = (IconTag, name, url = '') => {
    return (
      <Nav.Link as={Link} to={`${url}`}
          onMouseOver={() => setCurrentPageDisplay(name)}
          onMouseOut={() => setCurrentPageDisplay(currentPage)}
      >
          <IconTag
              className={'user-page-navbar-icon ' + (currentPage === name ? 'current-page' : '')}
          />
      </Nav.Link>
    )
  }

  return (
        <BrowserRouter history={history}>
            <div className="home-page-user">
            <Row className="justify-content-center">
                <h1 id="current-page" className={currentPage !== currentPageDisplay ? 'other-page-hover' : ''}>{currentPageDisplay}</h1>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg="5">
                        <Navbar className="justify-content-between justify-content-center user-page-navbar" >
                            <Nav.Item>
                                {getIconWihtAction(BsHouse, 'Home')}
                            </Nav.Item>
                            <Nav.Item>
                                {getIconWihtAction(BsFiles, 'Transaction list', '/transaction-list-page')}
                            </Nav.Item>
                            <Nav.Item>
                                {getIconWihtAction(BsFillPieChartFill, 'Summary', '/summary-page')}
                            </Nav.Item>
                            <Nav.Item>
                                {getIconWihtAction(AiOutlineShop, 'Shop management', '/shop-page')}
                            </Nav.Item>
                            <Nav.Item>
                                {getIconWihtAction(BsInboxesFill, 'Category management', '/category-page')}
                            </Nav.Item>
                        </Navbar>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg="9">
                    <Jumbotron className="user-page-block user-page-content-container">
                        <Switch>
                            <Route path={"/summary-page"} component={Summary}/>
                            <Route path={"/transaction-list-page"} component={TransactionList}/>
                            <Route path={"/shop-page"} component={ShopManagement}/>
                            <Route path={"/category-page"} component={Category}/>
                            <Route exact path={""} component={Main}/>
                        </Switch>
                    </Jumbotron>
                </Col>
            </Row>
            </div>
        </BrowserRouter>
  )
}

export default HomeUser
