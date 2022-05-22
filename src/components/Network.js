import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar'


const Network = () => {

  return (
    <div className='main shadow-lg'>
      <Sidebar />
      <div className='bg-white w-100'>
        <Outlet />
      </div>
    </div>
  )
}

export default Network