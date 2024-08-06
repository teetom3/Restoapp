const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Importer les routes
const reservationRoutes = require('./routes/reservations');
const settingsRoutes = require('./routes/settings');
const uploadRoute = require('./routes/upload');
const clientRoutes = require('./routes/client')

// Utiliser les routes
app.use('/api/reservations', reservationRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload',uploadRoute);
app.use('/api/client', clientRoutes);

// Servir les fichiers téléchargés statiquement
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
