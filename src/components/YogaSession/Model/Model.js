import React, {useRef, useState} from 'react'
import Webcam from 'react-webcam'
import * as poseDetection from '@tensorflow-models/pose-detection'
import * as tf from '@tensorflow/tfjs'
import { drawKeypoints, drawSkeleton } from './MoveNetUtils'
import { isTorsoVisible } from './TorsoVisible'


function Model(props) {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [whichPose, setPose] = useState(-1)
    const [accu, setaccu] = useState(0.00);
    const yoga = ['Chair', 'Cobra', 'Dog', 'Tree', 'Warrier']
    const yoga_poses = ['Ashwa sanchalanasana', 'Bhujangasana', 'HastaUttanasana',
    'Hastapadasana', 'Shashankasana', 'Ushtasana', 'Vishnu Pose',
    'boat pose', 'chair pose', 'chakra asana', 'dog pose',
    'pashchim utana asana', 'pawan mukt asana', 'setu bandh asana',
    'tree pose', 'triangle pose', 'virbhadrasana']

    const processinput = (keypoints_with_score) => {
      const output = [] ;
       keypoints_with_score.map( (pose) => {
        output.push(pose.x);
        output.push(pose.y);
        output.push(pose.score);
      })
    //   console.log('gygy', [output])
    //   const a =[ [
    //     60.09022,	168.13774,	0.40708113,	55.755024,	171.9038,	0.5688903,	56.013203,	167.30927,	0.44422475,	58.6052,	181.30801,	0.47244436,	59.013626,	172.27188	,0.32432956	,77.5734	,186.53023	,0.45712206	,78.18744	,172.89642	,0.55331814	,40.136227,	180.51253	,0.45210832	,48.095844	,163.63655	,0.29564857	,9.35324	,170.01689	,0.74201226	,10.097645	,163.28198	,0.1963837,	148.12903	,173.79872	,0.5823215	,144.63728,	161.46237,	0.5968966	,210.91728	,172.28476	,0.54477686	,161.8962	,136.79195	,0.35736358,	264.49902	,171.87527,	0.760858,	178.69756,	160.57985,	0.25913876
  
    //   ]]
    //   console.log('aaaa', a)
      return [output];
    }
    
    const predictPose = async (pose) =>{
      // // console.log('Model Loading');
      const tfmodel = await tf.loadGraphModel('TrainedModel/model.json')
      // // console.log('prediction');
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
      // setInterval(() => {
        props.addScore(accu)
      // }, 1000);
      if(yoga_poses[maxIndex]!='pashchim utana asana')
      {
        props.changeTimerState(2, false)
        props.changePauseTimeState(1);

      }
      else{
        props.changeTimerState(2, true)
        props.changePauseTimeState(2);
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
          
            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Make Detections

            // const image = tf.image.cropAndResize(tf.expandDims(video, 0), 256, 256)
            

            const pose = await detector.estimatePoses(video);
            // console.log(pose);
            
            if(pose && pose[0] && pose[0].keypoints){
              drawCanvas(pose[0], video, videoWidth, videoHeight, canvasRef);
            // console.log(processinput(pose[0]['keypoints']));
              if(true || isTorsoVisible(pose[0].keypoints))
              predictPose(processinput(pose[0].keypoints))
              else{
                console.log('Full Body Not Visible')
              }
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


    if(props.play_btn){
      runMovenet();
    }

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
            {yoga_poses[whichPose]},{whichPose} Pose Identified with Accuracy {accu}
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
