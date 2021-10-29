import React, {useRef, useState} from 'react'
import Webcam from 'react-webcam'
import * as poseDetection from '@tensorflow-models/pose-detection'
import * as tf from '@tensorflow/tfjs'
import { drawKeypoints, drawSkeleton } from './MoveNetUtils'


function Model(props) {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [whichPose, setPose] = useState(-1)
    const [accu, setaccu] = useState(0.00);
    const yoga = ['Chair', 'Cobra', 'Dog', 'Tree', 'Warrier']

    const processinput = (keypoints_with_score) => {
      const output = [[]] ;
       keypoints_with_score.map( (pose) => {
        output[0].push(pose.x);
        output[0].push(pose.y);
        output[0].push(pose.score);
      })
      return output;
    }

    const predictPose = async (pose) =>{
      // console.log('Model Loading');
      const tfmodel = await tf.loadGraphModel('model/model.json')
      // console.log('prediction');
      const pred = tfmodel.predict(tf.tensor2d(pose));
      writeElement(pred.dataSync());
      // console.log('.predict', pred.dataSync());
      // console.log('Model Loaded');
    }

    
    const writeElement = (res) => {
      let maxIndex = res.indexOf(Math.max(...res))
      if(res[maxIndex]<0.2){
        setPose(-1);
        return ;
      }
     setPose(maxIndex);
      setaccu(res[maxIndex]);
      if(yoga[maxIndex]!='Warrier')
      {
        props.changeTimerState(2, false)

      }
      else{
        props.changeTimerState(2, true)
      }
      // console.log(accu)
    }
    
    
    const runMovenet = async () => {
        const detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet,
            {
                modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
                inputResolution: { width: 640, height: 480 },
                scale: 0.8,
            });
        setInterval(() => {
            detect(detector);
          }, 1000);
    }

    const detect = async (detector) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
          ) {
              // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
              // console.log(webcamRef.current)
            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Make Detections

            const pose = await detector.estimatePoses(video);
            // console.log(pose);
            
            if(pose && pose[0].keypoints){
              drawCanvas(pose[0], video, videoWidth, videoHeight, canvasRef);
            // console.log(processinput(pose[0]['keypoints']));
              predictPose(processinput(pose[0].keypoints))
            }
          }

    }

    const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
        const ctx = canvas.current.getContext("2d");
        canvas.current.width = videoWidth;
        canvas.current.height = videoHeight;
        ctx.translate(videoWidth, 0);
        ctx.scale(-1, 1);
        if(pose){
          drawKeypoints(pose['keypoints'], ctx);
        drawSkeleton(pose['keypoints'], ctx);
        }
      };


    runMovenet();

    return (
        <div className='.col-6'
          style={{
            textAlign:'left', marginLeft:'1%', marginTop:'1%'
          }}
        >
          {whichPose == -1 ? 
          <p>
            No Pose Identified
          </p> :
          <p>
            {yoga[whichPose]},{whichPose} Pose Identified with Accuracy {accu}
          </p>
          }
            <Webcam
            ref={webcamRef}
            mirrored
            style={{
              // width:'50%'
              // position: "absolute",
            marginLeft: '15px',
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
            }}
            />

            <canvas 
          ref={canvasRef}
            style={{
              // width:'50%'
              position: "absolute",
            marginLeft: "2%",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
            
            }}
            />
        </div>
    )
}

export default Model
