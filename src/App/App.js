import './App.css';
import {Routes,Route,useLocation} from 'react-router-dom'
import Header from '../Components/Header/Header'
import Home from '../Components/Pages/Home/Home';
import Projects from '../Components/Pages/Projects/Projects';
import Contact from '../Components/Pages/Contact/Contact';
import About from '../Components/Pages/About/About';

const App=() =>{
  const location = useLocation();
  return (
    <div className="App">
          <Header/>
          <div>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />}/>
              <Route path="/About" element={<About />}/>
              <Route path="/Projects" element={<Projects />}/>
              <Route path="/Contact" element={<Contact />}/>
            </Routes>
          </div>
    </div>
  );
}

export default App;
