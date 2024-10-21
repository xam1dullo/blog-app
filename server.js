import express from 'npm:express'
import mongoose from 'npm:mongoose'
import dotenv from 'npm:dotenv'
import morgan from 'npm:morgan'
import bodyParser from 'npm:body-parser'
import path from "node:path"
import cors from 'npm:cors'

import blogRoutes from './routes/blogs';
import titleRoutes from "./routes/titles"
import contentRoutes from "./routes/contents"
import imagesRoutes from "./routes/images"

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/blogs', blogRoutes);
app.use('/api/titles', titleRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/images', imagesRoutes);


// MongoDB ulanishi
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB ga ulanish muvaffaqiyatli'))
    .catch(err => console.error('MongoDB ulanish xatosi:', err));

// Serverni ishga tushurish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlamoqda`);
});
