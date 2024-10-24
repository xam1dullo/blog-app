import express  from 'express';
import Title  from '../models/title.model.js';
import Content  from '../models/content.model.js';

const router =   express.Router();
router.post('/', async (req, res) => {
  try {
    const { title, status } = req.body;

    const newTitle = new Title({ title, status });
    await newTitle.save();

    res.status(201).json(newTitle);
  } catch (error) {
    if (error.code === 11000) { // Duplicate slug
      return res.status(400).json({ message: 'Slug must be unique' });
    }
    res.status(500).json({ message: error.message });
  }
});

// GET All Titles
router.get('/', async (req, res) => {
  try {
    const titles = await Title.find();
    res.status(200).json(titles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET Single Title by Slug
router.get('/:slug', async (req, res) => {
  try {
    const title = await Title.findOne({ slug: req.params.slug });
    if (!title) {
      return res.status(404).json({ message: 'Title topilmadi' });
    }
    res.status(200).json(title);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE Title by Slug
router.put('/:slug', async (req, res) => {
  try {
    const { title, status } = req.body;

    const updatedTitle = await Title.findOneAndUpdate(
      { slug: req.params.slug },
      { title, status },
      { new: true, runValidators: true }
    );

    if (!updatedTitle) {
      return res.status(404).json({ message: 'Title topilmadi' });
    }

    res.status(200).json(updatedTitle);
  } catch (error) {
    if (error.code === 11000) { // Duplicate slug
      return res.status(400).json({ message: 'Slug must be unique' });
    }
    res.status(500).json({ message: error.message });
  }
});

// DELETE Title by Slug
router.delete('/:slug', async (req, res) => {
  try {
    const title = await Title.findOneAndDelete({ slug: req.params.slug });
    if (!title) {
      return res.status(404).json({ message: 'Title topilmadi' });
    }

    // Bog'liq Contentsni o'chirish
    await Content.deleteMany({ title: title._id });

    res.status(200).json({ message: 'Title va unga bog\'liq Contents o\'chirildi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
