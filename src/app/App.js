import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { alertClear } from '../_components/alert/alert.actions'
import HomeUser from '../pages/HomeUser'
import HomeAdmin from '../pages/HomeAdmin'
import Login from '../pages/Login'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import UserTools from '../features/user/UserTools'
import { createBrowserHistory } from 'history'

const renderHomepage = (user) => {
  switch (user.role) {
    case 'ROLE_ADMIN': return (<><UserTools /><HomeAdmin /></>)
    case 'ROLE_USER': return (<><UserTools /><HomeUser /></>)
  }
}

export const history = createBrowserHistory({ forceRefresh: true })

const App = () => {
  const [show, setShow] = useState(false)

  const { alert, user, loggedIn } = useSelector((state) => ({
    alert: state.alert,
    user: state.user.user,
    loggedIn: state.user.loggedIn
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    if (alert && alert.message) {
      setShow(true)
    }
  }, [])

  useEffect(() => {
    setShow(true)
  })

  const getAlertHeading = (type) => {
    switch (type) {
      case 'danger': return 'Error'
      case 'success': return 'Success'
    }
  }

  return (
    <>
      <Container fluid>
        <Row className="mb-6">
          <Col>
            {show && alert.message && (
              <Alert
                className="fixed-bottom alert-main"
                key={alert.message}
                variant={alert.type}
                onClose={() => dispatch(alertClear())}
                dismissible
              >
                <Alert.Heading>{getAlertHeading(alert.type)}</Alert.Heading>
                <hr/>
                <div className = "text-center">{alert.message}</div>
              </Alert>
            )}
                {!loggedIn ? <Login /> : renderHomepage(user)}
          </Col>
        </Row>
      </Container>
      <div className="author-footer">
        <div className="text-center">Tomasz Wąsacz 2021</div>
      </div>
    </>
  )
}

export default App
