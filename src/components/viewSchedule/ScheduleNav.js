import React from 'react';
import {Container, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, Nav} from 'reactstrap';
// import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
// import { BrowserRouter as Router } from 'react-router-dom';

class ScheduleNav extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
      };
      this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
        collapse: !this.state.collapse,
      });
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
                      <NavLink href="/Report">Report</NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink href="#">Features</NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink href="/dashboard">Dashboard</NavLink>
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

export default ScheduleNav;