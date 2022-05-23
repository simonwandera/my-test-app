import { useMemo, useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import User from './components/User';
import { userContext } from './components/userContext';
import { clientContext } from './components/ClientContext';
import Home from './components/Home';
import Network from './components/Network';
import RequireAuth from './components/RequireAuth';
import Requests from './components/Requests';
import BlockedCounties from './components/BlockedCounties';
import Blockedip from './components/Blockedip';
import BlockedUser from './components/BlockedUser';
import UseBrowser from './components/UseBrowser';
import { isMobile, isBrowser } from 'react-device-detect';
import Panel from './components/Panel';
import Unauthorised from './components/Unauthorised';
import useFetch from './components/useFetch';

function App() {
  const [userProfile, setUserProfile] = useState()
  const [clientData, setClientData] = useState(null)
  const clientProvider = useMemo(() => ({ clientData, setClientData }), [clientData, setClientData])
  const userProfileProvider = useMemo(() => ({ userProfile, setUserProfile }), [userProfile, setUserProfile])
  const browser = UseBrowser()
  const [device, setDevice] = useState(isMobile ? "Mobile" : isBrowser ? "PC" : 'Unknown Device')
  const [blockAuth, setBlockAuth] = useState(false)

  useEffect(() => {
    fetch('https://traffic.pythonanywhere.com/api/auth/allow_authenticated', {
      method: 'GET',

    }).then(responce => {
      if (!responce.ok) {
      } else {
        console.log('You have details')
      }
      return responce.json();
    }).then(data => {

      setBlockAuth(data.status)

    }).catch(error => {
      console.log(error.responce, error.status, error.headers)
    })
  }, [blockAuth])

  const {data, isPending, error} = useFetch('/api/product/check_mobile')

  useEffect(() => {
    fetch('https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0', {
      method: 'GET',

    }).then(responce => {
      if (!responce.ok) {
      } else {
        console.log('You have details')
      }
      return responce.json();
    }).then(data => {
      if (data) {
        setClientData(data)
      }

    }).catch(error => {
      console.log(error.responce, error.status, error.headers)
    })
  }, [])

  useEffect(() => {
    fetch('https://traffic.pythonanywhere.com/api/auth/profile', {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(responce => {
      if (!responce.ok) {
        localStorage.clear()
      } else {
        console.log('Logged in')
      }
      return responce.json();
    }).then(data => {
      if (data.access_token) {
        localStorage.setItem("token", data.access_token)
        setUserProfile(data)
      }

    }).catch(error => {
      console.log(error.responce, error.status, error.headers)
    })
  }, [])

  clientData && (clientData.browser = browser)
  clientData && (clientData.device = device)
  clientData && blockAuth && (clientData.allow_auth = blockAuth)
  clientData && data && (clientData.allow_mobile = data.allow_mobile)


  return (
    <Router>
      <userContext.Provider value={userProfileProvider}>
        <clientContext.Provider value={clientProvider}>

        <Routes>
          {clientData &&
            <Route exact path='' element={<Home/>}>
              {/* User Route */}
              <Route path="" element={< User/>} />
              {/* Admin Protected Route */}

              <Route element={<RequireAuth userType={userProfile && userProfile.userType} />}>
                <Route path="/network" element={<Network  />} >

                  <Route path="requests" element={< Requests />} />
                  <Route path="blocked_country" element={< BlockedCounties />} />
                  <Route path="blocked_ip" element={< Blockedip />} />
                  <Route path="blocked_user" element={< BlockedUser />} />
                  <Route path="unauthorised" element={< Unauthorised />} />
                  <Route path="" element={< Panel />} />
                  <Route path="panel" element={< Panel />} />

                </Route>
              </Route>

            </Route>}
        </Routes>
        </clientContext.Provider>
      </userContext.Provider>
    </Router >
  );
}


export default App;
