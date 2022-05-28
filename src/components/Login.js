import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { userContext } from './userContext'
import SignUp from './Signup'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {userProfile, setUserProfile} = useContext(userContext)
    const [showSign, setShowSign] = useState(false)

    const validate = values => {
        const errors = {}
        return errors
    }

    const onSubmit = (values) => {
        fetch('https://traffic.pythonanywhere.com/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                "Contect-Type": "application/json; charset=UTF-8"
            }
        }).then(responce => {
            if (!responce.ok) {
                alert("Failed to log in!")
                setUsername('')
                setPassword('')
            }else{
                alert("success")
                setUsername('')
                setPassword('')
            }
            return responce.json();
        }).then(data => {
            if (data.access_token){
                setUserProfile(data)
                localStorage.setItem("token", data.access_token)
                getLatestProfile()
            }

        }).catch(error => {
            console.log(error.responce, error.status, error.headers)
            formik.values.username = ''
            formik.values.password = ''
        })
    }

    const getLatestProfile = ()=>{
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
    }

    

    const formik = useFormik({
        initialValues: {
            username: username,
            password: password,

        },
        validate,
        onSubmit
    })

    

    return (
        <div className='col-lg-5 col-sm-12'>
            { showSign === true  && <SignUp />}
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                <div className='row g-2'>
                    <div className='col-4 py-1'>
                        <input onChange={formik.handleChange} className="form-control" name='username' type="text" placeholder="Username" value={formik.values.userName} onBlur={formik.handleBlur} required />
                    </div>
                    <div className='col-4 py-1 '>
                        <input onChange={formik.handleChange} className="form-control" name='password' type="password" placeholder="Password" value={formik.values.password} onBlur={formik.handleBlur} required />
                    </div>

                    <div className='col-2 py-1'>
                        <button type="submit" className='btn btn-info px-1' name="submit">LogIn</button>
                    </div>

                    <div className='col-2 py-1'>
                        <button type="button" className='btn btn-primary px-1' name="open" onClick={() => setShowSign(!showSign)}>SignUp</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
