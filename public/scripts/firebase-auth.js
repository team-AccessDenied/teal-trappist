// import {
//   initializeApp,
//   getApps
// } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// // 🔐 Your Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyDxYmCNNx67dBV4qPTLg5oh20DujIExwbY",
//   authDomain: "iot-project-3f5d8.firebaseapp.com",
//   projectId: "iot-project-3f5d8",
//   storageBucket: "iot-project-3f5d8.firebasestorage.app",
//   messagingSenderId: "170586591816",
//   appId: "1:170586591816:web:2c01e84e06575c69867e7d",
//   measurementId: "G-JYY60M0NFV"
// };

// // 🔧 Initialize Firebase safely
// let app;
// if (!getApps().length) {
//   app = initializeApp(firebaseConfig);
// } else {
//   app = getApps()[0];
// }

// const auth = getAuth(app);

// // 🎯 UI references
// const nameInput = document.getElementById("name");
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const form = document.getElementById("auth-form");
// const submitBtn = document.getElementById("submit-btn");
// const initialButtons = document.getElementById("initial-buttons");
// const formSection = document.getElementById("form-section");

// let mode = "";

// // 🚪 Login button
// document.getElementById("show-login").addEventListener("click", () => {
//   mode = "login";
//   nameInput.style.display = "none";
//   nameInput.required = false;
//   showForm("Login");
// });

// document.getElementById("show-register").addEventListener("click", () => {
//   mode = "register";
//   nameInput.style.display = "block";
//   nameInput.required = true;
//   showForm("Register");
// });

// // 📦 Show form
// function showForm(buttonText) {
//   initialButtons.style.display = "none";
//   formSection.classList.remove("hidden");
//   submitBtn.textContent = buttonText;
// }

// // 🚀 Form submission
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const name = nameInput.value.trim();
//   const email = emailInput.value.trim();
//   const password = passwordInput.value;

//   try {
//     if (mode === "register") {
//       await createUserWithEmailAndPassword(auth, email, password);
//       localStorage.setItem("userEmail", email);
//       localStorage.setItem("userName", name);
//       location.href = "/dashboard";
//     } else if (mode === "login") {
//       await signInWithEmailAndPassword(auth, email, password);
//       localStorage.setItem("userEmail", email);
//       location.href = "/dashboard";
//     }
//   } catch (error) {
//     if (mode === "login") {
//       if (error.code === "auth/user-not-found") {
//         alert("Email not registered. Please register first.");
//       } else if (error.code === "auth/wrong-password") {
//         alert("Incorrect password. Try again.");
//       } else {
//         alert(error.message);
//       }
//     } else if (mode === "register") {
//       if (error.code === "auth/email-already-in-use") {
//         alert("Email already exists. Please login instead.");
//       } else {
//         alert(error.message);
//       }
//     } else {
//       alert(error.message);
//     }
//   }
// });


import {
  initializeApp,
  getApps
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

window.addEventListener("DOMContentLoaded", () => {
  // 🔐 Your Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyDxYmCNNx67dBV4qPTLg5oh20DujIExwbY",
    authDomain: "iot-project-3f5d8.firebaseapp.com",
    projectId: "iot-project-3f5d8",
    storageBucket: "iot-project-3f5d8.firebasestorage.app",
    messagingSenderId: "170586591816",
    appId: "1:170586591816:web:2c01e84e06575c69867e7d",
    measurementId: "G-JYY60M0NFV"
  };

  // 🔧 Initialize Firebase safely
  let app;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  const auth = getAuth(app);

  // 🎯 UI references
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const form = document.getElementById("auth-form");
  const submitBtn = document.getElementById("submit-btn");
  const initialButtons = document.getElementById("initial-buttons");
  const formSection = document.getElementById("form-section");

  let mode = "";

  // 🚪 Login button
  document.getElementById("show-login").addEventListener("click", () => {
    mode = "login";
    nameInput.style.display = "none";
    nameInput.required = false;
    showForm("Login");
  });

  document.getElementById("show-register").addEventListener("click", () => {
    mode = "register";
    nameInput.style.display = "block";
    nameInput.required = true;
    showForm("Register");
  });

  // 📦 Show form
  function showForm(buttonText) {
    initialButtons.style.display = "none";
    formSection.classList.remove("hidden");
    submitBtn.textContent = buttonText;
  }

  // 🚀 Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try {
      if (mode === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", name);
        location.href = import.meta.env.BASE_URL + "/dashboard";
      } else if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("userEmail", email);
        location.href = import.meta.env.BASE_URL + "/dashboard";
      }
    } catch (error) {
      if (mode === "login") {
        if (error.code === "auth/user-not-found") {
          alert("Email not registered. Please register first.");
        } else if (error.code === "auth/wrong-password") {
          alert("Incorrect password. Try again.");
        } else {
          alert(error.message);
        }
      } else if (mode === "register") {
        if (error.code === "auth/email-already-in-use") {
          alert("Email already exists. Please login instead.");
        } else {
          alert(error.message);
        }
      } else {
        alert(error.message);
      }
    }
  });
});
