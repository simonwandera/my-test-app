import React, { useContext, useState, useEffect } from 'react'
import { userContext } from './userContext'
import { isMobile } from 'react-device-detect';
import MaterialTable from 'material-table';
import { clientContext } from './ClientContext';
import useFetch from './useFetch';


const Blockedip = () => {

  const { userProfile, setUserProfile } = useContext(userContext)
  const { clientData, setClientData} = useContext(clientContext)
  clientData.device = isMobile ? "Mobile" : "PC"
  clientData.user = userProfile.username
  // const [data, setData] = useState();
  // const [isPending, setIsPending] = useState(true);
  // const [error, setError] = useState(null)
  const [thisuser, setThisUser] = useState(clientData);

  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'NAME', field: 'ip_address' },

  ]

  const {data, isPending, error, setData} = useFetch('/api/product/blocked_ip')
  
  return (
    <div className='container-fluid col-sm-12'>

      {error && <div> {error} </div>}
      {isPending && <div>Loading...</div>}

      {data && <MaterialTable
        title='Blocked IP'
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
            icon: 'delete',
            tooltip: 'Unblock IP',
            onClick: (event, rowData) => {
              fetch('/api/product/unblock_ip', {
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

                alert("SUCCESS")

              }).catch(error => {
                console.log('Aborted')
              })
            },
          },

        ]}

      />}
    </div>
  )
}

export default Blockedip
