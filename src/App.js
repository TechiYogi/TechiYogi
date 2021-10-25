import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import About from './About';


function App() {
  return (
    <div className="App">
      <LandingPage/>
      {/* <Dashboard/> */}
    <About />
    </div>
    
  );
}

export default App;
