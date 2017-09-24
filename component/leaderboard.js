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
              <th>confusion matrix</th>
              <th>version(Detail)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Xgboost</td>
              <td>0.95</td>
              <td>0.93</td>
              <td onClick={this.toggle} className='link-color'>confusion matrix</td>
              <td className='link-color2'>3</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Supprt Vector Machine</td>
              <td>0.89</td>
              <td>0.87</td>
              <td onClick={this.toggle} className='link-color'>confusion matrix</td>
              <td className='link-color2'>2</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Naive Bayes</td>
              <td>0.85</td>
              <td>0.82</td>
              <td onClick={this.toggle} className='link-color'>confusion matrix</td>
              <td className='link-color2'>1</td>
            </tr>
          </tbody>
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
