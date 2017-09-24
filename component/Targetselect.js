import React from "react"
import {
  Button,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap'

class Targetselect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen1: false,
      dropdownOpen2: false
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
  render() {
    return (
      <div>
        <ButtonDropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1.bind(this)}>
          <DropdownToggle caret>
            spi-auto-correct
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>spi-auto-correct</DropdownItem>
            <DropdownItem>fnjudge-evolve</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <ButtonDropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2.bind(this)}>
          <DropdownToggle caret>
            q1-1(score_avg_1)
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>q1-1(score_avg_1)</DropdownItem>
            <DropdownItem>q1-1(score_avg_2)</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    )
  }
}

export default Targetselect
