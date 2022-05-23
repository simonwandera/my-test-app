import React, { useContext, useState, useEffect } from 'react'
import { userContext } from './userContext'
import { isMobile } from 'react-device-detect';
import MaterialTable from 'material-table';
import { clientContext } from './ClientContext';
import useFetch from './useFetch';


const BlockedCounties = () => {

    const { userProfile, setUserProfile } = useContext(userContext)
    const { clientData, setClientData} = useContext(clientContext)

    clientData.device = isMobile ? "Mobile" : "PC"
    clientData.user = userProfile.username
    const [thisuser, setThisUser] = useState(clientData);
    
    const {data, isPending, error, setData} = useFetch('/api/product/blocked_country')


    const columns = [
      { title: 'ID', field: 'id' },
      { title: 'NAME', field: 'country_name' },
    ]

    const getCountry = ()=>{
    
      fetch('https://traffic.pythonanywhere.com/api/product/blocked_country', {
        method: 'GET',
  
      }).then(responce => {
        if (!responce.ok) {
        } else {
          console.log('You have details')
        }
        return responce.json();
      }).then(data => {
        setData(data)       
  
      }).catch(error => {
        console.log(error.responce, error.status, error.headers)
      })
  }

    return (

        <div className=''>
          {error && <div> {error} </div>}
          {isPending && <div>Loading...</div>}
  
          {data && <MaterialTable
            title='Blocked Countries'
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
                color: '#000'
              },
            }}
            actions={[
              
              {
                icon: 'clear',
                tooltip: 'Unblock Country',
                onClick: (event, rowData) => {
                  fetch('/api/product/unblock_country', {
                    method: 'POST',
                    body: JSON.stringify(rowData.id),
            
                  }).then(responce => {
                    if (!responce.ok) {
                      alert("ERROR")
                      console.log(rowData.id)
                    } else {
                      console.log('You have data')
                    }
                    return responce.json();
                  }).then(data => {
                    
                    alert("Country Unblocked")
                    getCountry()
            
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

export default BlockedCounties
