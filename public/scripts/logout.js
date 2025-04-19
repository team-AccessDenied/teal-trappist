import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDxYmCNNx67dBV4qPTLg5oh20DujIExwbY",
  authDomain: "iot-project-3f5d8.firebaseapp.com",
  projectId: "iot-project-3f5d8",
  storageBucket: "iot-project-3f5d8.appspot.com",
  messagingSenderId: "170586591816",
  appId: "1:170586591816:web:2c01e84e06575c69867e7d",
  measurementId: "G-JYY60M0NFV"
};

// 🔧 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🎯 Logout logic
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("userEmail");
      location.href = "/teal-trappist/";
    })
    .catch((error) => {
      console.error("Logout error:", error);
      alert("Failed to logout. Try again.");
    });
});
