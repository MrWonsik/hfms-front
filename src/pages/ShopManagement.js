import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changePage } from '../features/user/oldRedux/user.actions'
import ShopsTable from '../features/shopsManagement/ShopsTable'

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
