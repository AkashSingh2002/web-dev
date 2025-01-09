import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Admin from './components/Admin';
import User from './components/User';
import Home from './components/Home';

function App() {
  return(
    <Router>
      <Navbar />
        <Routes >

        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        </Routes>
    </Router>
  );
}

export default App;