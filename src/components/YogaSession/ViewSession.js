import React from 'react'
import Timer from './Timer'

const data = [
    {time:'56'},
    {time:'10'},
    {time:'15'}

];

function ViewSession() {
    return (
        <div 
            style={{background:'#81BBE5'}}
        >

        <Timer time={10} />

            
        );    
        </div>
    )
}

export default ViewSession
