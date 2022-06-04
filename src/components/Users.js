import React from 'react'
import MaterialTable from 'material-table';
import useFetch from './useFetch';

const Users = () => {

  const columns = [
    { title: 'NAME', field: 'username' },
    { title: 'USERTYPE', field: 'userType' },
    { title: 'STATUS', field: 'status' },
  ]

  const { data, isPending, error, setData } = useFetch("/api/auth/show_users")

  const latest_data = () => {
    fetch('https://traffic.pythonanywhere.com/api/auth/show_users', {
      method: 'GET',
    }).then(responce => {
      if (!responce.ok) {
        throw Error('Could not fetch the data for the resourse');
      } else {
        console.log('You have data')
      }
      return responce.json();
    }).then(data => {

      setData(data)

    }).catch(error => {
      console.log('Aborted')
    })
  }

  return (
    <div className='container-fluid col-sm-12 col-lg-12'>
      {error && <div> {error} </div>}
      {isPending && <div>Loading...</div>}

      {data && <MaterialTable
        title='Users'
        columns={columns}
        data={data}

        options={{
          search: true,
          paging: true,
          filtering: true,
          pageSizeOptions: [5, 10, 20, { value: data.length, label: 'All' }],
          sorting: true,
          headerStyle: {
            backgroundColor: '#b58f1d',
            color: '#000',
            fontWeight: 100,
          },
        }}
        actions={[
         
          
          rowData => ({
            icon: 'delete',
            tooltip: 'Delete',
            disabled: rowData.userType === 'ADMIN',
            onClick: (event, rowData) => {
              let id = rowData.id
              fetch('https://traffic.pythonanywhere.com/api/auth/delete_user', {
                method: 'POST',
                body: JSON.stringify({ id }),

              }).then(responce => {
                if (!responce.ok) {
                  throw Error('Could not fetch the data for the resourse');
                } else {
                  console.log('You have data')
                }
                return responce.json();
              }).then(data => {

                alert("User Deleted")
                latest_data()

              }).catch(error => {
                console.log('Aborted')
              })
            },
          }),

          rowData => ({
 
            icon: 'clear',
            tooltip: 'Block',
            disabled: rowData.userType === 'ADMIN',
            onClick: (event, rowData) => {
              let username = rowData.username
              fetch('https://traffic.pythonanywhere.com/api/product/block_user', {
                method: 'POST',
                body: JSON.stringify({ username }),

              }).then(responce => {
                if (!responce.ok) {
                  alert("ERROR")
                } else {
                  console.log("User Blocked")
                }
                return responce.json();
              }).then(data => {
                alert('User Blocked')
                latest_data()

              }).catch(error => {
                console.log('Aborted')
              })
            },
         
          }),

          rowData => ({
            icon: 'edit',
            tooltip: 'Make admin',
            disabled: rowData.userType === 'ADMIN',
            onClick: (event, rowData) => {
              let username = rowData.username
              fetch('https://traffic.pythonanywhere.com/api/product/make_admin', {
                method: 'POST',
                body: JSON.stringify({ username }),

              }).then(responce => {
                if (!responce.ok) {
                  alert("ERROR")
                } else {
                  console.log("User Blocked")
                }
                return responce.json();
              }).then(data => {

                alert('user is now an admin')
                latest_data()

              }).catch(error => {
                console.log('Aborted')
              })
            },
          })



        ]}
      />}


    </div>
  )
}

export default Users
