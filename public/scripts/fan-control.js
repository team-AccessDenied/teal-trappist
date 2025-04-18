document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("toggleButton");
    let isOn = false;
  
    btn.addEventListener("click", () => {
      isOn = !isOn;
      btn.textContent = isOn ? "TURN OFF" : "TURN ON";
      btn.classList.toggle("on");
  
      const value = isOn ? "2" : "3";
      
      // Construct the ThingSpeak API URL
      const url = `https://api.thingspeak.com/update?api_key=TARBKGKSKEC8PRAR&field1=${value}`;
      
      // Send HTTP request to ThingSpeak
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log("ThingSpeak update successful, entry number:", data);
        })
        .catch(error => {
          console.error("Error updating ThingSpeak:", error);
        });
    });
  });