import React,{useEffect , useState} from "react"
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Login from "./components/login";
import './index.css';


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
      <Route path="/Login" element={<Login/>} />

    </Routes>

  )

  
}

export default App
