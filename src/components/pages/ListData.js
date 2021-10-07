import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, dataSelector } from '../../slices/apiSlice'

const ListData = () => {
    const dispatch = useDispatch();
    const { data, loading, hasErrors } = useSelector(dataSelector)	
    useEffect(() => {
        dispatch(fetchData())
      }, [dispatch])
    // console.log('data', data)
    return (
        <div>
            {data.map((item, i)=>(<div key={item.flight_number}>{item.mission_name}</div>))}
        </div>
    )
}

export default ListData
