const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');

// Default settings values
const defaultSettings = {
  autoAccept: false,
  openHours: {
    monday: { lunch: false, dinner: false },
    tuesday: { lunch: false, dinner: false },
    wednesday: { lunch: false, dinner: false },
    thursday: { lunch: false, dinner: false },
    friday: { lunch: false, dinner: false },
    saturday: { lunch: false, dinner: false },
    sunday: { lunch: false, dinner: false },
  },
  capacity: {
    monday: { lunch: 0, dinner: 0 },
    tuesday: { lunch: 0, dinner: 0 },
    wednesday: { lunch: 0, dinner: 0 },
    thursday: { lunch: 0, dinner: 0 },
    friday: { lunch: 0, dinner: 0 },
    saturday: { lunch: 0, dinner: 0 },
    sunday: { lunch: 0, dinner: 0 },
  }
};

// Récupérer les paramètres
router.get('/', async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      // If no settings found, create default settings
      settings = new Setting(defaultSettings);
      await settings.save();
    }
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mettre à jour les paramètres
router.put('/', async (req, res) => {
  const { autoAccept, openHours, capacity } = req.body;

  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = new Setting({ autoAccept, openHours, capacity });
      await settings.save();
    } else {
      settings.autoAccept = autoAccept ?? settings.autoAccept;
      settings.openHours = openHours ?? settings.openHours;
      settings.capacity = capacity ?? settings.capacity;
      await settings.save();
    }

    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
