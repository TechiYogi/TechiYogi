import React from 'react';
import firebase from "../../firebase";
import {Container, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, Nav, Button} from 'reactstrap';
import CreateSchedule from './CreateSchedule';
// import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
// import { BrowserRouter as Router } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
      };
      this.onClick = this.onClick.bind(this);
      this.Logout = this.Logout.bind(this);
  }

  onClick() {
    this.setState({
        collapse: !this.state.collapse,
      });
  }

  Logout()
  {
    // firebase.auth().signOut().then(function() {
    //   alert("signed out Successfully");
    //   window.location="/";
    // }, function(error) {
    //   // An error happened.
    //   console.log(error);
    // });
    alert("Signed Out");
    window.location="/";
  }

  render() {
    const bgcolor = {backgroundColor: '#81BBE5'}
    const container = {height: 1300}
    return(
      <div>

          <header>
            <Navbar style={bgcolor} dark expand="md" scrolling fixed="top">
              <NavbarBrand href="/">
                  <strong>Techi Yogi</strong>
              </NavbarBrand>
              <NavbarToggler onClick={ this.onClick } />
              <Collapse isOpen = { this.state.collapse } navbar>
                <Nav navbar pills>
                  <NavItem active>
                      <NavLink href="/schedule">Schedule</NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink href="#">Features</NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink href="/report">Report</NavLink>
                  </NavItem>
                  <NavItem>
                    {/* <NavLink href="#">Options</NavLink> */}
                    <CreateSchedule/>
                  </NavItem>
                  <NavItem >
                  <Button color='danger' style={{marginLeft:"850px",height:"auto",width:"150px"}} onClick={this.Logout} >Logout</Button>
                </NavItem>
                </Nav>
                {/* <NavbarNav right>
                  <NavItem>
                    <NavLink to="#"><Icon fab icon="facebook-f" /></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#"><Icon fab icon="twitter" /></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#"><Icon fab icon="instagram" /></NavLink>
                  </NavItem>
                </NavbarNav> */}
              </Collapse>
            </Navbar>
          </header>
      </div>
    );
  }
}

export default Header;