//importation des objets firebase et et de la base de donnée cloud firestore
import firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig' //importation de la config firebase

const firebaseApp = firebase.initializeApp(firebaseConfig) //initialization de l'objet firebase

export default firebaseApp.firestore() //création de l'objet de stockage de données cloud