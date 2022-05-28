import React, { useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect';
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
        <MobileView>
          <div class="alert shadow alert-dark mt-4" role="alert"> <p className='h5'>Please use PC to view this content</p></div>
        </MobileView>
      </div>
    </div>
  )
}

export default Network