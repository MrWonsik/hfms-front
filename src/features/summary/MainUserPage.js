import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changePage } from '../user/oldRedux/user.actions'
import UserCharts from './UserCharts'

const MainUserPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changePage('Home'))
  }, [])

  return (
        <>
            <UserCharts />
            <hr/>
        </>
  )
}

export default MainUserPage
