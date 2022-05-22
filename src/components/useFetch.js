import { useState, useEffect, useContext } from "react";

const useFetch = (url) =>{

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();
        setTimeout(() => {
        fetch(url, {
            method: 'GET'
        })
            .then(response => {
                if(!response.ok){
                    throw Error('Could not fetch the data for the resourse');
                }

                return response.json()
            })
            .then(data => {
                setIsPending(false);
                setError(null)
                setData(data)
            })
            .catch(error => {
                if(error.name === 'AbortError'){
                    console.log('fetch aborted')
                } else{
                    setIsPending(false)
                    setError(error.message);
                }
            })
        },1);
        return () => abortCont.abort();
    }, [url]);
    return {data, isPending, error}
}

export default useFetch