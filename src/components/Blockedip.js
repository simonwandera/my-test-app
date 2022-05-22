import React, { useContext, useState, useEffect } from 'react'
import { userContext } from './userContext'
import { isMobile } from 'react-device-detect';
import MaterialTable from 'material-table';

const Blockedip = ({ dat }) => {

  const { userProfile, setUserProfile } = useContext(userContext)
  dat.device = isMobile ? "Mobile" : "PC"
  dat.user = userProfile.username
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null)
  const [thisuser, setThisUser] = useState(dat);


  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'NAME', field: 'ip_address' },

  ]

  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch('/api/product/blocked_ip', {
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
  }, [])

  return (
    <div className='main'>

      {error && <div> {error} </div>}
      {isPending && <div>Loading...</div>}

      {data && <MaterialTable
        title='All requests'
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