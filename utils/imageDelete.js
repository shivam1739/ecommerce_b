const { getStorage, ref, deleteObject } = require("firebase/storage");
const storage = getStorage();

const imageDelete = async (req, res) => {
  // Create a reference to the file to delete
  const desertRef = ref(storage, req.body.image);

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
