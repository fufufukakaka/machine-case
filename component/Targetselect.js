import React from "react"
import {connect} from 'react-redux'
import {
  Button,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap'
import PropTypes from "prop-types"
import {changeSub, changeMain} from "../actions/leaderboard"

class Targetselect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen1: false,
      dropdownOpen2: false,
      focusMainTarget: "",
      focusSubTarget: ""
    };
  }
  toggle1() {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1
    });
  }
  toggle2() {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2
    });
  }
  changeMain(e, target) {
    e.preventDefault()
    this.setState({focusMainTarget: target})
    this.props.dispatch(changeMain({next: target}))
    this.setState({focusSubTarget: this.props.leaderboard.focusSubTarget})
  }
  changeSub(e, target) {
    e.preventDefault()
    this.setState({focusSubTarget: target})
    this.props.dispatch(changeSub(target))
  }
  menuRender(main, targetList) {
    let list = []
    let element = null
    if (main) {
      for (let i in targetList) {
        element = <DropdownItem key={i} onClick={(event) => this.changeMain(event, targetList[i])}>{targetList[i]}</DropdownItem>
        list.push(element)
      }
    } else {
      for (let i in targetList) {
        element = <DropdownItem key={i} onClick={(event) => this.changeSub(event, targetList[i])}>{targetList[i]}</DropdownItem>
        list.push(element)
      }
    }
    return (
      <DropdownMenu>
        {list}
      </DropdownMenu>
    )
  }
  render() {
    return (
      <div>
        <ButtonDropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1.bind(this)}>
          <DropdownToggle caret>
            {this.state.focusMainTarget
              ? this.state.focusMainTarget
              : this.props.leaderboard.focusTarget}
          </DropdownToggle>
          {this.props.mainTargetList[0]
            ? this.menuRender(true, this.props.mainTargetList)
            : <DropdownMenu>
              None
            </DropdownMenu>}
        </ButtonDropdown>
        <ButtonDropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2.bind(this)}>
          <DropdownToggle caret>
            {this.props.leaderboard.focusSubTarget}
          </DropdownToggle>
          {this.props.subTargetList[0]
            ? this.menuRender(false, this.props.leaderboard.subTargetList)
            : <DropdownMenu>
              None
            </DropdownMenu>}
        </ButtonDropdown>
      </div>
    )
  }
}

Targetselect.PropTypes = {
  focusTarget: PropTypes.string,
  focusSubTarget: PropTypes.string,
  mainTargetList: PropTypes.array,
  subTargetList: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  leaderboard: PropTypes.object.isRequired
}

function select({leaderboard}) {
  return {leaderboard}
}

export default connect(select)(Targetselect)
