import {
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  collection,
} from "firebase/firestore";
import { app, database } from "../firebase";

export const saveItem = async (data) => {
  await setDoc(doc(database, "food", `${Date.now()}`), data, { merge: true });
};

export const getAllFood = async () => {
  const items = await getDocs(
    query(collection(database, "food"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
