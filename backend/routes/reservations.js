const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Setting = require('../models/Setting');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReservationNotification = (reservation) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // l'email du gérant
      subject: 'Nouvelle demande de réservation',
      text: `Vous avez une nouvelle demande de réservation :
      Nom: ${reservation.name}
      Email: ${reservation.email}
      Date: ${reservation.date}
      Heure: ${reservation.time}
      Nombre de personnes: ${reservation.numberOfPeople}
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Email sent: ' + info.response);
      });
    };


// Fonction pour envoyer un email de confirmation
const sendConfirmationEmail = (reservation) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: reservation.email,
    subject: 'Confirmation de Réservation',
    text: `Votre réservation pour le ${reservation.date} à ${reservation.time} a été confirmée.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

// Créer une nouvelle réservation
router.post('/', async (req, res) => {
    const { name, email, date, time, numberOfPeople } = req.body;
    const reservationDate = new Date(date);
    const dayOfWeek = reservationDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const serviceType = (time.includes('AM') || time.includes('am') || parseInt(time.split(':')[0]) < 12) ? 'lunch' : 'dinner';
  
    try {
      const settings = await Setting.findOne();
  
      // Vérifiez si le restaurant est ouvert pour ce service
      if (!settings.openHours[dayOfWeek][serviceType]) {
        return res.status(400).json({ error: "Le restaurant est fermé pendant ce service." });
      }
  
      // Compter les réservations existantes pour ce jour et ce service
      const existingReservations = await Reservation.countDocuments({
        date: reservationDate,
        time,
      });
  
      // Vérifiez si le restaurant a des places disponibles
      if (existingReservations + numberOfPeople > settings.capacity[dayOfWeek][serviceType]) {
        return res.status(400).json({ error: "Le restaurant est complet pour ce service." });
      }
  
      // Création de la réservation avec le statut approprié basé sur l'autoAccept
      const reservation = new Reservation({
        name,
        email,
        date,
        time,
        numberOfPeople,
        status: settings.autoAccept ? 'confirmed' : 'pending'
      });
  
     
      await reservation.save();
  
      // Envoi d'email de confirmation si autoAccept est activé
      if (settings.autoAccept) {
        sendConfirmationEmail(reservation) 
      }

      sendReservationNotification(reservation);
  
      res.status(201).json(reservation);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Récupérer toutes les réservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Confirmer une réservation
router.patch('/:id/confirm', async (req, res) => {
    try {
      const reservation = await Reservation.findByIdAndUpdate(
        req.params.id,
        { status: 'confirmed' }, // Mise à jour du champ 'status' à 'confirmed'
        { new: true }
      );
  
      if (reservation) {
        sendConfirmationEmail(reservation); // Envoyer un email de confirmation si la mise à jour est réussie
        res.status(200).json(reservation);
      } else {
        res.status(404).json({ message: 'Réservation non trouvée' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Annuler une réservation
router.delete('/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Réservation annulée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
