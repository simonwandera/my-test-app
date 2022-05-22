import React, { useContext, useState, useEffect } from 'react'
import { userContext } from './userContext'
import { isMobile } from 'react-device-detect';
import MaterialTable from 'material-table';


const Requests = ({ dat }) => {
  const { userProfile, setUserProfile } = useContext(userContext)
  dat.device = isMobile ? "Mobile" : "PC"
  dat.user = userProfile.username
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null)


  const columns = [
    { title: 'DEVICE', field: 'device' },
    { title: 'IPV4', field: 'ipv4' },
    { title: 'LOCATION', field: 'location' },
    { title: 'USER', field: 'user' },
    { title: 'Time', field: 'time' },
  ]

  const deleteAll = ()=>{
    
      fetch('https://traffic.pythonanywhere.com/api/auth/clear_requests', {
        method: 'POST',
  
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
      fetch('https://traffic.pythonanywhere.com/api/auth/network', {
        method: 'GET',
        body: JSON.stringify(),

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

  useEffect(() => {
   getreq()
  }, [])

  return (
      <div>
        
        {error && <div> {error} </div>}
        {isPending && <div>Loading...</div>}

        {data && 
        <div className='m-2 p-2 d-flex justify-content-end'>
          <button className='btn btn-success' onClick={() => deleteAll()}> Delete All</button>
        </div>
        }

        {data && <MaterialTable
          title='All Requests'
          columns={columns}
          data={data}

          options={{
            search: true,
            paging: true,
            filtering: true,
            exportButton: true,
            pageSizeOptions: [5, 10, 20, { value: data.length, label: 'All' }],
            sorting: true,
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
              onClick: (event, rowData) => {
                fetch('https://traffic.pythonanywhere.com/api/product/block_ip', {
                  method: 'POST',
                  body: JSON.stringify(rowData.ipv4),
          
                }).then(responce => {
                  if (!responce.ok) {
                    throw Error('Could not fetch the data for the resourse');
                  } else {
                    console.log('You have data')
                  }
                  return responce.json();
                }).then(data => {
                  
                  alert("SUCCESS")
          
                }).catch(error => {
                  console.log('Aborted')
                })
              },
            },
            {
              icon: 'clear',
              tooltip: 'Block Country',
              onClick: (event, rowData) => {
                fetch('https://traffic.pythonanywhere.com/api/product/block_country', {
                  method: 'POST',
                  body: JSON.stringify(rowData.location),
          
                }).then(responce => {
                  if (!responce.ok) {
                    alert("ERROR")
                    console.log(rowData.location)
                  } else {
                    console.log('You have data')
                  }
                  return responce.json();
                }).then(data => {
                  
                  alert("SUCCESS")
          
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

export default Requests
