import store from "../store/store"
import reducer, { fetchData, searchByRocketName } from "./apiSlice"

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    loading: false,
    hasErrors: false,
    data: [],
    searchedData: [],
  })
})

test("should return correct search result", () => {
  const prevState = store.getState().data
  expect(
    reducer(prevState.searchedData.length, searchByRocketName("falcon heavy"))
  ).toEqual(3)
})

const fetch = jest.fn(() => {
  Promise.resolve({
    json: () => Promise.resolve([store.getState().data]),
  })
})

beforeEach(() => {
  fetch.mockClear()
})

it("fetches correct data from api", async () => {
  const data = await fetchData()

  expect(data).toEqual(store.getState().data.data)
  expect(fetch).toHaveBeenCalledTimes(1)
})
