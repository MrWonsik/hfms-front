import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { BsPower, BsGearFill } from 'react-icons/bs'
import { openModalChangePassword } from '../../_components/modal/modal.actions'

import ChangePasswordModal from './ChangePasswordModal'
import HoverTooltip from '../../_components/HoverTooltip'
import { alertSuccess } from '../../_components/alert/alert.actions'
import { getMonth } from '../../_services/dateHelper'
import moment from 'moment'

const UserTools = () => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => ({
    user: state.user.user
  }))

  const handleChangePasswordModalOpen = () => {
    dispatch(openModalChangePassword())
  }

  const handleLogout = () => {
    dispatch(alertSuccess('Logout successfully!'))
  }

  const now = moment()

  return (
    <>
      <Navbar className="navbar-main justify-content-end">
        <Nav>
          <Navbar.Text className="navbar-username-container">
            Logged in as: <span className="navbar-username">{user.username}</span>
            <br/>
            <span className="navbar-main-date text-center">{now.date()} {getMonth(now.month())} {now.year()}</span>
          </Navbar.Text>
          <Nav.Item>
            <Nav.Link onClick={handleChangePasswordModalOpen}>
              <HoverTooltip
                el={<BsGearFill className="navbar-icon" />}
                msg="User settings"
                placement="bottom"
              />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/login" onClick={handleLogout}>
              <HoverTooltip
                el={<BsPower className="navbar-icon"/>}
                msg="Logout"
                placement="bottom"
              />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>

      <ChangePasswordModal />
    </>
  )
}

export default UserTools
