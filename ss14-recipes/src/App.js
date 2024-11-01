import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Reagents from './pages/Reagents'
import Recipe from './pages/Recipe'
// import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Reagents />} />
        <Route path="/:recipeName" element={<Recipe/>} />
      </Routes>
    </Router>
  );
}

export default App;
