import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return <div style={{ width: '100%', padding: '20px' }} className="text-center"><Spinner animation="border" size="lg" /></div>
}

export default Loader
