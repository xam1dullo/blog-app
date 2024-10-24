// models/Blog.js

import mongoose from 'mongoose'
import slugify from 'slugify'

// const ContentSchema = new mongoose.Schema({
//     type: {
//         type: String,
//         enum: ['text', 'image'],
//         required: true
//     },
//     data: {
//         type: String,
//         required: true
//     }
// });

const ContentSchema = new mongoose.Schema({
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
});

const BlogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    topic: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    blogContent: [ContentSchema],
    likes: {
        type: Number,
        default: 0
    },
    images: [{
        type: String
    }],
    backendLink: {
        type: String
    }
});

// Slug yaratish uchun pre-save hook
BlogSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

export default mongoose.model('Blog', BlogSchema);
