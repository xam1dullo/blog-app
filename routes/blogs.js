// routes/blog.js
import  express from 'express';

const router = express.Router();

import Title from '../models/title.model.js';


router.get('/', async (req, res) => {
    try {
        const blogs = await Title.aggregate([
            { $match: { status: 'active' } },
            {
                $lookup: {
                    from: 'contents', // Collection name in MongoDB (usually lowercase plural)
                    localField: '_id',
                    foreignField: 'title',
                    as: 'contents'
                }
            }
        ]);
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET /api/blog/:slug - Retrieve a single blog by its slug with contents using aggregation
router.get('/:slug', async (req, res) => {
    try {
        const blog = await Title.aggregate([
            { $match: { slug: req.params.slug, status: 'active' } },
            {
                $lookup: {
                    from: 'contents',
                    localField: '_id',
                    foreignField: 'title',
                    as: 'contents'
                }
            }
        ]);
        if (blog.length === 0) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog[0]);
    } catch (error) {
        console.error('Error fetching the blog:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// router.get('/', async (req, res) => {
//     try {
//         const blogs = await Title.find({ status: 'active' })
//             .populate({
//                 path: 'contents',
//                 strictPopulate: false // Disable strictPopulate for this populate call
//             })
//             .exec();
//         res.status(200).json(blogs);
//     } catch (error) {
//         console.error('Error fetching blogs:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// // GET /api/blog/:slug - Retrieve a single blog by its slug with contents
// router.get('/:slug', async (req, res) => {
//     try {
//         const blog = await Title.findOne({ slug: req.params.slug, status: 'active' })
//             .populate({
//                 path: 'contents',
//                 strictPopulate: false // Disable strictPopulate for this populate call
//             })
//             .exec();
//         if (!blog) {
//             return res.status(404).json({ message: 'Blog not found' });
//         }
//         res.status(200).json(blog);
//     } catch (error) {
//         console.error('Error fetching the blog:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });
// GET /api/blog - Barcha bloglarni olish (har bir blogda title va contents)
// router.get('/', async (req, res) => {
//     try {
//         const blogs = await Title.find({ status: 'active' })
//             .populate('contents') // Populate the virtual 'contents' field
//             .exec();
//         res.status(200).json(blogs);
//     } catch (error) {
//         console.error('Error fetching blogs:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });


// // GET /api/blog/:slug - Bitta blogni slug orqali olish (title va contents)
// router.get('/:slug', async (req, res) => {
//     try {
//         const blog = await Title.findOne({ slug: req.params.slug, status: 'active' })
//             .populate('contents') // Populate the virtual 'contents' field
//             .exec();
//         if (!blog) {
//             return res.status(404).json({ message: 'Blog not found' });
//         }
//         res.status(200).json(blog);
//     } catch (error) {
//         console.error('Error fetching the blog:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

export default router;
