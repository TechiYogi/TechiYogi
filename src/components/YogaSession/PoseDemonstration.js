import React from 'react'

function PoseDemonstration(props) {
    return (
        <div style={{border:'thick solid black', width:'550px', height:'400px'}}>
            <img src={props.gif} height="400px" width="550px" />
        </div>
    )
}

export default PoseDemonstration
