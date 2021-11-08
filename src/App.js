import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import About from './About';
import ViewSession from './components/YogaSession/ViewSession';
import Cari from './components/Dashboard/Cari';
import EndSessionModal from './components/YogaSession/EndSessionModal';
import Report from './components/Report/Report';


function App() {
  
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path="/" element={<div><LandingPage/><About/></div>} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/session' element={<ViewSession/>} />
      <Route path='/test' element={<EndSessionModal/>} />
      <Route path='/report' element={<Report/>} />
      
      </Routes> 
      </Router>
    </div>
    
  );
}

export default App;
