import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/reservations`);
        const now = new Date();
        const upcomingReservations = response.data
          .filter(reservation => new Date(reservation.date) >= now)
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setReservations(upcomingReservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="dashboard">
      <h2>Tableau de Bord</h2>
      <p>Bienvenue dans l'interface d'administration.</p>
      <h3>Réservations à venir</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Heure</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Nombre de personnes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation._id}>
              <td>{new Date(reservation.date).toLocaleDateString()}</td>
              <td>{reservation.time}</td>
              <td>{reservation.name}</td>
              <td>{reservation.email}</td>
              <td>{reservation.numberOfPeople}</td>
              <td>
                <button>Confirmer</button>
                <button>Annuler</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
