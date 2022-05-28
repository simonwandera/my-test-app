import React, {useState, useEffect, useContext} from 'react'
import { clientContext } from './ClientContext';
import useFetch from './useFetch';


const Panel = () => {

    const [speed, setSpeed] = useState()
    const { clientData, setClientData} = useContext(clientContext)
    const [allowMobile, setAllowMobile] = useState(clientData.allow_mobile)
    const [allowAuth, setAllowAuth] = useState(clientData.allow_auth)
    const [server, setServer] = useState(true)

    const allowLatestMobile = () =>{
        fetch('https://traffic.pythonanywhere.com/api/product/check_mobile', {
          method: 'GET',
        }).then(responce => {
          if (!responce.ok) {
            console.log('Failed')
          }
          return responce.json();
        }).then(data => {
          setAllowMobile(data.allow_mobile)
        }).catch(error => {
          console.log(error.responce, error.status, error.headers)
        })
    }

    const allowLatestAuth = () =>{
      fetch('https://traffic.pythonanywhere.com/api/auth/allow_authenticated', {
        method: 'GET',
      }).then(responce => {
        if (!responce.ok) {
          console.log('Failed')
        }
        return responce.json();
      }).then(data => {
        setAllowAuth(data.status)
      }).catch(error => {
        console.log(error.responce, error.status, error.headers)
      })
  }

    useEffect(() => {
        fetch('https://traffic.pythonanywhere.com/api/auth/speed', {
          method: 'GET',
    
        }).then(responce => {
          if (!responce.ok) {
          }
          return responce.json();
        }).then(data => {
          if (data) {
            setSpeed(data)
          }
    
        }).catch(error => {
          console.log(error.responce, error.status, error.headers)
        })
      })

     const blockAuth =()=>{
        fetch('https://traffic.pythonanywhere.com/api/auth/block_unauthorised', {
          method: 'GET',
    
        }).then(responce => {
          if (!responce.ok) {
            console.log("Error")
          }
          return responce.json();
        }).then(data => {
          console.log(data)
          allowLatestAuth()
        }).catch(error => {
          console.log(error.responce, error.status, error.headers)
        })
    }

    const unblockAuth =()=>{
        fetch('https://traffic.pythonanywhere.com/api/auth/unblock_unauthorised', {
          method: 'GET',

        }).then(responce => {
          if (!responce.ok) {
            console.log("Error")
          }
          return responce.json();
        }).then(data => {
          allowLatestAuth()
        }).catch(error => {
          console.log(error.responce, error.status, error.headers)
        })
    }

    const blockMobile =()=>{
      fetch('https://traffic.pythonanywhere.com/api/product/block_mobile', {
        method: 'GET',
  
      }).then(responce => {
        if (!responce.ok) {
        }
        return responce.json();
      }).then(data => {
          console.log(data)
          allowLatestMobile() 
  
      }).catch(error => {
        console.log(error.responce, error.status, error.headers)
      })
  }

  const unBlockMobile =()=>{
    fetch('https://traffic.pythonanywhere.com/api/product/unblock_mobile', {
      method: 'GET',

    }).then(responce => {
      if (!responce.ok) {
      }
      return responce.json();
    }).then(data => {
        console.log(data)
        allowLatestMobile() 

    }).catch(error => {
      console.log(error.responce, error.status, error.headers)
    })
}

    return (
        <div className='container col-12'>
            <div className='row'>
                <div class="col-lg-4">
                    <div className="card bg-primary text-white mb-4 shadow">
                        { allowMobile === 'allow' && <div className="card-body text-warning h4">Block mobile</div>}
                        { allowMobile === 'deny' && <div className="card-body h4">Unblock mobile</div>}
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            {allowMobile === 'allow' && <button className='btn btn-danger' onClick={() => blockMobile()}> Block</button>}
                            {allowMobile === 'deny' && <button className='btn btn-info' onClick={() => unBlockMobile()}> Unblock</button> }
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card bg-success text-white mb-4 shadow">
                        {allowAuth === 'allow' && <div className="card-body h4 text-warning">Block Unathenticated</div>}
                        {allowAuth === 'deny' && <div className="card-body h4 ">Unblock Unathenticated</div>}
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            {allowAuth === 'allow' && <button className='btn btn-danger' onClick={()=> blockAuth()}> Block</button> }
                            {allowAuth === 'deny' && <button className='btn btn-primary' onClick={()=> unblockAuth()}> Unblock </button> }
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card bg-dark text-white mb-4 shadow">
                        {server && <div className="card-body h4 text-warning">Transfer service</div>}
                        {!server && <div className="card-body h4">Transfer service</div>}
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <div className ="small text-white"><i className="fas fa-angle-right"></i></div>
                            {server && <button className='btn btn-danger' onClick={()=> setServer(!server)}> Transfer</button> }
                            {!server && <button className='btn btn-primary' onClick={()=> setServer(!server)}> Transfer </button> }
                        </div>
                    </div>
                </div>

            </div>

            {speed && <div className='container my-auto mx-auto card shadow-lg borger border-secondary'>
                 {speed.speed > 900 ? <div className='display-1 text-danger'>{speed.speed}</div> :
                 <div className='display-1 text-dark'>{speed.speed}</div> }
                <div className={server ? 'display-1 text-muted':'display-1 text-dark'}>Requests Per second</div>
            </div>}
        </div>
    )
}
export default Panel
