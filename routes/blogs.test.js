// routes/blogs.js

import express from 'express'
import multer from 'multer'
import Blog from '../models/blog.js'

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        cb(null, uniqueSuffix + "." + file.originalname.split(".")[file.originalname.split(".").length - 1])
    }
})
const upload = multer({ storage: storage })



router.post
    ('/upload', upload.single('image'), (req, res) => {
        if (!req.file) {
            res.status(400).send('No file uploaded.'); req.file.filename
            return;
        }

        res.status(200).send(`http://3.68.219.212:3000/uploads/${req.file.filename}`);

    });


router.post('/:id/images', upload.single('image'), async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog topilmadi' });
        }

        // Yuklangan rasmni blog postiga qo'shish
        blog.images.push(`http://localhost:5000/uploads/${req.file.filename}`);
        await blog.save();
        res.json(blog);
    } catch (err) {
        console.error(err);
        if (err instanceof multer.MulterError) {
            // Multer xatoliklarini boshqarish
            return res.status(400).json({ message: err.message });
        } else if (err.message === 'Faqat rasm fayllari ruxsat etilgan') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const blog = new Blog(req.body);
        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).json({ message: 'Blog topilmadi' });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog topilmadi' });
        }
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog topilmadi' });
        }
        res.json({ message: 'Blog o\'chirildi' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/:id/like', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog topilmadi' });
        }
        blog.likes += 1;
        await blog.save();
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
