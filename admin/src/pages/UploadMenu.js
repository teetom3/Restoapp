import React, { useState } from 'react';
import axios from 'axios';
import './UploadMenu.css';

const API_URL = process.env.REACT_APP_API_URL;

const UploadMenu = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Menu uploadé');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Échec du téléchargement du menu');
    }
  };

  return (
    <div className="menu-upload">
      <h2>Charger Menu</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Charger</button>
      </form>
    </div>
  );
};

export default UploadMenu;
