import React, { useState } from 'react';
import axios from 'axios';
import './ComposeEmail.css';

const API_URL = process.env.REACT_APP_API_URL;

const ComposeEmail = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/send-email`, { to, subject, message });
      alert(`Email envoyé à ${to} avec l'objet: ${subject}`);
      setTo('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Erreur lors de l\'envoi de l\'email');
    }
  };

  return (
    <div className="compose-email">
      <h2>Composer un Email</h2>
      <form onSubmit={handleSendEmail}>
        <div>
          <label htmlFor="to">À:</label>
          <input 
            type="email" 
            id="to" 
            value={to} 
            onChange={(e) => setTo(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="subject">Objet:</label>
          <input 
            type="text" 
            id="subject" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea 
            id="message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          ></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default ComposeEmail;
