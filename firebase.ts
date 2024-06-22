import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/functions';
import Constants from 'expo-constants';

const firebaseConfig = {
    apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
    authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
    databaseURL: Constants.expoConfig?.extra?.firebaseDatabaseURL,
    projectId: Constants.expoConfig?.extra?.firebaseProjectId,
    storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
    messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
    appId: Constants.expoConfig?.extra?.firebaseAppId,
    measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId,
  };

if (!firebase.getApp.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };