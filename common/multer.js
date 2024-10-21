const multer = require('npm:multer');


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


export default upload