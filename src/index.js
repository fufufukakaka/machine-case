import React from "react"
import ReactDOM from "react-dom"
import configureStore from "../Store/configureStore"
import App from "../container/App"
import {Provider} from 'react-redux'

const store = configureStore()

window.React = React;

ReactDOM.render(
  <Provider store={store}>
  <App/>
</Provider>, document.getElementById("root"))
