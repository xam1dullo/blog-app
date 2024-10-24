import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import path from "node:path"
import cors from 'cors'
import https from 'https'
import http from 'http'
import fs from 'node:fs'

import blogRoutes from './routes/blogs.js';
import titleRoutes from "./routes/titles.js"
import contentRoutes from "./routes/contents.js"
import imagesRoutes from "./routes/images.js"




const options = {
  key: fs.readFileSync('/home/khamidullo/.ssh/arslonbek/key.pem'),
  cert: fs.readFileSync('/home/khamidullo/.ssh/arslonbek/cert.pem')
};

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
const PORT = process.env.PORT || "8000";



// HTTPS serverni ishga tushirish
https.createServer(options, app).listen(4444, () => {
  console.log('HTTPS server 443-portda ishga tushdi');
});


// HTTP'dan HTTPS'ga yo'naltirish
http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(PORT, () => {
  console.log('HTTP server 80-portda ishga tushdi '+PORT);
});
