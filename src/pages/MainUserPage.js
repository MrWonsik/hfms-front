import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Pie, Bar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux';
import { getShops } from '../expense/expense.actions';

const MainUserPage = () => {
    let dispatch = useDispatch();

    const { shops, shopsIsLoading } = useSelector((state) => ({
      shops: state.expenses.shops,
      shopsIsLoading: state.expenses.isLoading
    }));

    useEffect(() => {
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
                <Col className="main-user-page-summary-last-exp m-2">List of last added expenses and income</Col>
                <Col className="main-user-page-last-shops m-2">
                  {!shops && shopsIsLoading ? <Spinner animation="border text-center" size="lg" /> : 
                    <>
                      List of last added shops:
                      <ul>
                        {shops?.sort((a,b) => ( new Date(b.createDate) - new Date(a.createDate))).slice(0, 5).map(shop => (
                          <li key={shop.id}>{shop.shopName} ({shop.createDate})</li>
                        ))}
                        see more...
                      </ul>
                    </>
                  }
                </Col>
                <Col className="main-user-page-last-categories m-2">List of last added categories</Col>
            </Row>
        </>
    );
}

export default MainUserPage;