import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ReservationList from './pages/ReservationList';
import Setting from './pages/Setting';
import UploadMenu from './pages/UploadMenu';
import ClientList from './pages/ClientList';
import ComposeEmail from './pages/ComposeEmail';
import Login from './pages/Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reservations" element={<ReservationList />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/upload-menu" element={<UploadMenu />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/compose-email" element={<ComposeEmail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
