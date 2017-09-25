import {connect} from 'react-redux'
import React from "react"
import Leaderboard from "../component/leaderboard"
import Targetselect from "../component/Targetselect"
import 'bootstrap/dist/css/bootstrap.css'
import "../styles/container/style.css"
import PropTypes from "prop-types"
import {fetchRequest, fetchInitRequest} from "../actions/leaderboard"

class App extends React.Component {
  componentWillMount() {
    this.Initialization(this.props)
  }
  Initialization(props) {
    this.props.dispatch(fetchInitRequest())
  }

  render() {
    return (
      <div className='container'>
        <div className="col-md-12 heading-section">
          <h2>Machine-Case</h2>
          <Targetselect focusTarget={this.props.leaderboard.focusTarget} focusSubTarget={this.props.leaderboard.focusSubTarget} subTargetList={this.props.leaderboard.subTargetList} mainTargetList={this.props.leaderboard.mainTargetList}/>
          <Leaderboard focusSubTarget={this.props.leaderboard.focusSubTarget} data={this.props.leaderboard.data} isFetching={this.props.leaderboard.isFetching} isComplete={this.props.leaderboard.isComplete}/>
        </div>
      </div>
    )
  }
}

function select({leaderboard}) {
  return {leaderboard}
}

App.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  leaderboard: PropTypes.object.isRequired
}

export default connect(select)(App)
