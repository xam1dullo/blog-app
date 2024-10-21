const express = require('npm:express');
const mongoose = require('npm:mongoose');
const dotenv = require('npm:dotenv');
const morgan = require('npm:morgan');
const bodyParser = require('npm:body-parser');
const path = require("node:path")
const cors = require('npm:cors');

const blogRoutes = require('./routes/blogs');
const titleRoutes = require("./routes/titles")
const contentRoutes = require("./routes/contents")
const imagesRoutes = require("./routes/images")

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
