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
  },
  
})

export const dataSelector = state => state.data

export const { getData, getDataSuccess, getDataFailure, searchByRocketName } = apiSlice.actions

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