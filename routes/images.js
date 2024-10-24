import express from 'express'
const router = express.Router();
import upload from "../common/multer.js"
import ImageKit from 'imagekit';

var imagekit = new ImageKit({
    publicKey : "public_AbJsS0yX59v++kntkBerxYCKGcA=",
    privateKey : "private_xmiVx3RMb63vREtJxdbNcmXvzQw=",
    urlEndpoint : "https://ik.imagekit.io/tyzwuzsdv"
});

router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.'); req.file.filename
        return;
    }

        const file = req.file;
    const fileBase64 = file.buffer.toString('base64');


 imagekit.upload({
    file: fileBase64, // base64 string
    fileName: file.originalname, // File name
    folder: '/uploads', // Optional
    useUniqueFileName: true
  })
    .then(response => {
      console.log('File uploaded successfully:', response);
      res.json({
        success: true,
        fileUrl: response.url
      });
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    });
});


export default router;
