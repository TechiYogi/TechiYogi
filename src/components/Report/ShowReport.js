import React, { Component } from 'react'
import { Table } from 'reactstrap'

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
                    repeats: 2,
                    score: [8,8,8,8,8,8,8,8,8,8,8,8,8,8]
                },
                {
                    yoga_name: 'Dog',
                    repeats: 2,
                    score: [8,8,8,8,8,8,8,8,8,8,8,8,8,8]
                },
                {
                    yoga_name: 'Tree',
                    repeats: 2,
                    score: [8,8,8,8,8,8,8,8,8,8,8,8,8,8]
                },
                {
                    yoga_name: 'Warrier',
                    repeats: 2,
                    score: [8,8,8,8,8,8,8,8,8,8,8,8,8,8]
                },
                
            ]
        }
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
                    </tr>
                )
            })
        )
    }
    
    render() {
        return (
            <div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Aasan Name</th>
                            <th>No. of Repeats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.reportTable()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ShowReport
