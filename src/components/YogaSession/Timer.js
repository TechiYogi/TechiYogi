import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Row } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons'

const Timer = (props) => {
  const [Play, setPlay] = useState(true);

  const pauseTimer = () => {
    setPlay(!Play);
  };

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
        //   isLinearGradient
        
          duration={props.time}
            onComplete={props.nextPose}
            
        >
          {renderTime}
          {/* {children} */}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

const TimerAll = (props) => {
  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;

  const [Play, setPlay] = useState(true);

  const pauseTimer = () => {
    setPlay(false);
  };

  const timerProps = {
    isPlaying: Play,
    size: 120,
    strokeWidth: 6,
  };

  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };

  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time) => (time / daySeconds) | 0;
  const stratTime = 0; // use UNIX timestamp in seconds
  const endTime = 90; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <div>
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#7E2E84"]]}
        duration={daysDuration}
        initialRemainingTime={remainingTime}
      >
        {({ elapsedTime }) =>
          renderTime("days", getTimeDays(daysDuration - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#D14081"]]}
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > hourSeconds,
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("hours", getTimeHours(daySeconds - elapsedTime))
        }
      </CountdownCircleTimer>
      <Row>
        <CountdownCircleTimer
          {...timerProps}
          colors={[["#EF798A"]]}
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={(totalElapsedTime) => [
            remainingTime - totalElapsedTime > minuteSeconds,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime("minutes", getTimeMinutes(elapsedTime))
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors={[["#218380"]]}
          duration={remainingTime}
          initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={(totalElapsedTime) => [
            remainingTime - totalElapsedTime > 0,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime("seconds", getTimeSeconds(elapsedTime))
          }
        </CountdownCircleTimer>
      </Row>
    </div>
  );
};
export default Timer;
