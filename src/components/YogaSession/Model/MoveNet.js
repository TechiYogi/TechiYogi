import React , {useRef, useState} from 'react'
import Webcam from 'react-webcam';
import * as poseDetection from '@tensorflow-models/pose-detection'
import * as tf from '@tensorflow/tfjs'
import { drawKeypoints, drawSkeleton } from './MoveNetUtils';


function MoveNet() {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [whichPose, setPose] = useState(-1)
    const [accu, setaccu] = useState(0.00);
    const yoga = ['chair', 'cobra', 'dog', 'tree', 'warrier']
    console.log(tf.tensor([1,2,2]) )
    const runMovenet = async () => {
        const detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet,
            {
                modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
                inputResolution: { width: 640, height: 480 },
                scale: 0.3,
            });
        setInterval(() => {
            detect(detector);
          }, 1000);
    }

    const processinput = (keypoints_with_score) => {
      const output = [[]] ;
       keypoints_with_score.map( (pose) => {
        output[0].push(pose.x);
        output[0].push(pose.y);
        output[0].push(pose.score);
      })
      return output;
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

            const pose = await detector.estimatePoses(video);
            // console.log(pose);
            
            if(pose && pose[0]['keypoints']!=undefined ){
              drawCanvas(pose[0], video, videoWidth, videoHeight, canvasRef);
            // console.log(processinput(pose[0]['keypoints']));
              predictPose(processinput(pose[0]['keypoints']))
            }
          }

    }

    const writeElement = (res) => {
      let maxIndex = res.indexOf(Math.max(...res))
      if(res[maxIndex]<0.2){
        setPose(-1);
        return ;
      }
     setPose(maxIndex);
      setaccu(res[maxIndex]);
      // console.log(accu)
    }
    

const testData2 = [ [100.77516, 149.45404, 0.480813, 95.95637, 154.65329, 0.666816, 96.20327, 144.96979, 0.448191, 98.67386, 162.76367, 0.479641, 98.11843, 139.23698, 0.487845, 114.02463, 171.16048, 0.701734, 114.28639, 134.49709, 0.677903, 77.31491, 184.64568, 0.633102, 81.72002, 117.06493, 0.484756, 31.55853, 182.99757, 0.627328, 40.861423, 117.58134, 0.684182, 190.44162, 162.41501, 0.610755, 190.37122, 138.82777, 0.770647, 243.33435, 157.46242, 0.596673, 242.13371, 137.97192, 0.518701, 286.3598, 156.7551, 0.610763, 283.07806, 142.11703, 0.707876]]
    
    const predictPose = async (pose) =>{
      // console.log('Model Loading');
      const tfmodel = await tf.loadGraphModel('model/model.json')
      // console.log('prediction');
      const pred = tfmodel.predict(tf.tensor2d(pose));
      writeElement(pred.dataSync());
      // console.log('.predict', pred.dataSync());
      // console.log('Model Loaded');
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
    // predictPose();
    return (
        <div>
          {whichPose == -1 ? 
          <p>
            No Pose Identified
          </p> :
          <p>
            {yoga[whichPose]} Pose Identified with Accuracy {accu}
          </p>
          }
         <header className="App-header">
        <Webcam
           mirrored={true}
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
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
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
        </div>
    )
}

export default MoveNet
