import React from "react"
import Card from "@mui/material/Card"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
  card: {
    width: "25%",
    margin: "10px 0px;",
    padding: "0px 10px",
  },
})

function DataCard({ flight }) {
  const classes = useStyles()
  const date = flight.launch_date_local.split("T")[0]
  const time = flight.launch_date_local.split("T")[1].split("+")[0]
  return (
    <Card variant="outlined" className={classes.card}>
      <p>Mission name: {flight.mission_name}</p>
      <p>Rocket: {flight.mission_name}</p>
      <p>Launch Year: {flight.rocket.rocket_name}</p>
      <p>
        Date: {date} Time: {time}
      </p>
      {/* <p>{flight.mission_name}</p>
            <p>{flight.mission_name}</p>
            <p>{flight.mission_name}</p>
            <p>{flight.mission_name}</p> */}
    </Card>
  )
}

export default DataCard
