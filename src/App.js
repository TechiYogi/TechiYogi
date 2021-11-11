import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import About from './About';
import ViewSession from './components/YogaSession/ViewSession';
import Cari from './components/Dashboard/Cari';


function App() {
  
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/session' element={<ViewSession/>} />
      </Routes> 
      </Router>
    </div>
    
  );
}

export default App;
