import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reagents from './pages/Reagents'
import Recipe from './pages/Recipe'
// import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="SS14-recipes/" element={<Reagents />} />
        <Route path="SS14-recipes/Home" element={<Reagents />} />
        <Route path="SS14-recipes/recipe/:id" element={<Recipe/>} />
      </Routes>
    </Router>
  );
}

export default App;
