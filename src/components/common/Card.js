import React from 'react'
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import { margin } from '@mui/system';

const useStyles = makeStyles({
    card: {
      width: "25%",
      margin: "10px 0px;",
      padding: "0px 10px",
    },
  });

function DataCard(props) {
    const classes = useStyles()
    const date = props.flight.launch_date_local.split('T')[0]
    const time = props.flight.launch_date_local.split('T')[1].split('+')[0]
    return (
        <Card variant="outlined" className={classes.card}>
            <p>Mission name: {props.flight.mission_name}</p>
            <p>Rocket: {props.flight.mission_name}</p>
            <p>Launch Year: {props.flight.rocket.rocket_name}</p>
            <p>Date: {date} Time: {time}</p>
            {/* <p>{props.flight.mission_name}</p>
            <p>{props.flight.mission_name}</p>
            <p>{props.flight.mission_name}</p>
            <p>{props.flight.mission_name}</p> */}
        </Card>
    )
}

export default DataCard
