import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const docRef = await addDoc(collection(db, "weatherData"), {
  createdAt: weatherData[0],
  // location: location,
  // timePeriod:
  humidity: weatherData[1],
  temperature: weatherData[2],
  precipitation: weatherData[3],
});
console.log("Document written with ID: ", docRef.id);
