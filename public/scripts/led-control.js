// // 

// document.addEventListener("DOMContentLoaded", () => {
//   const btn = document.getElementById("toggleButton");
//   let isOn = false;

//   const client = mqtt.connect('wss://mqtt3.thingspeak.com:443/mqtt', {
//     clientId: "BzgPJRIbMBwTHjE3DhEBBDQ",
//     username: "BzgPJRIbMBwTHjE3DhEBBDQ", // MQTT Username (same as Client ID for ThingSpeak)
//     password: "PGcExDBmN/JOUntxzSD1Mf+f"  // MQTT Password from ThingSpeak
//   });

//   client.on('connect', function () {
//     console.log("✅ Connected to ThingSpeak via WebSocket MQTT");
//   });

//   btn.addEventListener("click", () => {
//     isOn = !isOn;
//     btn.textContent = isOn ? "TURN OFF" : "TURN ON";
//     btn.classList.toggle("on");

//     const message = isOn ? "1" : "0";

//     // ✅ Use Write API Key in topic for publishing
//     const topic = "channels/2918587/publish/fields/field1/TARBKGKSKEC8PRAR";

//     // ✅ Publish properly formatted message
//     client.publish(topic, `field1=${message}`);
//     console.log("Sent:", `field1=${message}`);
//   });
// });


// document.addEventListener("DOMContentLoaded", () => {
//   const btn = document.getElementById("toggleButton");
//   let isOn = false;

//   const client = mqtt.connect('wss://mqtt3.thingspeak.com:443/mqtt', {
//     clientId: "BzgPJRIbMBwTHjE3DhEBBDQ",
//     username: "BzgPJRIbMBwTHjE3DhEBBDQ",
//     password: "PGcExDBmN/JOUntxzSD1Mf+f"
//   });

//   client.on('connect', function () {
//     console.log("✅ Connected to ThingSpeak via WebSocket MQTT");
//   });

//   client.on('error', function (error) {
//     console.error("Connection error:", error);
//   });

//   btn.addEventListener("click", () => {
//     isOn = !isOn;
//     btn.textContent = isOn ? "TURN OFF" : "TURN ON";
//     btn.classList.toggle("on");

//     const value = isOn ? "1" : "0";
    
//     // Corrected topic format
//     const topic = "channels/2918587/publish";
    
//     // Properly formatted payload with API key
//     const payload = `field1=${value}&status=MQTT Update&api_key=TARBKGKSKEC8PRAR`;

//     client.publish(topic, payload, (err) => {
//       if (err) {
//         console.error("Failed to publish:", err);
//       } else {
//         console.log("Successfully published:", payload);
//       }
//     });
//   });
// });



document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("toggleButton");
  let isOn = false;

  btn.addEventListener("click", () => {
    isOn = !isOn;
    btn.textContent = isOn ? "TURN OFF" : "TURN ON";
    btn.classList.toggle("on");

    const value = isOn ? "1" : "0";
    
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