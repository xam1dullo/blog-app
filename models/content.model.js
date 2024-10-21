const mongoose = require('npm:mongoose');
const slugify = require('npm:slugify');


const ContentSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Title',
    required: true
  },
  text: {
    type: String,
    required: false,
    trim: true
  },
  image: {
    type: String, // Rasm URL
    required: false,
    trim: true
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Content', ContentSchema);
