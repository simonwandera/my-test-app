import React, { useContext, useState } from 'react'
import { userContext } from './userContext';

const User = ({ dat }) => {
  
  const { userProfile, setUserProfile } = useContext(userContext)
  const [data, setData] = useState();
  const [username, setUsername] = useState(userProfile ? userProfile.username : 'Unauthorised')
  dat.user = username
  const [thisuser, setThisuser] = useState(dat)
  const [error, setError] = useState()
  const [isPending, setIsPending] = useState(false)

  console.log(thisuser)

  const request =(user)=>{
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch('/api/auth/add_request', {
        method: 'POST',
        body: JSON.stringify(user),

      }).then(responce => {
        if (!responce.ok) {
          throw Error('Could not fetch the data for the resourse');
        } else {
          console.log('You have data')
        }
        return responce.json();
      }).then(data => {
        setIsPending(false);
        setError(null)
        setData(data)

      }).catch(error => {
        if (error.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          setIsPending(false)
          setError(error.message);
        }
      })
      return () => abortCont.abort();
    }, 1);
  }

  return (

    <div className='container-fluid'>
      <div className='m-auto'>
        {data && <div className='display-6 text-center'>Products</div>}
      </div>


      {(userProfile && userProfile.username) &&
        <div className='mt-4 m-auto col-lg-9'>
          <div class="alert shadow alert-success" role="alert"> <p className='h3'>Welcome</p></div>
          <div class="alert shadow alert-warning d-flex justify-content-around" role="alert">
            <div>{dat.country_name}</div>
            <div>{dat.state}</div>
            <div className='text-primary'>Authorised</div>
          </div>
        </div>}

      {(userProfile && userProfile.username) &&
      <div className='container col-lg-9 border-start border-5 border-danger mt-4 rounded shadow'>
        <div className='d-flex justify-content-around'>
          <div className='mt-2 py-3 text-dark'>
            <p className='text-dark text-left display-3' style={{ textAlign: "left" }}>Cloud Network Panel <i className='bi bi-speedometer'></i></p>
            <button className='btn btn-lg btn-success px-4 mt-4 text-warning' onClick={()=> request(thisuser)}>Submit Request <i className='bi bi-send-check-fill'></i></button>
            {isPending && <div className='h4 text-danger'> Sending</div>}
          </div>
        </div>
      </div>}
    </div>
  )
}

export default User
