import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'

const initialState = {
  loading: false,
  hasErrors: false,
  data: [],
  searchedData: [],
}

export const apiSlice = createSlice({
  name: 'sapcexData',
  initialState,
  reducers: {
    getData: state => {
      state.loading = true
    },
    getDataSuccess: (state, { payload }) => {
        // console.log('state',state);
      state.data = payload
      state.loading = false
      state.hasErrors = false
    },
    getDataFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
    searchByRocketName: (state, { payload }) => {
        if(payload !== ''){
          state.searchedData = state.data.filter((i) => {return i.rocket.rocket_name.toLowerCase().includes(payload)})
        }
    },
    filterLaunchDate: (state, { payload } ) => {
      let today = new Date();
      if (payload===1){
        let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        console.log(lastWeek)
        lastWeek = lastWeek.getTime()/1000
        // console.log(lastWeek)
        state.searchedData = state.data.filter((i)=>{return i.launch_date_unix > lastWeek})
      }
      else if (payload===2){
        let lastMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
        console.log(lastMonth)
        lastMonth = lastMonth.getTime()/1000
        // console.log(lastMonth)
        state.searchedData = state.data.filter((i)=>{return i.launch_date_unix > lastMonth})
      }
      else if(payload===3){
        let lastYear = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 365);
        console.log(lastYear)
        lastYear = lastYear.getTime()/1000
        // console.log(lastYear)
        state.searchedData = state.data.filter((i)=>{return i.launch_date_unix > lastYear})
      }
    },
    filterLaunchStatus : (state, { payload }) => {
      if(payload === 1){
        state.searchedData = state.data.filter((i)=>{return i.launch_success === true})
      }
      else if( payload === 2 ){
        state.searchedData = state.data.filter((i)=>{return i.launch_success === false})
      }
    },
    filterUpcoming: (state, { payload }) => {
      if(payload === 1){
        state.searchedData = state.data.filter((i)=>{return i.upcoming === true})
      }
      else if( payload === 2 ){
        state.searchedData = state.data.filter((i)=>{return i.upcoming === false})
      }
    },
  },
  
})

export const dataSelector = state => state.data

export const { getData, getDataSuccess, getDataFailure, searchByRocketName, filterLaunchStatus, filterLaunchDate, filterUpcoming } = apiSlice.actions

export default apiSlice.reducer

export function fetchData() {
  return async dispatch => {
    dispatch(getData())

    try {
      const response = await fetch('https://api.spacexdata.com/v3/launches')
      const data = await response.json()

      dispatch(getDataSuccess(data))
    } catch (error) {
      dispatch(getDataFailure())
    }
  }
}