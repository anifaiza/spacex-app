import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, dataSelector, searchByRocketName } from '../../slices/apiSlice'
import DataCard from '../common/Card';
import { Container, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      padding: "30px",
    },
    displayFlex: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    //   height: '100vh',
    },
    searchContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: '20px',
      alignItems: 'center',
    }
  });

const ListData = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const { data, loading, hasErrors, searchedData } = useSelector(dataSelector)	
    const [rocketName, setRocketName] = useState('');
    const [searching, setSearching] = useState(false)

    const onRocketNameChange = (event) => {
        setSearching(false)
        setRocketName(event.target.value)
    }
    const handleRocketNameSubmit = () => {
        setSearching(true)
        dispatch(searchByRocketName(rocketName, data))
    }
    
    useEffect(() => {
        dispatch(fetchData())
      }, [])
    // console.log('data', data)
    return (
        <Container maxWidth="lg" className={classes.root}>
            <div className={classes.searchContainer}>
            <TextField 
                id="filled-hidden-label-small" 
                label="enter rocket name" 
                variant="filled" 
                size="small" 
                // onChange={(e)=>dispatch(searchByRocketName(e.target.value.toLocaleLowerCase()))}
                onChange={(e)=>onRocketNameChange(e)}
            />
            <Button 
                variant="contained"
                size="large"
                onClick={handleRocketNameSubmit}
            >
                Search
            </Button>
            </div>
            {!searching && (<div className={classes.displayFlex}>
                {data.map((item, i)=>(<DataCard key={i} flight = {item}/>))}
            </div>)}
            {searching && (
                <div className={classes.displayFlex}>
                {searchedData.map((item, i)=>(<DataCard key={i} flight = {item}/>))}
            </div>
            )}
        </Container>
    )
}

export default ListData
