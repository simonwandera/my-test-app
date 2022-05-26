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
    { title: 'NAME', field: 'username' },
    { title: 'USERTYPE', field: 'userType' },
    { title: 'STATUS', field: 'status' },

  ]

  const blocked_user =()=>{
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch('https://traffic.pythonanywhere.com/api/product/blocked_user', {
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
    }, 1);
  }

  useEffect(() => {
    blocked_user()
  }, [])

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
            icon: 'clear',
            tooltip: 'Unblock',
            onClick: (event, rowData) => {
              let username = rowData.username
              fetch('https:/traffic.pythonanywhere.com/api/product/unblock_user', {
                method: 'POST',
                body: JSON.stringify({username}),
              }).then(res => {
                if (!res.ok) {
                  throw Error('Could not fetch the data for the resourse');
                } else {
                  console.log('You have data')
                }
                return res.json();

              }).then(data => {
                blocked_user()
              }).catch(error => {
                console.log(error)
              })
            },
          }
        ]}

      />}
    </div>
  )
}

export default BlockedUser
