import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import About from './About';
import ViewSession from './components/YogaSession/ViewSession';
import MoveNet from './components/YogaSession/Model/MoveNet';
import Cari from './components/Dashboard/Cari';
//import firebase from './firebase';




function App() {
  
  return (
    <div className="App">
      { <LandingPage/> }
      { <Dashboard/> }
      {/* <MoveNet/> */}
    {/* <About /> */}
    {/*<ViewSession/>*/}
    {/* <Cari /> */}
    </div>
    
  );
}

export default App;
