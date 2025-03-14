const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Media = require('../models/Media');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Upewnij się, że folder uploads istnieje
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Konfiguracja multer dla przesyłania plików
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Debug route
router.get('/test', (req, res) => {
  res.json({ message: 'Media API is working' });
});

// Pobierz wszystkie media użytkownika
router.get('/', auth, async (req, res) => {
  try {
    const media = await Media.find({ 
      user: req.user.id,
      isDeleted: false 
    }).sort({ createdAt: -1 });
    
    res.json(media);
  } catch (err) {
    console.error('Error fetching media:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Pobierz pojedyncze medium
router.get('/:id', auth, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    
    // Sprawdź czy medium istnieje
    if (!media) {
      return res.status(404).json({ message: 'Medium not found' });
    }
    
    // Sprawdź uprawnienia
    if (media.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(media);
  } catch (err) {
    console.error('Error fetching medium:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Dodaj nową notatkę
router.post('/note', auth, async (req, res) => {
  console.log('Received note data:', req.body);
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  
  try {
    const newMedia = new Media({
      user: req.user.id,
      title,
      type: 'note',
      content
    });
    
    const media = await newMedia.save();
    console.log('Saved note:', media);
    
    res.json(media);
  } catch (err) {
    console.error('Error saving note:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Dodaj nowe audio/video
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  console.log('Received upload request:', req.body);
  console.log('File:', req.file);
  
  try {
    const { title, type } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    // Sprawdź czy plik został przesłany
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const fileType = req.file.mimetype.startsWith('audio/') ? 'audio' : 'video';
    
    // Utwórz nowe medium
    const newMedia = new Media({
      user: req.user.id,
      title,
      type: type || fileType,
      fileUrl: `/uploads/${req.file.filename}`,
      publicId: req.file.filename
    });
    
    const media = await newMedia.save();
    console.log('Saved media:', media);
    
    res.json(media);
  } catch (err) {
    console.error('Error saving media:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Zaktualizuj medium
router.put('/:id', auth, async (req, res) => {
  console.log('Update request for medium:', req.params.id, req.body);
  const { title, content } = req.body;
  
  // Zbuduj obiekt aktualizacji
  const mediaFields = {};
  if (title) mediaFields.title = title;
  if (content) mediaFields.content = content;
  
  try {
    let media = await Media.findById(req.params.id);
    
    // Sprawdź czy medium istnieje
    if (!media) {
      return res.status(404).json({ message: 'Medium not found' });
    }
    
    // Sprawdź uprawnienia
    if (media.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Zaktualizuj
    media = await Media.findByIdAndUpdate(
      req.params.id,
      { $set: mediaFields },
      { new: true }
    );
    
    res.json(media);
  } catch (err) {
    console.error('Error updating medium:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Usuń medium
router.delete('/:id', auth, async (req, res) => {
  try {
    let media = await Media.findById(req.params.id);
    
    // Sprawdź czy medium istnieje
    if (!media) {
      return res.status(404).json({ message: 'Medium not found' });
    }
    
    // Sprawdź uprawnienia
    if (media.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Oznacz jako usunięte (soft delete)
    await Media.findByIdAndUpdate(
      req.params.id,
      { $set: { isDeleted: true } }
    );
    
    res.json({ message: 'Medium removed' });
  } catch (err) {
    console.error('Error deleting medium:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
