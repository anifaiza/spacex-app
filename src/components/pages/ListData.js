import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, dataSelector } from '../../slices/apiSlice'
import DataCard from '../common/Card';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      padding: '30px',
    },
  });

const ListData = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const { data, loading, hasErrors } = useSelector(dataSelector)	
    useEffect(() => {
        dispatch(fetchData())
      }, [dispatch])
    // console.log('data', data)
    return (
        <Container maxWidth="lg" className={classes.root}>
            {data.map((item, i)=>(<DataCard key={item.flight_number} mission_name = {item.mission_name}/>))}
        </Container>
    )
}

export default ListData
