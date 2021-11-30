import React, { Component, useState } from "react";
import ReportNav from "./ReportNav";
import SaveReport from "./SaveReport";
import ShowReport from "./ShowReport";
import db from "../../firebase";
import { getFirestore, getDocs } from "firebase/firestore";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

function Report() {
  const [report, setreport] = useState({});

  const Fetchdoc = async () => {
    let c = localStorage.getItem("email");
    const docRef = doc(db, "Report", c);
    const docSnap = await getDoc(docRef);
    let rep = {};
    let days_dict = docSnap.data()[c];
    for (let key in days_dict) {
      let dict = days_dict[key];
      for (let time in dict) {
        rep[time] = dict[time];
      }
    }
    setreport(rep);
    // console.log(rep)
    // return rep
  };
  Fetchdoc();

  const SideNavMap = () => {
    // const report =
    // Fetchdoc();
    // console.log('Report', report)

    return Object.keys(report).map((key, index) => {
      return (
        <ul>
          <li>
            <a href={`#${key}`} className="Links">
              {key}
            </a>
          </li>
        </ul>
      );
    });
  };

  const reportTableMap = () => {
    return Object.keys(report).map((key, index) => {
      return (
        <div>
          <h2 id={`${key}`}> {key} </h2>
          <div>
            {" "}
            <ShowReport report={report[key]} />
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div>
        <ReportNav />
      </div>
      <div className="container-fluid" style={{ marginTop: "55px" }}>
        <div className="row">
          <div className="col-3 border-right border-dark d-none d-md-block">
            <div
              className="sidenav border-right  "
              style={{ lineHeight: 2.1, paddingLeft: "20px" }}
            >
              <h2>Quick Links</h2>
              {SideNavMap()}
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-8 learnC">
        <div className="d-block d-md-none">
          {/* <Navbar color="faded" light>
            <NavbarBrand className="mr-auto">Quick Links</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="#crypto">What is Crypto Currency?</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#blockchain">What is Block Chain?</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Our Platform
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink href="#assets">Assets</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="#charts">Charts</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="#orders">Orders</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="#predictions">Predictions</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="#account">Account</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink href="#demo">Demo</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar> */}
        </div>
        <div style={{marginTop:'30px'}}>
          {reportTableMap()}
        </div>
      </div>
    </div>
  );
}

export default Report;
