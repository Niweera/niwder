import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/messaging";
import "firebase/compat/database";
import "firebase/compat/app-check";
import "firebase/compat/performance";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
const appCheck = firebase.appCheck();
appCheck.activate(process.env.REACT_APP_FIREBASE_APP_CHECK_SITE_KEY, true);

let firebaseMessaging;
if (firebase.messaging.isSupported()) {
  firebaseMessaging = firebase.messaging();
}

export const API_BASE =
  process.env.NODE_ENV === "development"
    ? "https://niwder-api.niweera.gq"
    : "https://niwder-api.niweera.gq";
export const FCM_VAPID_KEY = process.env.REACT_APP_FCM_VAPID_KEY;
export const messaging = firebaseMessaging;
export const perfmon = firebase.performance();

perfmon.instrumentationEnabled = true;
perfmon.dataCollectionEnabled = true;

export default firebase;
