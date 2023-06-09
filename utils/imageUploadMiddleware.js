const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const multer = require("multer");
const config = require("../config/firebase.config");

//Initialize a firebase application
initializeApp(config.firebaseConfigure);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

const imageUploadMiddleware = (req, res, next) => {
  upload.single("image")(req, res, async () => {
    try {
      const file = req.file;
      console.log(file, "file");
      if (!file) {
        req.body.image = "";
        next();
      } else {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(
          storage,
          `files/${dateTime + "_" + req.file.originalname}`
        );

        // Create file metadata including the content type
        const metadata = {
          contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(
          storageRef,
          req.file.buffer,
          metadata
        );
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log("File successfully uploaded.", downloadURL);
        req.body.image = downloadURL;
        next();
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
  });
};

module.exports = imageUploadMiddleware;
