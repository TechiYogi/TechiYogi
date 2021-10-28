import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Row } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons'

const Timer = (props) => {
  const [Play, setPlay] = useState(true);
  const [time, settime] = useState(props.time)

  const pauseTimer = () => {
    setPlay(!Play);
  };

  const completePose = () => {
        // pauseTimer();
        props.nextPose()
        settime(props.time)
        pauseTimer();
        console.log(time)
        return[true, 1000];
  }

  const timerProps = {
    isPlaying: Play,
    size: 120,
    strokeWidth: 6,

    colors: [
      ["#218380", 0.25],
      ["#7E2E84", 0.25],
      ["#D14081", 0.25],
      ["#EF798A", 0.25],
    ],
  };

  const renderTime = ({ remainingTime }) => {
    // if (remainingTime === 0) {
    //     return <div className="timer">Too lale...</div>;
    //   }

    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60

    return (
      <div className="time-wrapper">
        {/* <div className="text">Remaining</div> */}
        <div className="value">{`${(minutes/10)<1?`0${minutes}`:minutes}:${(seconds/10)<1?`0${seconds}`:seconds}`}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  return (
    <div>
      <div className="playpause">
        <label for="playpause"
            style={{transition: '500ms all ease', }}
        >
            {/* <i class="fal fa-play-circle"></i> */}
            {Play?
            <FontAwesomeIcon icon={faPauseCircle} size='4x' color='#1671B2' />:
            <FontAwesomeIcon icon={faPlayCircle} size='4x' color='#1671B2' />}
        </label>
        <input 
        type="checkbox" value="None" id="playpause" name="check" 
        onClick={pauseTimer}
        style={{visibility: 'hidden'}} />
      </div>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          {...timerProps}
          trailColor='#1671B2'
          onComplete={ () => completePose() }
          duration={time}
        >
          {renderTime}
          {/* {children} */}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default Timer;
