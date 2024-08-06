import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import ReservationButton from './components/ReservationButton';
import ReservationForm from './components/ReservationForm';
import Menu from './components/Menu';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

const App = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const handleReservationClick = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
        </Routes>
        <ReservationButton onClick={handleReservationClick} />
        {isFormVisible && <ReservationForm />}
      </div>
    </Router>
  );
};

export default App;



