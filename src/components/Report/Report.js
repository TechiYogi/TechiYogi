import React, { Component , useState} from "react";
import ReportNav from "./ReportNav";
import ShowReport from "./ShowReport";

function Report() {

const [report, setreport] = useState({})

  return (
    <div>
      <ReportNav />
      <div style={{ marginTop: "55px" }}>
        <ShowReport  />
      </div>
    </div>
  );
}

export default Report;
