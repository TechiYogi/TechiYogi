import React, {useState} from 'react'
import { Schedule } from './FetchSession'
import Timer from './Timer'

function ViewSession() {

    const [currentID, setcurrentID] = useState(1);
    const totalPoses = Schedule.length;

    // const StartSession = () =>{
    //     // const 
    //     const a= Schedule.map(yoga => {
    //         console.log(yoga)
    //         return(
    //             <h1>{yoga.yoga_name}</h1>
    //         )
    //     })
    //     return a;
    // }

    const nextPose = () =>{
        console.log('next Pose')
        if(currentID<totalPoses)
        {
            setcurrentID(currentID+1);
        }
        else
        {
            console.log('Session Completed')
        }
    }

    return (
        <div 
            style={{background:'#C0F1F8'}}
        >
        <div>
            <h2>{Schedule[currentID-1].yoga_name.toUpperCase()}</h2>
        </div>
        <div style={{width:'90px', height:'50px', borderRadius:'50%', background:'#C4C4C4', fontSize:'160%', float:'right' }} >
            {currentID}/{totalPoses}
        </div>
        <div>
        <Timer time={Schedule[currentID-1].yoga_time} nextPose={nextPose} />
        </div>
        </div>
    )
}

export default ViewSession
