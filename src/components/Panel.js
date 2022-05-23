import React, {useState, useEffect, useContext} from 'react'
import { clientContext } from './ClientContext';


const Panel = () => {

    const [speed, setSpeed] = useState()
    const { clientData, setClientData} = useContext(clientContext)

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
      }, [])

     const blockAuth =()=>{
        fetch('https://traffic.pythonanywhere.com/api/auth/block_unauthorised', {
          method: 'GET',
    
        }).then(responce => {
          if (!responce.ok) {
          }
          return responce.json();
        }).then(data => {
            console.log(data)
          console.log('Blocked')
    
        }).catch(error => {
          console.log(error.responce, error.status, error.headers)
        })
    }

    const unblockAuth =()=>{
        fetch('https://traffic.pythonanywhere.com/api/auth/unblock_unauthorised', {
          method: 'GET',
    
        }).then(responce => {
          if (!responce.ok) {
          }
          return responce.json();
        }).then(data => {
            console.log(data)
            console.log('Unblocked')
    
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
  
      }).catch(error => {
        console.log(error.responce, error.status, error.headers)
      })
  }

    return (
        <div className='container col-12'>
            <div className='row'>
                <div class="col-lg-4">
                    <div class="card bg-primary text-white mb-4 shadow">
                        <div class="card-body">Block mobile</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            <button className='btn btn-info' onClick={() => blockMobile()}> Block</button>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card bg-success text-white mb-4 shadow">
                        <div class="card-body">Block Unathenticated</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            {clientData.allow_auth==='deny' ? <button className='btn btn-primary' onClick={()=> unblockAuth()}> Unblock</button> : <button className='btn btn-primary' onClick={()=> blockAuth()}> Block</button> }
                        </div>
                    </div>
                </div>
            </div>

            <div className='container my-auto mx-auto card shadow-lg borger border-secondary'>
                {speed && <div className='display-1 text-dark'>{speed.speed}</div>}
                <div className='display-1 text-muted'>Requests Per second</div>
            </div>
        </div>
    )
}
export default Panel
