import { Firebase } from "./firebase.interface";

export interface Environment {
  production: boolean;
  firebaseConfig: Firebase;
}