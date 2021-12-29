import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import GoogleLogin from "react-google-login";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import Dashboard from "../Dashboard/Dashboard";
const email = "";
const items = [
  {
    src: "images/yoga_themes/home1.jpg",
    altText: "Slide 1",
    caption: "Slide 1",
  },
  {
    src: "images/yoga_themes/home2.png",
    altText: "Slide 2",
    caption: "Slide 2",
  },
  {
    src: "images/yoga_themes/home3.jpg",
    altText: "Slide 3",
    caption: "Slide 3",
  },
];

class Caro extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} height="450" width="550" />
          {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl direction="prev" onClickHandler={this.previous} />
        <CarouselControl direction="next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Techi Yogi</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Features</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Contact Us</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const LandingPage = (props) => {
  const responseGoogle = (response) => {
    console.log(response.profileObj);
  };
  // const [isUserSignedIn,setIsUserSignedIn]= useState(false);
  // if(isUserSignedIn === false){
  //   return(
  //     //////s
  //   )
  //   }
  //   else{
  //     return(
  //       <LandingPage/>
  //     )
  //   }

  const SignInWithFirebase = () => {
    // alert("hello");
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((re) => {
        localStorage.setItem("email", auth.currentUser.email);
        
        //<Route path="/dashboard" element={<Dashboard />} />
        //console.log(re);
        window.location = '/dashboard';
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <br />

      <div className="container-fluid" style={{ background: "lightskyblue" }}>
        <div className="row">
          <div className="col-md-5">
            <img src='/images/yoga_themes/logo.png' style={{height:400, width: 400}}/>
            <Button color="success"  onClick={SignInWithFirebase} style={{display:'block', margin:'auto', marginTop:'-25px', marginBottom:'10px'}} >
              Login with Google{" "}
            </Button>
            {/* <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Login with Google"
                            onClick={SignInWithFirebase}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                          >  */}
          </div>
          <div className="col-md-7">
            <Caro />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
