import React, { useContext, useState, useEffect } from 'react'
import { userContext } from './userContext'
import { isMobile } from 'react-device-detect';
import MaterialTable from 'material-table';
import { clientContext } from './ClientContext';


const BlockedUser = () => {
  const { userProfile, setUserProfile } = useContext(userContext)
  const { clientData, setClientData} = useContext(clientContext)
  clientData.device = isMobile ? "Mobile" : "PC"
  clientData.user = userProfile.username
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null)
  const [thisuser, setThisUser] = useState(clientData);

  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'NAME', field: 'country_name' },

  ]

  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch('https://traffic.pythonanywhere.com/api/product/blocked_user', {
        method: 'POST',
        body: JSON.stringify(thisuser),

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
  }, [thisuser])

  return (
    <div className='col-lg-12'>
      {error && <div> {error} </div>}
      {isPending && <div>Loading...</div>}

      

      {data && <MaterialTable
        title='Blocked User'
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
            tooltip: 'Block IP',
            onClick: (event, rowData) => {
              alert("You saved " + rowData.id)
            },
          },
          {
            icon: 'clear',
            tooltip: 'Block Country',
            onClick: (event, rowData) => {
              alert("You saved " + rowData.id)
            },
          }
        ]}

      />}
    </div>
  )
}

export default BlockedUser
