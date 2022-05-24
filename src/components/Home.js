import React, { useEffect, useContext, useCallback, useState } from 'react'
import Header from './Header'
import { userContext } from './userContext';
import { Outlet } from 'react-router-dom';
import { clientContext } from './ClientContext';

const Home = () => {

  const { userProfile, setUserProfile } = useContext(userContext)
  const { clientData, setClientData} = useContext(clientContext)
  const [ip, setIp] = useState(clientData.IPv4)
  const [country, setCountry] = useState(clientData.country_name)
  const [device, setDevice] = useState(clientData.device)
  const [checkRequest, setCheckRequest] = useState()
  const [username, setUsername] = useState(userProfile ? userProfile.username : 'unauthorised')

  useEffect(() => {
      fetch('https://traffic.pythonanywhere.com/api/product/check_request', {
        method: 'POST',
        body: JSON.stringify({ device, ip, country, username }),
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then(responce => {
        if (!responce.ok) {
          console.log("Failed request")
        } else {
          console.log('Logged')
        }
        return responce.json();
      }).then(data => {
        if (data) {
          setCheckRequest(data)
        }

      }).catch(error => {
        console.log(error.responce, error.status, error.headers)
      })
    

  }, [ip, country])


  return (
    <div className='w-100'>
         
        <div className='sticky-top'>
          <Header />
        </div>
        {(checkRequest && (checkRequest.success || (userProfile && userProfile.userType === 'ADMIN'))) && 
         
          <Outlet />
        }

        {(!userProfile || (userProfile && userProfile.userType !== 'ADMIN')) &&
          <div className=''>
            {!userProfile && clientData.allow_auth === 'deny' &&
              <div className='col-8 m-2 p-2 m-auto'>
                <div class="alert shadow alert-danger mt-4" role="alert"> <p className='h5'>Request denied Please Log in to proceed</p></div>
              </div>}

            {checkRequest && checkRequest.device &&
              <div className='col-8 m-2 p-2 m-auto'>
                <div class="alert shadow alert-danger mt-4" role="alert"> <p className='h5'>Your device is blocked. Please switch to another device</p></div>
              </div>}

            {checkRequest && checkRequest.country &&
              <div className='col-8 m-2 p-2 m-auto'>
                <div class="alert shadow alert-danger mt-4" role="alert"> <p className='h5'>Request denied because your country is blocked</p></div>
              </div>}

            {checkRequest && checkRequest.ip &&
              <div className='col-8 m-2 p-2 m-auto'>
                <div class="alert shadow alert-danger mt-4" role="alert"> <p className='h5'>Request denied because your IP is blocked</p></div>
              </div>}
          </div>}
      </div>

  )
}

export default Home
