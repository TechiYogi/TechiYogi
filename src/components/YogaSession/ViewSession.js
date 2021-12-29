import React, { Component } from "react";
import { Schedule } from "./FetchSession";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import Model from "./Model/Model";
import PoseDemonstration from "./PoseDemonstration";
import EndSessionModal from "./EndSessionModal";
import ShowReport from "./../Report/ShowReport";

export class ViewSession extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentID: 1,
      totalPoses: Schedule.length,
      play: {
        play_btn: true,
        play_pose: false,
      },
      NRestart: 0,
      scorearr: [],

      key: 0,
      pauseTime: -1,
      shouldRepeat: true,
      reportData: {},
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

    this.childRefEndSession = React.createRef();
    this.nextPose = this.nextPose.bind(this);
    this.shouldRestartTimer = this.shouldRestartTimer.bind(this);
    this.timerchildRef = React.createRef();
  }

  addScore = (score) => {
    var scorearr = this.state.scorearr;
    // var reportData = this.state.reportData

    scorearr.push(score);
    this.setState({
      scorearr: scorearr,
      // reportData: reportData
    });
  };

  changePauseTimeState = (Case) => {
    var pauseTime = this.state.pauseTime;
    switch (Case) {
      case 1: {
        if (pauseTime != -1) {
          break;
        } else {
          var time = new Date();
          this.setState({
            pauseTime: time.getTime() / 1000,
          });
        }
        break;
      }
      case 2: {
        this.setState({
          pauseTime: -1,
        });
      }
    }
  };

  shouldRestartTimer = () => {
    var time = new Date();
    const play = this.state.play;
    if (
      play.play_btn &&
      play.play_pose == false &&
      this.state.pauseTime != -1 &&
      time.getTime() / 1000 - this.state.pauseTime >= 5
    ) {
      console.log(
        "Restart Timer",
        time.getTime() / 1000 - this.state.pauseTime
      );
      this.changePauseTimeState(2);
      this.setState({
        key: this.state.key + 1,
        NRestart: this.state.NRestart + 1,
      });
    }
  };

  changeTimerState = (Case, State = false) => {
    var play = this.state.play;
    switch (Case) {
      case 1: {
        play.play_btn = !play.play_btn;
        break;
      }
      case 2: {
        play.play_pose = State;
        break;
      }
      case 3:{
        play.play_btn = false;
        break;
      }
      default:
        return;
    }
    this.setState({
      play: play,
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
    const { currentID, totalPoses, key, shouldRepeat, scorearr, NRestart } =
      this.state;
    let reportData = this.state.reportData;
    if (Object.keys(reportData).length === 0) {
      Schedule.map((item) => (reportData[`${item.yoga_name}`] = [[], 0]));
      console.log("Report created first time", reportData);
    }
    reportData[Schedule[currentID - 1].yoga_name] = [scorearr, NRestart];
    console.log("next Pose", currentID);
    console.log("report", reportData);
    if (Schedule[currentID - 1].both_sides == true && shouldRepeat) {
      this.setState({
        key: key + 1,
        shouldRepeat: false,
      });
      console.log("Repeat pose for Left Side");
      return [true, 3000];
    }

    if (currentID < totalPoses) {
      this.setState({
        key: key + 1,
        currentID: currentID + 1,
        scorearr: [],
        NRestart: 0,
        reportData: reportData,
        shouldRepeat: true,
      });

      return [true, 3000];
    } else 
    {
      //idhr krege.. kaand
      alert("Session Completed, please click on End Sessio Button");
      this.childRefEndSession.current.handleEnd();

      // let report = this.state.reportData;

      //   for (let rep in report) {
      //     report[rep] = JSON.stringify(report[rep])
      //   }
  
      // <ShowReport report={report} />

    }
    // {this.timerchildRef.current.Timer(Schedule[this.state.currentID-1].yoga_time)}
  };

  componentDidMount = () => {
    // this.shouldRestartTimer
    setInterval(() => {
      this.shouldRestartTimer();
    }, 1000);
  };

  render() {
    const { currentID, totalPoses, play, timerProps } = this.state;

    return (
      <div style={{ background: "#C0F1F8" }}>
        <div
          style={{
            display: "flex",
            float: "right",
            marginTop: "1%",
            marginRight: "5%",
          }}
        >
          <div style={{ marginInlineEnd: "5%", fontSize: "550%" }}>
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
        <div
          className="timer"
          style={{
            textAlign: "left",
            display: "flex",
            marginLeft: "4%",
            paddingTop: "1%",
          }}
        >
          <div className="playpause">
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
              disabled={!play.play_pose}
              onClick={() => this.changeTimerState(1)}
              style={{ visibility: "hidden" }}
            />
          </div>
          <div className="timer-wrapper" style={{ display: "inline" }}>
            <CountdownCircleTimer
              {...timerProps}
              key={this.state.key}
              isPlaying={play.play_pose && play.play_btn}
              // trailColor="#C0F1F8"
              onComplete={this.nextPose}
              //   initialRemainingTime={Schedule[this.state.currentID-1].yoga_time}
              duration={Schedule[this.state.currentID - 1].yoga_time}
            >
              {this.renderTime}
              {/* {children} */}
            </CountdownCircleTimer>
          </div>
        </div>
        <div style={{}}>
          <div>
            <Model
              currentPose={Schedule[this.state.currentID - 1].yoga_name}
              changeTimerState={(Case, State) =>
                this.changeTimerState(Case, State)
              }
              changePauseTimeState={(Case) => this.changePauseTimeState(Case)}
              addScore={(score) => this.addScore(score)}
              play_btn = {this.state.play.play_btn}
            />
          </div>
          <div style={{ margin: "5%" }}>
            <PoseDemonstration
              poseName={Schedule[this.state.currentID - 1].yoga_name}
              gif={Schedule[this.state.currentID - 1].gif}
            />
          </div>
        </div>
        <div style={{ textAlign: "right", marginTop: "-2%" }}>
          <EndSessionModal
            ref = {this.childRefEndSession}
            report={this.state.reportData}
            changeTimerState={this.changeTimerState}
          />
        </div>
      </div>
    );
  }
}

export default ViewSession;
