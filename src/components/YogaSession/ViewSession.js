import React, { Component } from "react";
import { Schedule } from "./FetchSession";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import Model from "./Model/Model";

export class ViewSession extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentID: 1,
      totalPoses: Schedule.length,
      play : {
        play_btn : true,
        play_pose: false
      },
      key: 0,
      pauseTime: -1,
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
    this.shouldRestartTimer = this.shouldRestartTimer.bind(this);
    this.timerchildRef = React.createRef();
  }

  changePauseTimeState = (Case) => {
    var pauseTime = this.state.pauseTime
    switch(Case){
      case 1:{
        if(pauseTime!=-1){
          break;
        }
        else
        {
          var time = new Date();
          this.setState({
              pauseTime: time.getTime()/1000
          })
        }
        break;
      }
      case 2: {
        this.setState({
          pauseTime: -1
        })
      }
    }
  }


  shouldRestartTimer = () => {
    var time = new Date();
    const play = this.state.play
   if(play.play_btn && play.play_pose == false && this.state.pauseTime!=-1 && time.getTime()/1000 - this.state.pauseTime >=5)
    {
      console.log('Restart Timer', time.getTime()/1000 - this.state.pauseTime)
      this.changePauseTimeState(2)
    }
  }


  changeTimerState = (Case, State=false) => {
    var play= this.state.play
    switch(Case){
      case 1:{
        play.play_btn = !play.play_btn
        this.setState({
          play: play
        })
        break;
      }
      case 2:{
        play.play_pose = State
        this.setState({
          play: play
        })
      }
      default: return;
    }
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
  
  componentDidMount = () => {
    // this.shouldRestartTimer
    setInterval(() => {
      this.shouldRestartTimer()
    }, 1000);
  }

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
              {play.play_pose && play.play_btn ? (
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
              disabled = {!play.play_pose}
              onClick={() => this.changeTimerState(1)}
              style={{ visibility: "hidden" }}
            />
          </div>
          <div className="timer-wrapper" style={{display:'inline'}} >
            <CountdownCircleTimer
              {...timerProps}
              key={this.state.key}
              isPlaying={play.play_pose && play.play_btn}
              // trailColor="#C0F1F8"
              onComplete={this.nextPose}
            //   initialRemainingTime={Schedule[this.state.currentID-1].yoga_time}
              duration={Schedule[this.state.currentID-1].yoga_time}
            >
              {this.renderTime}
              {/* {children} */}
            </CountdownCircleTimer>
          </div>
        </div>
        <div>
          <Model currentPose={Schedule[this.state.currentID-1].yoga_name} changeTimerState={(Case, State) => this.changeTimerState(Case, State)} changePauseTimeState = {(Case) => this.changePauseTimeState(Case)} />
        </div>
        <div style={{textAlign:'right', marginTop:'-2%'}} >
          <Button color="danger" >End Session</Button>
        </div>
      </div>
    );
  }
}

export default ViewSession;
