import React from "react"
import {Button, FormGroup, Input, Label} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from "prop-types"
import "../styles/component/deleteSection.css"
import {sendDelete} from "../actions/leaderboard"

class DeleteSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteNumber: 1
    }
  }
  renderOptions() {
    let list = []
    let element = null
    for (let i in this.props.leaderboard.data) {
      const info = this.props.leaderboard.data[i]
      element = <option>{info.id}</option>
      list.push(element)
    }
    return (list)
  }
  setDelete(e){
    e.preventDefault()
    this.setState({
      deleteNumber:e.target.value
    })
  }
  sendDelete(e){
    e.preventDefault()
    this.props.dispatch(sendDelete({target_id:this.state.deleteNumber}))
  }
  render() {
    return (
      <div>
        <FormGroup>
          <Label className="delete" for="exampleSelect">Select Delete Submission ID</Label>
          <Input type="select" name="select" id="Select" onChange={(event) => this.setDelete(event)}>
            {this.renderOptions()}
          </Input>
        </FormGroup>
        <Button onClick={(event) => this.sendDelete(event)}>Delete</Button>
        <p className="deleteMessage">{this.props.leaderboard.isCompleteDelete ? this.props.leaderboard.deleteMessage : null}</p>
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
