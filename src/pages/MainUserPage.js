import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import { Pie, Bar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux';
import { getShops } from '../finance/finance.actions';
import { Link } from 'react-router-dom';
import { changePage } from '../user/user.actions';
import { ListGroup } from 'react-bootstrap';

const MainUserPage = () => {
    let dispatch = useDispatch();

    const { shops, isShopsLoading, expenseCategories, isExpenseCategoriesLoading } = useSelector((state) => ({
      shops: state.finance.shops,
      expenseCategories: state.finance.expenseCategories,
      isShopsLoading: state.finance.isShopsLoading,
      isExpenseCategoriesLoading: state.finance.isExpenseCategoriesLoading
    }));

    useEffect(() => {
      dispatch(changePage("Home"))
      dispatch(getShops());
    }, []);

    const rand = () => Math.round(Math.random() * 20)

    const data = {
        datasets: [
          {
            data: [rand(), rand(), rand(), rand(), rand(), rand()],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
            borderWidth: 3,
          },
        ],
      }

      const data2 = {
        labels: ['january', 'february', 'march'],
        datasets: [
          {
            label: 'expenses',
            data: [rand(), rand(), rand()],
            backgroundColor: 'rgb(0, 150, 0)',
          },
          {
            label: 'incomes',
            data: [(-1 * rand()), (-1 * rand()), (-1 * rand())],
            backgroundColor: 'rgb(150, 0, 0)',
          },
        ],
      }

      const options2 = {
        scales: {
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              stacked: true,
            },
          ],
        },
      }

    return (
        <>
            <Row className="justify-content-md-center">
                <Col className="m-4"><Pie data={data} /></Col>
                <Col className="m-4"><Bar data={data2} options={options2} /></Col>
            </Row>
            <Row className="justify-space-between">
                <Col className="main-user-page-summary-last-exp m-2">
                {!expenseCategories && isExpenseCategoriesLoading ? <Spinner animation="border text-center" size="lg" /> : 
                    <>
                      <p className="text-center font-weight-bold">Last added categories:</p>
                      { expenseCategories && expenseCategories.length > 0 ?
                        <> 
                          <ListGroup variant="flush">
                            {expenseCategories?.sort((a,b) => ( new Date(b.createDate.date) - new Date(a.createDate.date)))
                                  .sort((a,b) => (b.createDate.time.localeCompare(a.createDate.time)))
                                  .slice(0, 5)
                                  .map(category => (
                                    <ListGroup.Item key={category.id}>{category.categoryName} <span className="additionaly-info">({category.createDate.date})</span></ListGroup.Item>
                                  ))}
                                  <ListGroup.Item className="text-right"><Link className="" to="/home/category">see more</Link></ListGroup.Item>
                          </ListGroup>
                        </> :
                        <> 
                          <p>You don't have any categories added!</p> 
                          <p><Link to="/home/category-page">Click here</Link> to go to category management page.</p>
                        </>
                      }
                    </>
                  }
                </Col>
                <Col className="main-user-page-last-shops m-2">
                  {!shops && isShopsLoading ? <Spinner animation="border text-center" size="lg" /> : 
                    <>
                      <p className="text-center font-weight-bold">Last added shops:</p>
                      { shops && shops.length > 0 ?
                        <> 
                          <ListGroup variant="flush">
                            {shops?.sort((a,b) => ( new Date(b.createDate.date) - new Date(a.createDate.date)))
                                  .sort((a,b) => (b.createDate.time.localeCompare(a.createDate.time)))
                                  .slice(0, 5)
                                  .map(shop => (
                                    <ListGroup.Item key={shop.id}>{shop.shopName} <span className="additionaly-info">({shop.createDate.date})</span></ListGroup.Item>
                                  ))}
                                  <ListGroup.Item className="text-right"><Link className="" to="/home/shop-page">see more</Link></ListGroup.Item>
                          </ListGroup>
                        </> :
                        <> 
                          <p>You don't have any shops added!</p> 
                          <p><Link to="/home/shop-page">Click here</Link> to go to shop management page.</p>
                        </>
                      }
                    </>
                  }
                </Col>
                <Col className="main-user-page-last-categories m-2">
                {!shops && isShopsLoading ? <Spinner animation="border text-center" size="lg" /> : 
                    <>
                      <p className="text-center font-weight-bold">Last added expenses and incomes:</p>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="text-right"><Link className="" to="/home/shop-page">see more</Link></ListGroup.Item>
                      </ListGroup>
                    </>
                }
                </Col>
            </Row>
        </>
    );
}

export default MainUserPage;