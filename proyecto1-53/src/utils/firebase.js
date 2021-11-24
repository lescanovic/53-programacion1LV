//importamos funciones desde firebase

import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from'firebase/storage'
import { getAuth} from'firebase/auth'

//la constante firebase contiene los parametros de conexion
const firebaseConfig = {
    apiKey: "AIzaSyCh-jFoVUyGrQw7hFAfFrOrAwM-ES3D8HY",
    authDomain: "vlescano-cet30.firebaseapp.com",
    projectId: "vlescano-cet30",
    storageBucket: "vlescano-cet30.appspot.com",
    messagingSenderId: "512967069190",
    appId: "1:512967069190:web:ba3a91c7901786e1a17d87",
    measurementId: "G-SZN8N2R0ZT"
  };
  //conexion de la funcion con la constante
  initializeApp (firebaseConfig)
const app = initializeApp (firebaseConfig)
//guarda lo que entrega la funcion
  const db = getFirestore ()

 const storage = getStorage (app)
 
 const auth = getAuth ()

 export { db, storage,auth }





