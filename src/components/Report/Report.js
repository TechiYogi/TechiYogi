import React, { Component } from 'react'
import ReportNav from './ReportNav'
import SaveReport from './SaveReport'
import ShowReport from './ShowReport'
import {Button} from 'reactstrap'
export class Report extends Component {

    

    render() {
        return (
            <div>
                <ReportNav/>
                <div style={{marginTop:'55px'}}>
                <ShowReport/>
                <Button onClick={SaveReport}>Save Report</Button>
                </div>
            </div>
        )
    }
}

export default Report
