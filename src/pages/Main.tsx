import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changePage } from '../features/user/oldRedux/user.actions'
import UserCharts from '../features/summary/UserCharts'

const Main = (): JSX.Element => {
  const dispatch = useDispatch()

  useEffect((): void => {
    dispatch(changePage('Home'))
  }, [])

  return (
    
        <>
            <UserCharts />
            <hr/>
        </>
  )
}

export default Main
