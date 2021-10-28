import React, { Component } from "react";
import { Schedule } from "./FetchSession";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import Timer from "./Timer";
import MoveNet from "../Model/MoveNet";
import Webcam from "react-webcam";

export class ViewSession extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentID: 1,
      totalPoses: Schedule.length,
      play: true,
      key: 0,
      timerProps: {
        // isPlaying: play ,
        size: 120,
        strokeWidth: 6,
        colors: [
          ["#218380", 0.25],
          ["#7E2E84", 0.25],
          ["#D14081", 0.25],
          ["#EF798A", 0.25],
        ],
      },
    };

    this.nextPose = this.nextPose.bind(this);
    this.timerchildRef = React.createRef();
  }

  pauseTimer = () => {
    this.setState({
      play: !this.state.play,
    });
  };

  renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <div className="time-wrapper">
        {/* <div className="text">Remaining</div> */}
        <div className="value">{`${
          minutes / 10 < 1 ? `0${minutes}` : minutes
        }:${seconds / 10 < 1 ? `0${seconds}` : seconds}`}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  nextPose = () => {
    const { currentID, totalPoses, key } = this.state;
    console.log("next Pose", currentID);
    
    if (currentID < totalPoses) {
      this.setState({
        key: key+1,
        currentID: currentID + 1,
      });

      return[true, Schedule[this.state.currentID-1].yoga_time]
    } else {
      console.log("Session Completed");
    }
    // {this.timerchildRef.current.Timer(Schedule[this.state.currentID-1].yoga_time)}
  };

  render() {
    const { currentID, totalPoses, play, timerProps } = this.state;

    return (
      <div style={{ background: "#C0F1F8" }}>
        <div style={{display:'flex', float:'right', marginTop:'1%', marginRight:'5%' }} >
        <div style={{marginInlineEnd:'5%', fontSize:'550%'}} >
          {Schedule[currentID - 1].yoga_name}
        </div>
        <div
          style={{
            width: "90px",
            height: "50px",
            borderRadius: "50%",
            background: "#C4C4C4",
            fontSize: "160%",
            float: "right",
            // display:'inline'
          }}
        >
          {currentID}/{totalPoses}
        </div>
        </div>
        <div className="timer"
            style={{textAlign:'left', display:'flex', marginLeft:'4%', paddingTop:'1%'}}
        >
          <div className="playpause" >
            <label for="playpause" style={{ transition: "500ms all ease" }}>
              {play ? (
                <FontAwesomeIcon
                  icon={faPauseCircle}
                  size="4x"
                  color="#1671B2"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  size="4x"
                  color="#1671B2"
                />
              )}
            </label>
            <input
              type="checkbox"
              value="None"
              id="playpause"
              name="check"
              onClick={() => this.pauseTimer()}
              style={{ visibility: "hidden" }}
            />
          </div>
          <div className="timer-wrapper" style={{display:'inline'}} >
            <CountdownCircleTimer
              {...timerProps}
              key={this.state.key}
              isPlaying={play}
              trailColor="#1671B2"
              onComplete={this.nextPose}
            //   initialRemainingTime={Schedule[this.state.currentID-1].yoga_time}
              duration={Schedule[this.state.currentID-1].yoga_time}
            >
              {this.renderTime}
              {/* {children} */}
            </CountdownCircleTimer>
          </div>
        </div>
        <div className='.col-6'
          style={{
            textAlign:'left', marginLeft:'1%'
          }}
        >
            {/* <MoveNet/> */}
            <Webcam
            mirrored
            style={{
              width:'50%'
            }}
            />
        </div>
        <div style={{textAlign:'right', marginTop:'-2%'}} >
          <Button color="danger" >End Session</Button>
        </div>
      </div>
    );
  }
}

export default ViewSession;
