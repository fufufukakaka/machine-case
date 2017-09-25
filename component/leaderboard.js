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
import {connect} from 'react-redux'
import {fetchConfusionMatrix} from "../actions/leaderboard"

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
  conf_toggle_open(e, target) {
    e.preventDefault()
    this.props.dispatch(fetchConfusionMatrix({target_id: target}))
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
        <td onClick={(event) => this.conf_toggle_open(event, info.id)} className='link-color'>confusion matrix</td>
        <td className='link-color2' onClick={(event) => this.detail_toggle(event, source)}>{info.version}</td>
      </tr>
    )
  }
  renderConfMatrix() {
    let headerList = []
    let bodyList = []
    let contentList = []
    let element = null
    let element2 = null
    let element3 = null
    const classArray = this.props.leaderboard.class_array
    const valueArray = this.props.leaderboard.value_array
    //ヘッダー
    for (let i in classArray) {
      element = <th key={i}>{classArray[i]}</th>
      headerList.push(element)
      contentList = []
      for (let k in classArray) {
        element3 = <td key={classArray.length * Number(i) + Number(k)}>{valueArray[classArray.length * Number(i) + Number(k)]}</td>
        contentList.push(element3)
      }
      element2 = <tr key={i}>
        <th scope="row">{classArray[i]}</th>
        {contentList}
      </tr>
      bodyList.push(element2)
    }
    return (
      <Table hover>
        <thead>
          <tr>
            <th>confusion matrix</th>
            {headerList}
          </tr>
        </thead>
        <tbody>
          {bodyList}
        </tbody>
      </Table>
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
            {this.renderConfMatrix()}
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
  isComplete: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  leaderboard: PropTypes.object.isRequired
}

function select({leaderboard}) {
  return {leaderboard}
}

export default connect(select)(Leaderboard)
