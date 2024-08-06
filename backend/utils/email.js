const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirmation de Réservation',
    text: 'Votre réservation a été confirmée.',
  };

  await transporter.sendMail(mailOptions);
};

const sendEmailToAll = async (emails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    bcc: emails,
    subject: 'Information Importante de Notre Restaurant',
    text: 'Nous avons des nouvelles importantes pour vous.',
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail, sendEmailToAll };
