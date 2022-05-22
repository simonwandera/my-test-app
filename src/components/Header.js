import React, { useContext} from 'react'
import Login from './Login'
import Profile from './Profile'
import { userContext } from './userContext'


const Header = () => {

    const {userProfile, setUserProfile} = useContext(userContext)

    return (
        <div className='m-0 p-0'>
            <div className='bg-secondary d-flex justify-content-end'>
               
                {userProfile ? <Profile /> : <Login />}
            </div>
        </div>

    )
}



export default Header
