import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import axios from 'axios'

const initialState = {
  loading: false,
  hasErrors: false,
  data: [],
  searchedData: [],
}

export const fetchData = createAsyncThunk("api/fechData", async () => {
  const response = await fetch("https://api.spacexdata.com/v3/launches")
  // console.log(response)
  const data = await response.json()
  console.log(data)
  return data
})

export const apiSlice = createSlice({
  name: "sapcexData",
  initialState,
  reducers: {
    searchByRocketName: (state, { payload }) => {
      if (payload !== "") {
        state.searchedData = state.data.filter(i =>
          i.rocket.rocket_name.toLowerCase().includes(payload)
        )
      }
    },
    filterLaunchDate: (state, { payload }) => {
      const today = new Date()
      if (payload === 1) {
        let lastWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        )
        lastWeek = lastWeek.getTime() / 1000
        state.searchedData = state.data.filter(
          i => i.launch_date_unix > lastWeek
        )
      } else if (payload === 2) {
        let lastMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 30
        )
        lastMonth = lastMonth.getTime() / 1000
        state.searchedData = state.data.filter(
          i => i.launch_date_unix > lastMonth
        )
      } else if (payload === 3) {
        let lastYear = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 365
        )
        lastYear = lastYear.getTime() / 1000
        state.searchedData = state.data.filter(
          i => i.launch_date_unix > lastYear
        )
      }
    },
    filterLaunchStatus: (state, { payload }) => {
      if (payload === 1) {
        state.searchedData = state.data.filter(i => i.launch_success === true)
      } else if (payload === 2) {
        state.searchedData = state.data.filter(i => i.launch_success === false)
      }
    },
    filterUpcoming: (state, { payload }) => {
      if (payload === 1) {
        state.searchedData = state.data.filter(i => i.upcoming === true)
      } else if (payload === 2) {
        state.searchedData = state.data.filter(i => i.upcoming === false)
      }
    },
  },
  extraReducers: {
    [fetchData.pending]: state => {
      state.loading = true
    },
    [fetchData.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.data = payload
    },
    [fetchData.rejected]: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const dataSelector = state => state.data

export const {
  searchByRocketName,
  filterLaunchStatus,
  filterLaunchDate,
  filterUpcoming,
} = apiSlice.actions

export default apiSlice.reducer
