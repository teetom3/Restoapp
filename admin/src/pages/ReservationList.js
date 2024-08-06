import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservationList.css';

const API_URL = process.env.REACT_APP_API_URL;

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/reservations`);
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await axios.patch(`${API_URL}/api/reservations/${id}/confirm`);
      setReservations(
        reservations.map((reservation) =>
          reservation._id === id ? { ...reservation, status: 'confirmed' } : reservation
        )
      );
    } catch (error) {
      console.error('Error confirming reservation:', error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.patch(`${API_URL}/api/reservations/${id}/cancel`);
      setReservations(
        reservations.map((reservation) =>
          reservation._id === id ? { ...reservation, status: 'cancelled' } : reservation
        )
      );
    } catch (error) {
      console.error('Error cancelling reservation:', error);
    }
  };

  return (
    <div className="reservation-list">
      <h2>Liste des Réservations</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Heure</th>
            <th>Nom</th>
            <th>Personnes</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{new Date(reservation.date).toLocaleDateString()}</td>
              <td>{reservation.time}</td>
              <td>{reservation.name}</td>
              <td>{reservation.numberOfPeople}</td>
              <td>{reservation.status}</td>
              <td>
                {reservation.status === 'confirmed' ? (
                  <span>Confirmé</span>
                ) : (
                  <button onClick={() => handleConfirm(reservation._id)}>Confirmer</button>
                )}
                <button onClick={() => handleCancel(reservation._id)}>Annuler</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;