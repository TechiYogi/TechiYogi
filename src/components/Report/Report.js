import React, { Component, useState } from "react";
import ReportNav from "./ReportNav";
import SaveReport from "./SaveReport";
import ShowReport from "./ShowReport";
import db from "../../firebase";
import { getFirestore, getDocs } from 'firebase/firestore';
import { collection, addDoc, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import firebase from '../../firebase';

function Report() {

const [report, setreport] = useState({})
let c = localStorage.getItem('email')
const Fetchdoc = async () => {
  const docRef = doc(db, "Report", c);
  const docSnap = await getDoc(docRef);
  

}

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