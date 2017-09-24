import React from "react"
import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import '../styles/component/leaderboard.css'

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  renderTableContent() {
    const sample = [
      {
        submission_id: 1,
        model: 'Xgboost',
        recall: 0.95,
        f1: 0.93,
        auc: 0.92,
        version: 1,
        rank: 1
      }, {
        submission_id: 2,
        model: 'Support Vector Machine',
        recall: 0.89,
        f1: 0.89,
        auc: 0.87,
        version: 1,
        rank: 2
      }, {
        submission_id: 3,
        model: 'Naive Bayes',
        recall: 0.80,
        f1: 0.75,
        auc: 0.75,
        version: 1,
        rank: 3
      }
    ]
    let list = []
    let element = null
    for (let i in sample) {
      const info = sample[i]
      element = this.renderRow(info)
      list.push(element)
    }
    return (
      <tbody>{list}</tbody>
    )
  }
  renderRow(info) {
    return (
      <tr key={info.raw}>
        <th scope="row">{info.rank}</th>
        <td>{info.model}</td>
        <td>{info.recall}</td>
        <td>{info.f1}</td>
        <td>{info.auc}</td>
        <td onClick={this.toggle} className='link-color'>confusion matrix</td>
        <td className='link-color2'>{info.version}</td>
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
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Confusion Matrix(Xgboost)</ModalHeader>
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
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default Leaderboard
