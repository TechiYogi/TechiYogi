import React, { Component } from "react";
import { Chart } from "react-google-charts";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";

class ShowReport extends Component {
  constructor(props) {
    super(props);
    let latest = {
      //this.props.currRep
      "chair": "[[1, 2, 4, 3, 5, 6, 2, 3, 1, 5, 3, 4, 2, 5, 6, 4, 6], 0]",
      "cobra": "[[1, 2, 4, 3, 5, 6, 2, 3, 1, 5, 3, 4, 2, 5, 6, 4, 6, 3, 4], 1]",
      "dog": "[[1, 2, 4, 3, 5, 6, 2, 3, 1, 5, 3, 4, 2, 5, 6, 4, 6, 5, 4, 1, 2], 2]",
      "tree": "[[1, 2, 4, 3, 5, 6, 2, 3, 1, 5, 3, 4, 2, 5, 6, 4, 6, 3, 6, 5, 4, 1, 3], 8]",
      "warrior": "[[1, 2, 4, 3, 5, 6, 2, 3, 1, 5, 3, 4, 2, 5, 6, 4, 6, 3, 4, 5, 6, 1, 7, 6, 2], 15]"
    }
  //   latest = this.props.report
  //   for (let rep in latest) {
  //     report[rep] = JSON.stringify(report[rep])
  // }

    let report=[]
    for(let key in latest){
     let arr = JSON.parse(latest[key])
      
      let temp={}
      temp["yoga_name"]=key
      temp["repeats"]=arr[1]
      temp["score"]=arr[0]
      report.push(temp)

    }
    this.state = {
      rep:report,
      modal: false,
    };
    this.analysisChart = this.analysisChart.bind(this)
  }

  setModal = () => {
    const modal = this.state.modal;
    this.setState({
      modal: !modal,
    });
  };

  analysisChart = (id) => {
    return (
      <div>
          {/* {id} */}
          <Chart
        width={"100%"}
        height={"500"}
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={[
            [
              { type: 'date', label: 'Time' },
              'Score',
              
            ],
            [new Date(), -0.5],
            [new Date(2014, 1), 0.4],
            [new Date(2014, 2), 0.5],
            [new Date(2014, 3), 2.9],
            [new Date(2014, 4), 6.3],
            [new Date(2014, 5), 9],
          ]}
        options={{
          chart: {
            title:
              "Score estimation of yoga pose",
          },
          width: 400,
          height: 300,
          series: {
            // Gives each series an axis name that matches the Y-axis below.
            0: { axis: "Score" },
            
          },
          axes: {
            // Adds labels to each axis; they don't have to match the axis names.
            y: {
              Score: { label: "Score" },
              
            },
          },
        }}
        rootProps={{ "data-testid": "4" }}
      />
      </div>
    );
  };

  reportTable = () => {
    const { rep } = this.state;
    var id = 1;
    return rep.map((pose) => {
      return (
        <tr>
          <th scope="row">{id}</th>
          <td>{pose.yoga_name}</td>
          <td>
            {pose.score.reduce(function (acc, val) {
              return acc + val;
            }, 0) / pose.score.length}
          </td>
          <td>{pose.repeats}</td>
          <td>
            {" "}
            <Button outline color="success" onClick={this.setModal}>
              View{" "}
            </Button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.setModal}
              className="endAnalysis"
            >
              <ModalHeader toggle={this.setModal}>Your Report</ModalHeader>
              <ModalBody>
                  {this.analysisChart(id)}
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.setModal}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </td>
        </tr>
      );
      id=id+1
    });
  };

  render() {
    return (
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Aasan Name</th>
              <th>Score</th>
              <th>No. of Repeats</th>
              <th>Deailed Analysis</th>
            </tr>
          </thead>
          <tbody>{this.reportTable()}</tbody>
        </Table>
      </div>
    );
  }
}

export default ShowReport;
