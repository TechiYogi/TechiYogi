import React, { Component, useState } from "react";
import ReportNav from "./ReportNav";
import SaveReport from "./SaveReport";
import ShowReport from "./ShowReport";
import db from "../../firebase";
import { getFirestore, getDocs } from 'firebase/firestore';
import { collection, addDoc, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import firebase from '../../firebase';
import {Button} from 'reactstrap'

function Report() {

// const [report, setreport] = useState([])
const report = {}
let c = localStorage.getItem('email')
const Fetchdoc = async () => {
  const docRef = doc(db, "Report", c);
  const docSnap = await getDoc(docRef);
  let days_dict = docSnap.data()[c]
  for(let key in days_dict){
    let dict = days_dict[key]
    for(let time in dict){
      report[time] = dict[time]
      
    }
  }
  console.log(report)
}
Fetchdoc()

  return (
    <div>
      <ReportNav />
      <div style={{ marginTop: "55px" }}>
        <ShowReport />
        <Button onClick={SaveReport(report)} >Save Report</Button>
      </div>
    </div>
  );
}

export default Report;