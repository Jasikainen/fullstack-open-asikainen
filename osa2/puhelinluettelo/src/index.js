import React from "react"
import ReactDOM from "react-dom"
import App from "./App.js"
import "./index.css";

ReactDOM.render(<App />, document.getElementById("react-root"))
if (module.hot) {
  module.hot.accept()
}
