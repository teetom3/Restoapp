import React, { useState } from 'react';
import '../ReservationForm.css';
import axios from 'axios';

const ReservationForm = () => {
  const [numberOfPeople, setNumberOfPeople] = useState(2); // Utilisez un nombre au lieu de chaîne
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Supposant que vous ajoutiez le champ email

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/reservations`, {
        name,
        numberOfPeople,
        date,
        time,
        email
      });
      alert(`Reservation confirmed for ${numberOfPeople} people on ${date} at ${time}`);
    } catch (error) {
      console.error('Error making reservation:', error);
      alert('Failed to make reservation');
    }
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <label>
        People:
        <select value={numberOfPeople} onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}>
          <option value="2">2 people</option>
          <option value="4">4 people</option>
          <option value="6">6 people</option>
        </select>
      </label>
      <label>
        Nom :
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        Time:
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </label>
      <button type="submit">BOOK NOW</button>
    </form>
  );
};

export default ReservationForm;
