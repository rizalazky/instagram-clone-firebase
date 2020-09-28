import firebase from 'firebase'

const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyAhV8dmZxHgvkFvkG5-nPtdbmP_ifik0v0",
    authDomain: "intagram-clone-firebase-73ec7.firebaseapp.com",
    databaseURL: "https://intagram-clone-firebase-73ec7.firebaseio.com",
    projectId: "intagram-clone-firebase-73ec7",
    storageBucket: "intagram-clone-firebase-73ec7.appspot.com",
    messagingSenderId: "315886087810",
    appId: "1:315886087810:web:a950749d6140ae9e340e9b",
    measurementId: "G-QMP758NMFG"
})

const db=firebaseApp.firestore()
const auth=firebase.auth()

export {db,auth};