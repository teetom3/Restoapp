const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
const menuImagePath = path.join(uploadDir, 'menu.jpg');

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Supprimer l'ancienne image si elle existe
    if (fs.existsSync(menuImagePath)) {
      fs.unlinkSync(menuImagePath);
    }
    cb(null, 'menu.jpg');
  },
});

const upload = multer({ storage: storage });

// Route pour télécharger l'image
router.post('/', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({ message: 'Menu uploadé avec succès' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Échec du téléchargement du menu' });
  }
});

// Route pour récupérer l'image
router.get('/latest-menu-image', (req, res) => {
  if (fs.existsSync(menuImagePath)) {
    res.sendFile(menuImagePath);
  } else {
    res.status(404).json({ message: 'Menu image not found' });
  }
});

module.exports = router;
