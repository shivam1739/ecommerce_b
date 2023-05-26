// const multer = require("multer");
// const path = require("path");
// const firebaseConfigure = require("../config/firebase.config");

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "Images");
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   },
// // });

// // const upload = multer({
// //   storage: storage,
// //   limits: { fileSize: "4000000" },
// //   fileFilter: (req, file, cb) => {
// //     console.log(req, file, "==========ffffffffffffffff=========");
// //     const fileTypes = /jpeg|jpg|png|gif|JPEG|JPG|PNG|GIF/;
// //     const mimeType = fileTypes.test(file.mimetype);
// //     const extname = fileTypes.test(path.extname(file.originalname));

// //     if (mimeType && extname) {
// //       return cb(null, true);
// //     }
// //     cb("Give proper files formate to upload");
// //   },
// // }).single("image");

// // module.exports = { upload, storage };

// const firebase = require("firebase");
// require("firebase/storage");

// // const firebaseConfig = { firebaseConfigure };

// // firebase.initializeApp(firebaseConfig);

// // const storage = firebase.storage();
// // const storageRef = storage.ref();

// // const multerUpload = multer({
// //   storage: multer.memoryStorage(),
// //   limits: { fileSize: 4000000 },
// //   fileFilter: (req, file, cb) => {
// //     const fileTypes = /jpeg|jpg|png|gif|JPEG|JPG|PNG|GIF/;
// //     const mimeType = fileTypes.test(file.mimetype);
// //     const extname = fileTypes.test(path.extname(file.originalname));

// //     if (mimeType && extname) {
// //       return cb(null, true);
// //     }
// //     cb("Provide proper file formats to upload");
// //   },
// // });

// // const uploadToFirebase = (file) => {
// //   return new Promise((resolve, reject) => {
// //     const fileRef = storageRef.child(
// //       Date.now() + path.extname(file.originalname)
// //     );
// //     const uploadTask = fileRef.put(file.buffer);

// //     uploadTask.on(
// //       "state_changed",
// //       (snapshot) => {},
// //       (error) => {
// //         reject(error);
// //       },
// //       () => {
// //         uploadTask.snapshot.ref
// //           .getDownloadURL()
// //           .then((downloadURL) => {
// //             resolve(downloadURL);
// //           })
// //           .catch((error) => {
// //             reject(error);
// //           });
// //       }
// //     );
// //   });
// // };

// // const firebaseStorageMiddleware = (req, res, next) => {
// //   multerUpload.single("image")(req, res, (error) => {
// //     if (error instanceof multer.MulterError) {
// //       return res.status(400).json({ error: "File upload error" });
// //     } else if (error) {
// //       return res.status(400).json({ error: error.message });
// //     }

// //     if (!req.file) {
// //       return res.status(400).json({ error: "No file provided" });
// //     }

// //     uploadToFirebase(req.file)
// //       .then((downloadURL) => {
// //         req.fileUrl = downloadURL;
// //         next();
// //       })
// //       .catch((error) => {
// //         return res.status(500).json({ error: "Failed to upload file" });
// //       });
// //   });
// // };

// // module.exports = { firebaseStorageMiddleware };
