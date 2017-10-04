import React from "react"
import {Button, FormGroup, Input, Label} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from "prop-types"

class DeleteSection extends React.Component {
  renderOptions() {
    let list = []
    let element = null
    for (let i in this.props.leaderboard.data) {
      const info = this.props.leaderboard.data[i]
      element = <option>{info.id}</option>
      list.push(element)
    }
    return ({list})
  }
  render() {
    return (
      <div>
        <FormGroup>
          <Label for="exampleSelect">Select Delete Submission ID</Label>
          <Input type="select" name="select" id="exampleSelect">
            {this.renderOptions()}
          </Input>
        </FormGroup>
        <Button>Delete</Button>
      </div>
    )
  }
}

DeleteSection.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  leaderboard: PropTypes.object.isRequired
}

function select({leaderboard}) {
  return {leaderboard}
}

export default connect(select)(DeleteSection)
