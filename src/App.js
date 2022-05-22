import { useMemo, useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import User from './components/User';
import { userContext } from './components/userContext';
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

function App() {
  const [userProfile, setUserProfile] = useState()
  const userProfileProvider = useMemo(() => ({ userProfile, setUserProfile }), [userProfile, setUserProfile])
  const [clientData, setClientData] = useState(null)
  const browser = UseBrowser()
  const [device, setDevice] = useState( isMobile ? "Mobile" : isBrowser ? "PC" : 'Unknown Device')
  const [blockAuth, setBlockAuth] = useState(false)

  useEffect(() => {
    fetch('api/auth/allow_authenticated', {
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
    fetch('api/auth/profile', {
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

  clientData && (clientData.browser=browser)
  clientData && (clientData.device=device)
  clientData && blockAuth && (clientData.allow_auth= blockAuth)

  // console.log(clientData)


  return (
    <Router>
      <userContext.Provider value={userProfileProvider}>
       
        <Routes>
          {clientData &&
          <Route exact path='' element={<Home dat={clientData} />}>
            {/* User Route */}
            <Route path="" element={< User dat={clientData} />} />
            {/* Admin Protected Route */}

            <Route element={<RequireAuth userType= {userProfile && userProfile.userType} />}>
              <Route path="/network" element={<Network dat={clientData} />} >

                <Route path="requests" element={< Requests dat={clientData} />} />
                <Route path="blocked_country" element={< BlockedCounties dat={clientData}/>} />
                <Route path="blocked_ip" element={< Blockedip dat={clientData}  />} />
                <Route path="blocked_user" element={< BlockedUser dat={clientData} />} />
                <Route path="unauthorised" element={< Unauthorised dat={clientData} />} />
                <Route path="" element={< Panel dat={clientData} />} />
                <Route path="panel" element={< Panel />} />

              </Route>
            </Route>

          </Route>}
        </Routes>
     
      </userContext.Provider>
    </Router >
  );
}


export default App;
