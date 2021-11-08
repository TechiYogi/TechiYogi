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

    this.state = {
      report: [
        {
          yoga_name: "Chair",
          repeats: 2,
          score: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        },
        {
          yoga_name: "Cobra",
          repeats: 2,
          score: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        },
        {
          yoga_name: "Dog",
          repeats: 2,
          score: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        },
        {
          yoga_name: "Tree",
          repeats: 2,
          score: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        },
        {
          yoga_name: "Warrier",
          repeats: 2,
          score: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        },
      ],
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
    const { report } = this.state;
    var id = 1;
    return report.map((pose) => {
      return (
        <tr>
          <th scope="row">{id}</th>
          <td>{pose.yoga_name}</td>
          <td>
            {pose.score.reduce(function (acc, val) {
              return acc + val;
            }, 0) / pose.score.length}
          </td>
          <td>1</td>
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
{
  /* <import React, { Component } from 'react'
import {Chart} from 'react-google-charts'
import { Button, Table } from 'reactstrap'

class ShowReport extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            report:[
                {
                    yoga_name: 'Chair',
                    repeats: 2,
                    score: [8,8,8,8,8,8,8,8,8,8,8,8,8,8]
                },
                {
                    yoga_name: 'Cobra',
                    repeats: 2,score: [
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],                
                        
                    ]
                },
                {
                    yoga_name: 'Dog',
                    repeats: 2,
                    score: [
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],                
                        
                    ]
                },
                {
                    yoga_name: 'Tree',
                    repeats: 2,
                    score: [
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],                
                        
                    ]
                },
                {
                    yoga_name: 'Warrier',
                    repeats: 2,
                    score: [
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],
                        [(new Date).getTime/1000, 8],                
                        
                    ]
                },
                
            ]
        }
    }

    detailedAnalysis = (id) =>{
            
        
        
    }

    reportTable = () =>{
        const {report} = this.state
        var id = 1
        return(
            report.map( pose =>{
                return(
                    <tr>
                        <th scope='row'>{id++}</th>
                        <td>{pose.yoga_name}</td>
                        <td>{pose.score.reduce(function(acc, val) { return acc + val; }, 0)/pose.score.length }</td>
                        <td> <Button outline color='success' onClick={this.detailedAnalysis(id-1)} >View Detailed Analysis</Button> </td>
                        <td>
                        <Chart
  width={'100%'}
  height={'500'}
  chartType="Line"
  loader={<div>Loading Chart</div>}
  data={[
    [
      { type: 'date', label: 'Day' },
      'Average temperature',
      'Average hours of daylight',
    ],
    [new Date(2014, 0), -0.5, 5.7],
    [new Date(2014, 1), 0.4, 8.7],
    [new Date(2014, 2), 0.5, 12],
    [new Date(2014, 3), 2.9, 15.3],
    [new Date(2014, 4), 6.3, 18.6],
    [new Date(2014, 5), 9, 20.9],
    [new Date(2014, 6), 10.6, 19.8],
    [new Date(2014, 7), 10.3, 16.6],
    [new Date(2014, 8), 7.4, 13.3],
    [new Date(2014, 9), 4.4, 9.9],
    [new Date(2014, 10), 1.1, 6.6],
    [new Date(2014, 11), -0.2, 4.5],
  ]}
  options={{
    chart: {
      title:
        'Average Temperatures and Daylight in Iceland Throughout the Year',
    },
    width: 400,
    height: 300,
    series: {
      // Gives each series an axis name that matches the Y-axis below.
      0: { axis: 'Temps' },
      1: { axis: 'Daylight' },
    },
    axes: {
      // Adds labels to each axis; they don't have to match the axis names.
      y: {
        Temps: { label: 'Temps (Celsius)' },
        Daylight: { label: 'Daylight' },
      },
    },
  }}
  rootProps={{ 'data-testid': '4' }}
/>
                        </td>
                    </tr>
                )
            })
        )
    }

> */
}
