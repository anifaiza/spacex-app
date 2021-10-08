import React from 'react'
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      padding: '30px',
    },
  });

function DataCard(props) {
    return (
        <Card variant="outlined"><p>{props.mission_name}</p></Card>
    )
}

export default DataCard
