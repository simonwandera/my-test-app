import React, { useState } from 'react'
import { BrowserView } from 'react-device-detect';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar'

const Network = () => {

  const [sideBar, setSideBar] = useState(false)

  const toggleSidebar = () => {
    setSideBar((prevState) => !prevState)
  }

  return (
    <div className='main shadow-lg'>
      <div className=''>
        <Sidebar sidebar={sideBar} />
      </div>
      <div className='' onClick={toggleSidebar}>
        <span className='text-dark display-6'><i className='bi bi-list'></i></span>
      </div>

      <div className='container-fluid m-2'>
        <BrowserView>
          <Outlet />
        </BrowserView>
        <BrowserView>
          <div className='display-5'> Please use PC to view this content</div>
        </BrowserView>
      </div>
    </div>
  )
}

export default Network