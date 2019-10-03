import firebase from 'firebase'

// Your web app's Firebase configuration
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBIzlt4739d0hqNY4c-9XLKx_iA_mddSkM',
    authDomain: 'costmanagementapp.firebaseapp.com',
    databaseURL: 'https://costmanagementapp.firebaseio.com',
    projectId: 'costmanagementapp',
    storageBucket: 'costmanagementapp.appspot.com',
    messagingSenderId: '584138123315',
    appId: '1:584138123315:web:2284e4ada8fffe6e439b46',
    measurementId: 'G-KNM1WLF0BB'
  })
}

export default firebase
