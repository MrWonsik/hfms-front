import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Container, Row, Col, Alert } from 'react-bootstrap'

import HomeUser from '../pages/HomeUser'
import HomeAdmin from '../pages/HomeAdmin'
import Login from '../pages/Login'
import UserTools from '../features/user/UserTools'
import { alertClear } from '../_components/alert/alert.actions'
import { alertClear as alertClearTS, AlertType} from '../_components/alert/alert'
import { TS_TURN_ON } from '..'
import { RootState } from './storeTS'

const App = (): JSX.Element => {
  const [show, setShow] = useState<boolean>(false)

  const { alert, user, loggedIn } = useSelector((state: RootState) => ({
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

  const renderHomepage = (): JSX.Element => {
    switch (user.role) {
      case 'ROLE_ADMIN': return (<><UserTools /><HomeAdmin /></>)
      case 'ROLE_USER': return (<><UserTools /><HomeUser /></>)
    }
  }

  const getAlertHeading = (type: AlertType): "Error" | "Success" => {
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
                onClose={() => dispatch(TS_TURN_ON ? alertClearTS() : alertClear())}
                dismissible
              >
                <Alert.Heading>{getAlertHeading(alert.type)}</Alert.Heading>
                <hr/>
                <div className = "text-center">{alert.message}</div>
              </Alert>
            )}
                {!loggedIn ? <Login /> : renderHomepage()}
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
