import React, { Component } from 'react'
import ScheduleNav from './ScheduleNav'
import ShowSchedule from './ShowSchedule'


export class Schedule extends Component {
    render() {
        return (
            <div>
                <ScheduleNav/>
                <div style={{marginTop:'55px'}}>
                <ShowSchedule/>
                </div>
            </div>
        )
    }
}

export default Schedule