import React from "react"
import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import ReactMarkdown from 'react-markdown'
import PropTypes from "prop-types"
import '../styles/component/leaderboard.css'

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conf_modal: false,
      detail_modal: false,
      detail_source: ""
    };
    this.conf_toggle = this.conf_toggle.bind(this);
  }
  conf_toggle() {
    this.setState({
      conf_modal: !this.state.conf_modal
    });
  }
  detail_toggle(e, source) {
    e.preventDefault()
    this.setState({
      detail_modal: !this.state.detail_modal,
      detail_source: source
    });
  }
  renderTableContent() {
    let list = []
    let element = null
    let targetData = []
    for (let i in this.props.data) {
      const info = this.props.data[i]
      if (info.sub_target === this.props.focusSubTarget) {
        targetData.push(info)
      }
    }
    for (let i in targetData) {
      const info2 = targetData[i]
      element = this.renderRow(Number(i) + 1, info2)
      list.push(element)
    }
    return (
      <tbody>{list}</tbody>
    )
  }
  renderRow(k, info) {
    const source = info.detail
    return (
      <tr key={k}>
        <th scope="row">{k}</th>
        <td>{info.model}</td>
        <td>{info.recall}</td>
        <td>{info.f1}</td>
        <td>{info.auc}</td>
        <td onClick={this.conf_toggle} className='link-color'>confusion matrix</td>
        <td className='link-color2' onClick={(event) => this.detail_toggle(event, source)}>{info.version}</td>
      </tr>
    )
  }
  render() {
    return (
      <div>
        <Table hover className='board'>
          <thead className='board-head'>
            <tr>
              <th>rank</th>
              <th>Model Name</th>
              <th>recall-score</th>
              <th>f1-score</th>
              <th>AUC</th>
              <th>confusion matrix</th>
              <th>version(Detail)</th>
            </tr>
          </thead>
          {this.renderTableContent()}
        </Table>
        //TODO Commonize Modal
        <Modal isOpen={this.state.conf_modal} toggle={this.conf_toggle} className={this.props.className}>
          <ModalHeader toggle={this.conf_toggle}>Confusion Matrix</ModalHeader>
          <ModalBody>
            <Table hover>
              <thead>
                <tr>
                  <th>confusion matrix</th>
                  <th>class:0</th>
                  <th>class:1</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">class:0</th>
                  <td>100</td>
                  <td>3</td>
                </tr>
                <tr>
                  <th scope="row">class:1</th>
                  <td>3</td>
                  <td>100</td>
                </tr>
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.conf_toggle}>Close</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.detail_modal} toggle={(event) => this.detail_toggle(event, null)} className={this.props.className}>
          <ModalHeader toggle={(event) => this.detail_toggle(event, null)}>Submission Detail</ModalHeader>
          <ModalBody>
            <ReactMarkdown source={this.state.detail_source}/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={(event) => this.detail_toggle(event, null)}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

Leaderboard.PropTypes = {
  data: PropTypes.object,
  focusSubTarget: PropTypes.string,
  isFetching: PropTypes.bool,
  isComplete: PropTypes.bool
}

export default Leaderboard
