const express = require('express');
const router = express.Router();
const { sendEmail } = require('../utils/email');

// Send email to a specific address
router.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;
  try {
    await sendEmail(to, subject, message);
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
