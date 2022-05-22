import React, { useState } from 'react'
import { userContext } from './userContext'
import { useContext } from 'react'
import { Link } from "react-router-dom";

const Profile = () => {
  const { userProfile, setUserProfile } = useContext(userContext)
  const logout = () =>{
    console.log('logging out')
    setUserProfile(null)
    localStorage.clear()
  }
 
  return (
    <div className='shadow-lg m-2 p-2 border'>
      <div className='text-white d-inline p-2 '>
        USERNAME: {userProfile.username}
      </div>
      <div className='d-inline p-2'>
        <button type="button" className='btn btn-danger' name="submit" onClick={() => logout()}>logout</button>
      </div>
      {userProfile.userType === 'ADMIN' && <div className='d-inline p-2'>
        <Link to="/network" className='text-white'><button type="button" className='btn btn-outline-warning' name="traffic">Traffic</button></Link>
      </div>}
    </div>
  )
}

export default Profile
