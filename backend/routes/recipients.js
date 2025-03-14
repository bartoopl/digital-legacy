const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Recipient = require('../models/Recipient');
const Media = require('../models/Media');

// Pobierz wszystkich odbiorców użytkownika
router.get('/', auth, async (req, res) => {
  try {
    const recipients = await Recipient.find({ 
      user: req.user.id,
      isDeleted: false 
    }).sort({ name: 1 });
    
    res.json(recipients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Pobierz pojedynczego odbiorcę
router.get('/:id', auth, async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.params.id).populate('media');
    
    // Sprawdź czy odbiorca istnieje
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    
    // Sprawdź uprawnienia
    if (recipient.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(recipient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Dodaj nowego odbiorcę
router.post('/', auth, async (req, res) => {
  const { name, email, phone, relationship, personalMessage } = req.body;
  
  // Sprawdź czy pole email jest poprawne
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Valid email is required' });
  }
  
  try {
    // Sprawdź czy odbiorca o takim emailu już istnieje dla tego użytkownika
    const existingRecipient = await Recipient.findOne({ 
      user: req.user.id, 
      email,
      isDeleted: false
    });
    
    if (existingRecipient) {
      return res.status(400).json({ message: 'Recipient with this email already exists' });
    }
    
    const newRecipient = new Recipient({
      user: req.user.id,
      name,
      email,
      phone,
      relationship,
      personalMessage
    });
    
    const recipient = await newRecipient.save();
    
    res.json(recipient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Zaktualizuj odbiorcę
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, relationship, personalMessage } = req.body;
  
  // Zbuduj obiekt aktualizacji
  const recipientFields = {};
  if (name) recipientFields.name = name;
  if (email) recipientFields.email = email;
  if (phone !== undefined) recipientFields.phone = phone;
  if (relationship !== undefined) recipientFields.relationship = relationship;
  if (personalMessage !== undefined) recipientFields.personalMessage = personalMessage;
  
  try {
    let recipient = await Recipient.findById(req.params.id);
    
    // Sprawdź czy odbiorca istnieje
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    
    // Sprawdź uprawnienia
    if (recipient.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Sprawdź czy zmieniamy email i czy nowy email nie jest już używany
    if (email && email !== recipient.email) {
      const existingRecipient = await Recipient.findOne({ 
        user: req.user.id, 
        email,
        _id: { $ne: req.params.id },
        isDeleted: false
      });
      
      if (existingRecipient) {
        return res.status(400).json({ message: 'Recipient with this email already exists' });
      }
    }
    
    // Zaktualizuj
    recipient = await Recipient.findByIdAndUpdate(
      req.params.id,
      { $set: recipientFields },
      { new: true }
    );
    
    res.json(recipient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Usuń odbiorcę
router.delete('/:id', auth, async (req, res) => {
  try {
    let recipient = await Recipient.findById(req.params.id);
    
    // Sprawdź czy odbiorca istnieje
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    
    // Sprawdź uprawnienia
    if (recipient.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Oznacz jako usunięty (soft delete)
    await Recipient.findByIdAndUpdate(
      req.params.id,
      { $set: { isDeleted: true } }
    );
    
    res.json({ message: 'Recipient removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Przypisz/odłącz medium do/od odbiorcy
router.put('/:id/media/:mediaId', auth, async (req, res) => {
  try {
    // Sprawdź czy odbiorca istnieje
    const recipient = await Recipient.findById(req.params.id);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    
    // Sprawdź uprawnienia do odbiorcy
    if (recipient.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Sprawdź czy medium istnieje
    const media = await Media.findById(req.params.mediaId);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    
    // Sprawdź uprawnienia do medium
    if (media.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    const { assign } = req.body;
    
    if (assign) {
      // Dodaj medium do odbiorcy jeśli jeszcze nie ma
      if (!recipient.media.includes(req.params.mediaId)) {
        recipient.media.push(req.params.mediaId);
      }
      
      // Dodaj odbiorcę do medium jeśli jeszcze nie ma
      if (!media.recipients.includes(req.params.id)) {
        media.recipients.push(req.params.id);
      }
    } else {
      // Usuń medium z odbiorcy
      recipient.media = recipient.media.filter(
        id => id.toString() !== req.params.mediaId
      );
      
      // Usuń odbiorcę z medium
      media.recipients = media.recipients.filter(
        id => id.toString() !== req.params.id
      );
    }
    
    await recipient.save();
    await media.save();
    
    res.json({ recipient, media });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
