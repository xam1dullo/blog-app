// routes/contents.js
import express from 'express';
import Content from '../models/content.model.js';
import Title from '../models/title.model.js';

const router = express.Router();

// CREATE Content
router.post('/', async (req, res) => {
  try {
    const { titleSlug, text, image, likes } = req.body;

    // Title mavjudligini tekshirish
    const title = await Title.findOne({ slug: titleSlug });
    if (!title) {
      return res.status(404).json({ message: 'Title topilmadi' });
    }

    const newContent = new Content({ title: title._id, text, image, likes });
    await newContent.save();

    res.status(201).json(newContent);
  } catch (error) {
    if (error.code === 11000) { // Duplicate slug
      return res.status(400).json({ message: 'Slug must be unique' });
    }
    res.status(500).json({ message: error.message });
  }
});

// GET All Contents
router.get('/', async (req, res) => {
  try {
    const contents = await Content.find().populate('title');
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET Single Content by Slug
router.get('/:slug', async (req, res) => {
  try {
    const content = await Content.findOne({ slug: req.params.slug });
    if (!content) {
      return res.status(404).json({ message: 'Content topilmadi' });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET Contents by Title Slug
router.get('/title/:slug', async (req, res) => {
  try {
    const title = await Title.findOne({ slug: req.params.slug });
    if (!title) {
      return res.status(404).json({ message: 'Title topilmadi' });
    }

    const contents = await Content.find({ title: title._id }).populate('title');
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE Content by Slug
router.put('/:slug', async (req, res) => {
  try {
    const { text, image, likes } = req.body;

    const updatedContent = await Content.findOneAndUpdate(
      { slug: req.params.slug },
      { text, image, likes },
      { new: true, runValidators: true }
    );

    if (!updatedContent) {
      return res.status(404).json({ message: 'Content topilmadi' });
    }

    res.status(200).json(updatedContent);
  } catch (error) {
    if (error.code === 11000) { // Duplicate slug
      return res.status(400).json({ message: 'Slug must be unique' });
    }
    res.status(500).json({ message: error.message });
  }
});

// DELETE Content by Slug
router.delete('/:slug', async (req, res) => {
  try {
    const content = await Content.findOneAndDelete({ slug: req.params.slug });
    if (!content) {
      return res.status(404).json({ message: 'Content topilmadi' });
    }

    res.status(200).json({ message: 'Content o\'chirildi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
