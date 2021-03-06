import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, Button, TextField } from "@mui/material"
import { makeStyles } from "@mui/styles"
import {
  fetchData,
  dataSelector,
  searchByRocketName,
  filterLaunchStatus,
  filterLaunchDate,
  filterUpcoming,
} from "../../slices/apiSlice"
import DataCard from "../common/Card"
import SelectInput from "../common/SelectInput"

const useStyles = makeStyles({
  root: {
    background: "#cae8d2",
    padding: "30px",
  },
  displayFlex: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    alignItems: "center",
    margin: "20px 0px",
  },
  select: {
    height: "30px",
  },
})

const ListData = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { data, searchedData } = useSelector(dataSelector)
  const [rocketName, setRocketName] = useState("")
  const [searching, setSearching] = useState(false)
  const [filter, setFilter] = useState("")
  const [datefilter, setDatefilter] = useState("")
  const [status, setStatus] = useState("")
  const [upcoming, setUpcoming] = useState("")

  const onRocketNameChange = event => {
    setSearching(false)
    setRocketName(event.target.value)
  }

  const handleRocketNameSubmit = () => {
    setSearching(true)
    dispatch(searchByRocketName(rocketName, data))
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const handleDateFilter = event => {
    setSearching(true)
    setDatefilter(event.target.value)
    dispatch(filterLaunchDate(event.target.value))
  }

  const handleStatusFilter = event => {
    setSearching(true)
    setStatus(event.target.value)
    dispatch(filterLaunchStatus(event.target.value))
  }

  const handleUpcomingFilter = event => {
    setSearching(true)
    setUpcoming(event.target.value)
    dispatch(filterUpcoming(event.target.value))
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Button onClick={() => setSearching(false)}>Reset all data</Button>
      <div className={classes.searchContainer}>
        <TextField
          id="filled-hidden-label-small"
          label="enter rocket name"
          variant="filled"
          size="small"
          // onChange={(e)=>dispatch(searchByRocketName(e.target.value.toLocaleLowerCase()))}
          onChange={e => onRocketNameChange(e)}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleRocketNameSubmit}
        >
          Search
        </Button>
      </div>
      <div className={classes.searchContainer}>
        <SelectInput
          label="Filter Data by"
          value={filter}
          onChangeFunction={handleFilterChange}
          selectStyle={classes.select}
          menuList={["Launch Date", "Launch Status", "Is it Upcoming?"]}
        />
      </div>
      {filter === 1 && (
        <div className={classes.searchContainer}>
          <SelectInput
            label="Find from*"
            value={datefilter}
            onChangeFunction={handleDateFilter}
            selectStyle={classes.select}
            menuList={["Last week", "Last month", "Last year"]}
          />
        </div>
      )}
      {filter === 2 && (
        <div className={classes.searchContainer}>
          <SelectInput
            label="Select Status*"
            value={status}
            onChangeFunction={handleStatusFilter}
            selectStyle={classes.select}
            menuList={["Success", "Fail"]}
          />
        </div>
      )}
      {filter === 3 && (
        <div className={classes.searchContainer}>
          <SelectInput
            label="Select yes/no*"
            value={upcoming}
            onChangeFunction={handleUpcomingFilter}
            selectStyle={classes.select}
            menuList={["Yes", "No"]}
          />
        </div>
      )}
      {!searching && (
        <div className={classes.displayFlex}>
          {data.map(item => (
            <DataCard key={item.mission_name} flight={item} />
          ))}
        </div>
      )}
      {searching && searchedData.length > 0 && (
        <div className={classes.displayFlex}>
          {searchedData.map(item => (
            <DataCard key={item.mission_name} flight={item} />
          ))}
        </div>
      )}
      {searching && searchedData.length === 0 && (
        <h3>No data found for this search</h3>
      )}
    </Container>
  )
}

export default ListData
