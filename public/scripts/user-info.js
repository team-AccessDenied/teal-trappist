document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".user-info");
  
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
  
    if (email) {
      container.innerHTML = `
        <h2>Welcome, ${name || "User"}!</h2>
        <p><strong>Email:</strong> ${email}</p>
      `;
    } else {
      container.innerHTML = `
        <p>User not logged in. Please login again.</p>
      `;
    }
  });
  