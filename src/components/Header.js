import React, { useContext, useState} from 'react'
import Login from './Login'
import Profile from './Profile'
import { userContext } from './userContext'


const Header = () => {

    const {userProfile, setUserProfile} = useContext(userContext)

    return (
        <div className='m-0 p-0 col-sm-12 w-100'>
            <div className='bg-secondary d-flex justify-content-end'>
                {userProfile ? <Profile /> : <Login />}
            </div>
        </div>
    )
}

export default Header
