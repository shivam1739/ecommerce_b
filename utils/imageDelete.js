const { getStorage, ref, deleteObject } = require("firebase/storage");
const { initializeApp } = require("firebase/app");

const config = require("../config/firebase.config");

//Initialize a firebase application
initializeApp(config.firebaseConfigure);

const storage = getStorage();

const imageDelete = async (image) => {
  // Create a reference to the file to delete
  const desertRef = ref(storage, image);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
      console.log("File deleted successfully");
      return;
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error);
      return;
    });
};
module.exports = imageDelete;
