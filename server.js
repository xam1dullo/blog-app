import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import path from "node:path"
import cors from 'cors'

import blogRoutes from './routes/blogs.js';
import titleRoutes from "./routes/titles.js"
import contentRoutes from "./routes/contents.js"
import imagesRoutes from "./routes/images.js"





dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: '*' // Eslatma: Xavfsizlik uchun, production muhitida aniq origin ni belgilang
}));
app.use(morgan('dev'));
app.use(bodyParser.json());

// server.js


// Routes
app.use('/uploads', express.static(path.join(import.meta.dirname, 'uploads')));

app.use('/api/blogs', blogRoutes);
app.use('/api/titles', titleRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/images', imagesRoutes);


// MongoDB ulanishi
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB ga ulanish muvaffaqiyatli'))
    .catch(err => console.error('MongoDB ulanish xatosi:', err));

// Serverni ishga tushurish
// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 80


// HTTPS serverni ishga tushirish


app.listen(PORT, () => {
  console.log('HTTP server 80-portda ishga tushdi '+PORT);
});
