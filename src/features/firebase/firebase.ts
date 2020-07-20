import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/database";
import { FirebaseCollections, dataConverter } from "../../sharedTypes";

const config = {
  apiKey: "AIzaSyAZwVd3_hHJS9CTMrfO5Jn4PVcBcZxrcT4",
  authDomain: "my-cube-3039e.firebaseio.com",
  databaseURL: "https://my-cube-3039e.firebaseio.com",
  projectId: "my-cube-3039e",
  storageBucket: "my-cube-3039e.appspot.com",
  messagingSenderId: "270124832795",
  appId: "1:270124832795:android:5b4d8df49ef4421a92c0be",
  measurementId: "G-D9SX9GEWJY",
};

const cubeId = `kvRNzi797sXjtcATPaHy043iYST2`; // cube
//const cubeId = `nibEA4nCmebMoD6wVNa81KoMilq2`; // local dev

export const initFirebase = () => {
  firebase.initializeApp(config);
  firebase.analytics();
};

const defaultUserEmail = `mike.cann@gmail.com`;

export const signInToFirebase = (password: string) =>
  firebase.auth().signInWithEmailAndPassword(defaultUserEmail, password);

export const signOutOfFirebase = () => firebase.auth().signOut();

export const listenForFirebaseAuthStateChange = (handler: (user: firebase.User | null) => any) =>
  firebase.auth().onAuthStateChanged(handler);

export const listenForFirebaseSnapshots = <T extends keyof FirebaseCollections>(
  collection: T,
  handler: (cube: FirebaseCollections[T] | undefined) => any
) => {
  firebase
    .firestore()
    .collection(collection)
    .doc(cubeId)
    .onSnapshot(x => handler(x.data() as any));
};

export const setFirebaseState = <T extends keyof FirebaseCollections>(
  collection: T,
  state: FirebaseCollections[T]
) => {
  return firebase
    .firestore()
    .collection(collection)
    .doc(cubeId)
    .set(state);
};

export const updateFirebaseState = <T extends keyof FirebaseCollections>(
  collection: T,
  partial: Partial<FirebaseCollections[T]>
) => {
  const converted = dataConverter.toFirestore(partial);
  return firebase
    .firestore()
    .collection(collection)
    .doc(cubeId)
    .update(converted);
};
