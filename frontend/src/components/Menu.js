import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Menu.css';

const Menu = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchMenuImage = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/uploads/menu.jpg`;
        console.log('Fetching menu image from:', apiUrl); // Ajoutez cette ligne pour vérifier l'URL
        const response = await axios.get(apiUrl, { responseType: 'blob' });
        const url = URL.createObjectURL(response.data);
        setImageUrl(url);
      } catch (error) {
        console.error('Failed to fetch menu image:', error);
        setImageUrl(''); // Gérer l'absence de fichier ou les erreurs de réseau
      }
    };

    fetchMenuImage();
  }, []);

  return (
    <div className="menu">
      <h2>Notre Carte</h2>
      {imageUrl ? <img src={imageUrl} alt="La carte du restaurant" className="menu-image"/> : <p>Chargement de l'image...</p>}
    </div>
  );
};

export default Menu;



