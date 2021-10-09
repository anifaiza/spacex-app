import reducer, { fetchData } from "./apiSlice"

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    loading: false,
    hasErrors: false,
    data: [],
    searchedData: [],
  })
})

test("should set data correctly from api", async () => {
  const response = await fetch("https://api.spacexdata.com/v3/launches")
  const apiState = await response.json()
  const prevState = {
    loading: false,
    hasErrors: false,
    data: [],
    searchedData: [],
  }
  expect(reducer(prevState, fetchData())).toEqual({
    loading: false,
    hasErrors: false,
    data: apiState,
    searchedData: [],
  })
})
