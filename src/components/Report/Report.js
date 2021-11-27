import React, { Component, useState } from "react";
import ReportNav from "./ReportNav";
import SaveReport from "./SaveReport";
import ShowReport from "./ShowReport";
import {Button} from 'reactstrap'

function Report() {

  const [report, setreport] = useState({})

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