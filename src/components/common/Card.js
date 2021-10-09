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
      <p>
        Mission name: <b>{flight.mission_name}</b>
      </p>
      <p>
        Rocket: <b>{flight.rocket.rocket_name}</b>
      </p>
      <p>
        Rocket Type: <b>{flight.rocket.rocket_type}</b>
      </p>
      <p>
        Date: <b>{date}</b>
      </p>
      <p>
        Time: <b>{time}</b>
      </p>
      {!flight.upcoming && (
        <p>
          Launch Status: <b>{flight.launch_success ? "Successful" : "Fail"}</b>
        </p>
      )}
      <p>
        <b>{flight.upcoming ? "Upcoming*" : ""}</b>
      </p>
    </Card>
  )
}

export default DataCard
