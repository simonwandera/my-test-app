import React, { useContext, useState, useEffect } from 'react'
import { userContext } from './userContext'
import MaterialTable from 'material-table';

const Unauthorised = ({ dat }) => {
    const [data, setData] = useState()
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('https://traffic.pythonanywhere.com/api/auth/unauthorised', {
            method: 'GET',

        }).then(responce => {
            if (!responce.ok) {
            }
            return responce.json();
        }).then(data => {
            if (data) {
                setData(data)
            }

        }).catch(error => {
            console.log(error.responce, error.status, error.headers)
        })
    }, [])
    const columns = [
        { title: 'DEVICE', field: 'device' },
        { title: 'IPV4', field: 'ipv4' },
        { title: 'LOCATION', field: 'location' },
        { title: 'USER', field: 'user' },
        { title: 'Time', field: 'time' },
    ]

    console.log(data && data)
    return (
        <div>
            {error && <div> {error} </div>}
            {isPending && <div>Loading...</div>}

            {data && <MaterialTable
                title='Unauthorised Requests'
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
                    },
                }}

            />}

        </div>
    )
}

export default Unauthorised
