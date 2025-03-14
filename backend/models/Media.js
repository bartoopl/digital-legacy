const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['audio', 'video', 'note'],
    required: true
  },
  content: {
    type: String, // For notes, will contain the formatted text
    default: ''
  },
  fileUrl: {
    type: String, // For audio/video, will contain Cloudinary URL
    default: ''
  },
  publicId: {
    type: String, // Cloudinary public ID for deletion
    default: ''
  },
  duration: {
    type: Number, // Duration in seconds for audio/video
    default: 0
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipient'
  }],
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Media', MediaSchema);
