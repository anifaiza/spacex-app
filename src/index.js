import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { Provider } from "react-redux"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import configureStore from "./store/store"

ReactDOM.render(
  <Provider store={configureStore}>
    <App />
  </Provider>,
  document.getElementById("root")
)

reportWebVitals()
