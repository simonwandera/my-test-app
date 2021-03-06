import React, { useContext, useState, useEffect } from 'react'
import { userContext } from './userContext'
import { isMobile } from 'react-device-detect';
import MaterialTable from 'material-table';
import { clientContext } from './ClientContext';

const Abnormal = () => {
  const { userProfile, setUserProfile } = useContext(userContext)
  const { clientData, setClientData} = useContext(clientContext)

  clientData.device = isMobile ? "Mobile" : "PC"
  clientData.user = userProfile.username
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null)


  const columns = [
    { title: 'DEVICE', field: 'device' },
    { title: 'IPV4', field: 'ipv4' },
    { title: 'LOCATION', field: 'location' },
    { title: 'USER', field: 'user' },
    { title: 'Time', field: 'time' },
    { title: 'Request Count', field: 'count' },
  ]

  const deleteAll = ()=>{
    
      fetch('https://traffic.pythonanywhere.com/api/auth/clear_requests', {
        method: 'POST',
        getreq
      }).then(responce => {
        if (!responce.ok) {
        } else {
          console.log('You have details')
        }
        return responce.json();
      }).then(data => {
        alert("Requests Deleted")
        getreq()
  
      }).catch(error => {
        console.log(error.responce, error.status, error.headers)
      })
  }

  const getreq = () =>{
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch('https://traffic.pythonanywhere.com/api/auth/abnormal', {
        method: 'GET',

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
    }, 1000);

  }

 const faa = getreq();

  setInterval(() => {getreq()}, 10000000);


  return (
      <div className='container-fluid col-sm-12 col-lg-12'>
        
        {error && <div> {error} </div>}
        {isPending && <div>Loading...</div>}

        {data && 
        <div className='m-2 p-2 d-flex justify-content-end'>
          <button className='btn btn-success' onClick={() => deleteAll()}> Delete All</button>
        </div>
        }

        {data && <MaterialTable
          title='Requests'
          columns={columns}
          data={data}

          options={{
            search: true,
            paging: true,
            filtering: true,
            exportButton: true,
            pageSizeOptions: [5, 10, 20, { value: data.length, label: 'All' }],
            sorting: true,
            rowStyle:{
                color: '#e62020'
            },
            headerStyle: {
              backgroundColor: '#b58f1d',
              color: '#000',
              fontWeight: 100,
            },
          }}
          actions={[
            {
              icon: 'delete',
              tooltip: 'Block IP',
              onClick: (event, data) => {
                fetch('https://traffic.pythonanywhere.com/api/product/block_my_ip', {
                  method: 'POST',
                  body: JSON.stringify({data}),
          
                }).then(responce => {
                  if (!responce.ok) {
                    throw Error('Could not fetch the data for the resourse');
                  } else {
                    console.log('You have data')
                  }
                  return responce.json();
                }).then(data => {
                  
                  alert("successfully blocked")
          
                }).catch(error => {
                  console.log('Aborted')
                })
              },
            },
            {
              icon: 'clear',
              tooltip: 'Block Country',
              onClick: (event, data) => {
                fetch('https://traffic.pythonanywhere.com/api/product/block_my_country', {
                  method: 'POST',
                  body: JSON.stringify({data}),
          
                }).then(responce => {
                  if (!responce.ok) {
                    alert("Could not block")
                  } else {
                    console.log('You have data')
                  }
                  return responce.json();
                }).then(data => {
                  alert("successfully blocked")
                }).catch(error => {
                  console.log('Aborted')
                })
              },
            }
          ]}
        />}
      </div>
    
  )
}

export default Abnormal
