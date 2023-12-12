// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// Конфінурація Firebase

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2K9D_BPdumZMpM8AePInkP0xSIouybHQ",
  authDomain: "app-store-954f3.firebaseapp.com",
  projectId: "app-store-954f3",
  storageBucket: "app-store-954f3.appspot.com",
  messagingSenderId: "444121677412",
  appId: "1:444121677412:web:7e5501399799dfaa536971",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginButton = document.querySelector("#login-button");
const logOutButton = document.querySelector("#logout-button");
const userIcon = document.querySelector(".user-icon");
let userData;

// Стан авторизації юзера
auth.onAuthStateChanged((user) => {
  if (user) {
    const saveUserData = localStorage.getItem("user");
    if (saveUserData) {
      userData = JSON.parse(saveUserData);
      console.log(userData);
    }
    loginButton.style.display = "none";
    logOutButton.style.display = "block";
    userIcon.style.display = "block";
    userIcon.src = userData.photoURL;
    console.log(userIcon);
  } else {
    loginButton.style.display = "block";
    logOutButton.style.display = "none";
    userIcon.style.display = "none";
  }
});
// Обробник подій по  kліку увійти
loginButton.addEventListener("click", (e) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((rezult) => {
      const user = rezult.user;
      console.log("Авторизація користувача", user);
      localStorage.setItem("user", JSON.stringify(user));
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error("Помилка авторизації", errorMessage);
    });
});
// Обробник подій по Kліку вихід
logOutButton.addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      console.log("Користувач вийшов");
      localStorage.removeItem(user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error("Помилка авторизації", errorMessage);
    });
});
// Перевірямо наявність даних в localStorage
