import React, { Component } from 'react'
import ReportNav from './ReportNav'
import ShowReport from './ShowReport'

export class Report extends Component {
    render() {
        return (
            <div>
                <ReportNav/>
                <div style={{marginTop:'55px'}}>
                <ShowReport/>
                </div>
            </div>
        )
    }
}

export default Report
