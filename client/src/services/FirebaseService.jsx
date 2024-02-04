import { app } from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);

export const uploadImageToFirebase = async (file) => {
  if (!file) throw new Error("Ei tiedostoa ladattavaksi");

  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
