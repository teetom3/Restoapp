import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Setting.css';

const API_URL = process.env.REACT_APP_API_URL;

const Setting = () => {
  const [settings, setSettings] = useState(null);
  const [draftSettings, setDraftSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/settings`);
      setSettings(response.data || {});
      setDraftSettings(response.data || {});  // Initialise également le brouillon
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleChange = (e, day, type, prop) => {
    const value = prop === 'openHours' ? e.target.checked : parseInt(e.target.value);
    setDraftSettings((prevSettings) => ({
      ...prevSettings,
      [prop]: {
        ...prevSettings[prop],
        [day]: {
          ...prevSettings[prop][day],
          [type]: value,
        },
      },
    }));
  };

  const toggleAutoAccept = () => {
    setDraftSettings((prevSettings) => ({
      ...prevSettings,
      autoAccept: !prevSettings.autoAccept
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/api/settings`, draftSettings);
      setSettings(draftSettings);  // Met à jour l'état principal avec le brouillon
      alert('Settings saved');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  if (!settings) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="settings">
      <h2>Paramètres</h2>
      {draftSettings.openHours && Object.keys(draftSettings.openHours).map((day) => (
        <div key={day}>
          <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
          <label>
            <input
              type="checkbox"
              checked={draftSettings.openHours[day].lunch}
              onChange={(e) => handleChange(e, day, 'lunch', 'openHours')}
            />
            Midi
          </label>
          <input
            type="number"
            value={draftSettings.capacity[day].lunch}
            onChange={(e) => handleChange(e, day, 'lunch', 'capacity')}
          />
          <label>
            <input
              type="checkbox"
              checked={draftSettings.openHours[day].dinner}
              onChange={(e) => handleChange(e, day, 'dinner', 'openHours')}
            />
            Soir
          </label>
          <input
            type="number"
            value={draftSettings.capacity[day].dinner}
            onChange={(e) => handleChange(e, day, 'dinner', 'capacity')}
          />
        </div>
      ))}
      <div>
        <label>
          Autoconfirmation des réservations:
          <input
            type="checkbox"
            checked={draftSettings.autoAccept}
            onChange={toggleAutoAccept}
          />
        </label>
      </div>
      <button onClick={handleSave}>Sauvegarder</button>
    </div>
  );
};

export default Setting;
