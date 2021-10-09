import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changePage } from '../user/oldRedux/user.actions'
import ShopsTable from './ShopsTable'

const ShopManagementPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changePage('Shop management'))
  }, [])

  return (
        <>
            <ShopsTable />
        </>
  )
}

export default ShopManagementPage
