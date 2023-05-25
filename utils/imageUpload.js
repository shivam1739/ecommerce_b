const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "4000000" },
  fileFilter: (req, file, cb) => {
    console.log(req, file, "==========ffffffffffffffff=========");
    const fileTypes = /jpeg|jpg|png|gif|JPEG|JPG|PNG|GIF/;
    const mimeType = fileTypes.test(file.mimetype);
    // const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

module.exports = { upload, storage };
