const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const { sendEmail, sendEmailToAll } = require('../utils/email'); // Assurez-vous d'avoir ces fonctions

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send email to a client
router.post('/send-email', async (req, res) => {
  const { email } = req.body;
  try {
    await sendEmail(email);
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send email to all clients
router.post('/send-email-all', async (req, res) => {
  const { emails } = req.body;
  try {
    await sendEmailToAll(emails);
    res.json({ message: 'Emails sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
