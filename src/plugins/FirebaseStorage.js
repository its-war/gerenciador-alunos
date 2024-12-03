import firebaseApp from "@/plugins/firebaseApp";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

export default class FirebaseStorage {
  constructor() {
    this.storage = getStorage(firebaseApp);
  }

  async upload(file, extension) {
    return new Promise((resolve) => {
      try {
        const storageRef = ref(this.storage, 'image-' + Date.now() + '.' + extension);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', null, (error) => {
            console.error(error);
            resolve(false)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve(downloadURL)
            });
          })
      } catch (e) {
        console.error(e);
        resolve(false)
      }
    });
  }

  async delete(url) {
    try {
      const storageRef = ref(this.storage, url);
      await deleteObject(storageRef);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
