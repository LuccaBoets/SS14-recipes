import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Reagents from './pages/Reagents'
// import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Reagents" element={<Reagents/>} />
      </Routes>
    </Router>
  );
}

export default App;