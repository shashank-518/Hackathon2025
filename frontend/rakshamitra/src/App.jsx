import React,{useEffect , useState} from "react"
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import './index.css';
import Fraud from "./pages/Fraud.jsx";
import Tip from "./pages/Tip.jsx";
import Safety from "./pages/Safety.jsx";
import AI from "./pages/AI.jsx";
import Fire from "./pages/Fire.jsx";


function App() {

  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   fetch('http://localhost:3000/')
  //     .then(res => res.json())
  //     .then(data => setMessage(data.message))
  //     .catch(err => console.error("Hello"));
  // }, []);
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Fraud" element={<Fraud/>} />
      <Route path="/Tip" element={<Tip/>} />
      <Route path="/Safety" element={<Safety/>} />
      <Route path="/AI" element={<AI/>} />
      <Route path="/Call" element={<AI/>} />
      <Route path="/Notify" element={<AI/>} />
      <Route path="/Location" element={<Fire/>} />


    </Routes>

  )

  
}

export default App
