import React from 'react'
import MaterialTable from 'material-table';
import useFetch from './useFetch';

const Users = () => {
    const deleteAll = () =>{
        console.log("DEleted")
    }

    const columns = [
        { title: 'Username', field: 'username' },
        { title: 'Usertype', field: 'userType' },
        { title: 'Status', field: 'status' },
      ]

    const {data, isPending, error, setData} = useFetch("/api/auth/show_users")


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
            {
              icon: 'delete',
              tooltip: 'Delete',
              onClick: (event, rowData) => {
                let id = rowData.id
                fetch('https://traffic.pythonanywhere.com/api/auth/delete_user', {
                  method: 'POST',
                  body: JSON.stringify({id}),
          
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
              tooltip: 'Block',
              onClick: (event, rowData) => {
                fetch('https://traffic.pythonanywhere.com/api/product/', {
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

export default Users
