import {connect} from 'react-redux'
import React from "react"
import Leaderboard from "../component/leaderboard"
import Targetselect from "../component/Targetselect"
import 'bootstrap/dist/css/bootstrap.css'
import "../styles/container/style.css"

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className="col-md-12 heading-section">
          <h2>Machine-Case</h2>
          <Targetselect/>
          <Leaderboard/>
        </div>
      </div>
    )
  }
}

export default App
