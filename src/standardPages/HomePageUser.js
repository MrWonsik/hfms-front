import React, { useState } from 'react'
import { Jumbotron } from 'react-bootstrap'
import { Route, Switch, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MainUserPage from '../features/summary/MainUserPage'
import CategoryPage from '../features/categoriesManagement/CategoryPage'
import SummaryPage from '../features/summary/SummaryPage'
import ShopManagementPage from '../features/shopsManagement/ShopManagementPage'
import TransactionListPage from '../features/transactionsManagement/TransactionListPage'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { BsHouse, BsFiles, BsFillPieChartFill, BsInboxesFill } from 'react-icons/bs'
import { AiOutlineShop } from 'react-icons/ai'

const HomePageUser = (browser) => {
  const match = browser.match
  const { currentPage } = useSelector((state) => ({
    currentPage: state.user.currentPage
  }))

  const [currentPageDisplay, setCurrentPageDisplay] = useState(currentPage || 'Home')

  const getIconWihtAction = (IconTag, name, url = '') => {
    return (
      <Nav.Link as={Link} to={`${match.url}${url}`}
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
        <>
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
                            <Route path={`${match.path}/summary-page`} component={SummaryPage}/>
                            <Route path={`${match.path}/transaction-list-page`} component={TransactionListPage}/>
                            <Route path={`${match.path}/shop-page`} component={ShopManagementPage}/>
                            <Route path={`${match.path}/category-page`} component={CategoryPage}/>
                            <Route exact path={`${match.path}`} component={MainUserPage}/>
                            {/* <Route path="*" component={NotFoundPage}/> */}
                        </Switch>
                    </Jumbotron>
                </Col>
            </Row>
            </div>
        </>
  )
}

export default HomePageUser
