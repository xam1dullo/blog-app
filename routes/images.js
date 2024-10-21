import express from 'npm:express'
const router = express.Router();
import upload from "../common/multer.js"



router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.'); req.file.filename
        return;
    }

    res.status(200).send(`http://3.68.219.212:3000/uploads/${req.file.filename}`);
});


export default router;
