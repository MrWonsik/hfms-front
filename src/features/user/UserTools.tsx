import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, Navbar } from 'react-bootstrap'
import { BsPower, BsGearFill } from 'react-icons/bs'
import { openModalChangePassword } from '../../_components/modal/modal.actions'

import ChangePasswordModal from './ChangePasswordModal'
import HoverTooltip from '../../_components/HoverTooltip'
import { alertSuccess } from '../../_components/alert/alert.actions'
import { alertSuccess as alertSuccessTS} from '../../_components/alert/alert'
import { getMonth } from '../../_utils/dateHelper'
import moment from 'moment'
import { logout } from './oldRedux/user.actions'
import { RootState } from '../../app/storeTS'
import { TS_TURN_ON } from '../..'
import { openModal } from '../../_components/modal/modal'
import { logOut } from './user'



const UserTools = (): JSX.Element => {
  const dispatch = useDispatch()

  const { user } = useSelector((state: RootState) => ({
    user: state.user.user
  }))

  const handleChangePasswordModalOpen = (): void => {
    dispatch(TS_TURN_ON ? openModal({type: "changePassword", context: ""}) : openModalChangePassword())
  }

  const handleLogout = (): void => {
    console.log("test");
    dispatch(TS_TURN_ON ? logOut() : logout())
    dispatch(TS_TURN_ON ? alertSuccessTS('Logout successfully!') : alertSuccess('Logout successfully!'))
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
            <Nav.Link onClick={handleLogout}>
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
