import React, {useRef} from 'react'
import Webcam from 'react-webcam'
import * as poseDetection from '@tensorflow-models/pose-detection'
import * as tf from '@tensorflow/tfjs'
import { drawKeypoints, drawSkeleton } from './MoveNetUtils'


function Model() {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runMovenet = async () => {
        const detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet,
            {
                modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
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

            const pose = await detector.estimatePoses(video);
            // console.log(pose);
            
            if(pose && pose[0]['keypoints']){
              drawCanvas(pose[0], video, videoWidth, videoHeight, canvasRef);
            // console.log(processinput(pose[0]['keypoints']));
            //   predictPose(processinput(pose[0]['keypoints']))
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
            textAlign:'left', marginLeft:'1%'
          }}
        >
            <Webcam
            ref={webcamRef}
            mirrored
            style={{
              width:'50%'
            }}
            />

            <canvas 
          ref={canvasRef}
            style={{
              width:'50%'
            }}
            />
        </div>
    )
}

export default Model
