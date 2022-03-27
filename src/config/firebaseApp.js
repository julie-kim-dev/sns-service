import firebaseApp from "firebase/compat/app";
import 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCEfzjxZP3w2IGnX_3LJYXMJEY4WeI4bmU",
    authDomain: "sns-service-10837.firebaseapp.com",
    databaseURL: "https://sns-service-10837-default-rtdb.firebaseio.com",
    projectId: "sns-service-10837",
    storageBucket: "sns-service-10837.appspot.com",
    messagingSenderId: "996006300755",
    appId: "1:996006300755:web:22ee36d86fa9aa6b40caa6",
    measurementId: "G-MRZM3RBKL0"
};

firebaseApp.initializeApp(firebaseConfig);

export default firebaseApp;