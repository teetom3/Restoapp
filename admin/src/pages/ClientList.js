import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientList.css';

const API_URL = process.env.REACT_APP_API_URL;

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/client`);
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleEmail = async (email) => {
    try {
      await axios.post(`${API_URL}/api/send-email`, { email });
      alert(`Email envoyé à ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Erreur lors de l\'envoi de l\'email');
    }
  };

  const handleEmailAll = async () => {
    try {
      await axios.post(`${API_URL}/api/send-email-all`, { emails: clients.map(client => client.email) });
      alert('Email envoyé à tous les clients');
    } catch (error) {
      console.error('Error sending email to all clients:', error);
      alert('Erreur lors de l\'envoi des emails');
    }
  };

  return (
    <div className="clients">
      <h2>Liste des Clients</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>
                <button onClick={() => handleEmail(client.email)}>Envoyer un Email</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleEmailAll}>Envoyer un Email à tous</button>
    </div>
  );
};

export default ClientList;
