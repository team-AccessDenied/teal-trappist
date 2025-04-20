// // // document.addEventListener("DOMContentLoaded", () => {
// // //     // Get all buttons
// // //     const ledBtn = document.getElementById("ledBtn");
// // //     const buzzerBtn = document.getElementById("buzzerBtn");
// // //     const fanBtn = document.getElementById("fanBtn");
    
// // //     // Device states (LED is MSB, Fan is LSB) - all initially false
// // //     const deviceStates = {
// // //         led: false,
// // //         buzzer: false,
// // //         fan: false
// // //     };
    
// // //     // ThingSpeak API key
// // //     const apiKey = "TARBKGKSKEC8PRAR"; // Replace with your write API key
    
// // //     // Function to initialize all devices to OFF and send to ThingSpeak
// // //     function initializeDevices() {
// // //         // Set all states to false
// // //         deviceStates.led = false;
// // //         deviceStates.buzzer = false;
// // //         deviceStates.fan = false;
        
// // //         // Update button appearances
// // //         updateButton(ledBtn, false, "LED");
// // //         updateButton(buzzerBtn, false, "Buzzer");
// // //         updateButton(fanBtn, false, "Fan");
        
// // //         // Send initial OFF state to ThingSpeak (value 0)
// // //         sendToThingSpeak();
// // //     }
    
// // //     // Update button appearance
// // //     function updateButton(btn, isOn, deviceName) {
// // //         btn.textContent = `${deviceName}: ${isOn ? "ON" : "OFF"}`;
// // //         btn.classList.toggle("on", isOn);
// // //     }
    
// // //     // Calculate binary value (0-7)
// // //     function calculateStateValue() {
// // //         // LED is MSB (bit 2), Buzzer is bit 1, Fan is LSB (bit 0)
// // //         return (deviceStates.led ? 4 : 0) + 
// // //                (deviceStates.buzzer ? 2 : 0) + 
// // //                (deviceStates.fan ? 1 : 0);
// // //     }
    
// // //     // Send update to ThingSpeak
// // //     function sendToThingSpeak() {
// // //         const value = calculateStateValue();
// // //         const url = `https://api.thingspeak.com/update?api_key=${apiKey}&field1=${value}`;
        
// // //         fetch(url)
// // //             .then(response => response.json())
// // //             .then(data => {
// // //                 console.log(`Current state: ${value} (${deviceStates.led ? '1' : '0'}${deviceStates.buzzer ? '1' : '0'}${deviceStates.fan ? '1' : '0'})`);
// // //             })
// // //             .catch(error => {
// // //                 console.error("Error updating ThingSpeak:", error);
// // //             });
// // //     }
    
// // //     // Handle button clicks
// // //     function handleClick(device) {
// // //         return () => {
// // //             // Toggle the device state
// // //             deviceStates[device] = !deviceStates[device];
            
// // //             // Update the button UI
// // //             updateButton(
// // //                 device === 'led' ? ledBtn : 
// // //                 device === 'buzzer' ? buzzerBtn : fanBtn,
// // //                 deviceStates[device],
// // //                 device.toUpperCase()
// // //             );
            
// // //             // Send the new state to ThingSpeak
// // //             sendToThingSpeak();
// // //         };
// // //     }
    
// // //     // Add event listeners
// // //     ledBtn.addEventListener("click", handleClick("led"));
// // //     buzzerBtn.addEventListener("click", handleClick("buzzer"));
// // //     fanBtn.addEventListener("click", handleClick("fan"));
    
// // //     // Initialize all devices to OFF state
// // //     initializeDevices();
// // // });


// // // with atleast 30 second gap

// document.addEventListener("DOMContentLoaded", () => {
//     // Get all buttons
//     const ledBtn = document.getElementById("ledBtn");
//     const buzzerBtn = document.getElementById("buzzerBtn");
//     const fanBtn = document.getElementById("fanBtn");
    
//     // Device states (LED is MSB, Fan is LSB)
//     const deviceStates = {
//         led: false,
//         buzzer: false,
//         fan: false
//     };
    
//     // ThingSpeak API key
//     const apiKey = "TARBKGKSKEC8PRAR"; // Replace with your write API key
    
//     // Toggle cooldown tracking
//     let lastToggleTime = 0;
//     const toggleCooldown = 30000; // 30 seconds in milliseconds
    
//     // Update button appearance
//     function updateButton(btn, isOn, deviceName) {
//         btn.textContent = `${deviceName}: ${isOn ? "ON" : "OFF"}`;
//         btn.classList.toggle("on", isOn);
//     }
    
//     // Calculate binary value (0-7)
//     function calculateStateValue() {
//         return (deviceStates.led ? 4 : 0) + 
//                (deviceStates.buzzer ? 2 : 0) + 
//                (deviceStates.fan ? 1 : 0);
//     }
    
//     // Send update to ThingSpeak
//     function sendToThingSpeak() {
//         const value = calculateStateValue();
//         const url = `https://api.thingspeak.com/update?api_key=${apiKey}&field1=${value}`;
        
//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 console.log(`State updated: ${value} (${deviceStates.led ? '1' : '0'}${deviceStates.buzzer ? '1' : '0'}${deviceStates.fan ? '1' : '0'})`);
//             })
//             .catch(error => {
//                 console.error("Error updating ThingSpeak:", error);
//             });
//     }
    
//     // Handle button clicks with cooldown
//     function handleClick(device) {
//         return () => {
//             const now = Date.now();
//             const timeSinceLastToggle = now - lastToggleTime;
            
//             if (timeSinceLastToggle < toggleCooldown) {
//                 const remainingSeconds = Math.ceil((toggleCooldown - timeSinceLastToggle) / 1000);
//                 console.log(`Please wait ${remainingSeconds} more seconds before toggling again`);
//                 return;
//             }
            
//             // Update last toggle time
//             lastToggleTime = now;
            
//             // Toggle the device state
//             deviceStates[device] = !deviceStates[device];
            
//             // Update the button UI
//             updateButton(
//                 device === 'led' ? ledBtn : 
//                 device === 'buzzer' ? buzzerBtn : fanBtn,
//                 deviceStates[device],
//                 device.toUpperCase()
//             );
            
//             // Send the new state to ThingSpeak
//             sendToThingSpeak();
            
//             // Temporarily disable buttons
//             disableButtonsTemporarily();
//         };
//     }
    
//     // Disable buttons during cooldown
//     function disableButtonsTemporarily() {
//         [ledBtn, buzzerBtn, fanBtn].forEach(btn => {
//             btn.disabled = true;
//         });
        
//         setTimeout(() => {
//             [ledBtn, buzzerBtn, fanBtn].forEach(btn => {
//                 btn.disabled = false;
//             });
//             console.log("Buttons are now ready for toggling");
//         }, toggleCooldown);
//     }
    
//     // Add event listeners
//     ledBtn.addEventListener("click", handleClick("led"));
//     buzzerBtn.addEventListener("click", handleClick("buzzer"));
//     fanBtn.addEventListener("click", handleClick("fan"));
    
//     // Initialize UI
//     updateButton(ledBtn, false, "LED");
//     updateButton(buzzerBtn, false, "Buzzer");
//     updateButton(fanBtn, false, "Fan");
    
//     // Initial state message
//     console.log("System ready. Initial state: 0 (000)");
// });





















// // document.addEventListener("DOMContentLoaded", () => {
// //     // Get all buttons
// //     const ledBtn = document.getElementById("ledBtn");
// //     const buzzerBtn = document.getElementById("buzzerBtn");
// //     const fanBtn = document.getElementById("fanBtn");
    
// //     // Device states (LED is MSB, Fan is LSB)
// //     const deviceStates = {
// //         led: false,
// //         buzzer: false,
// //         fan: false
// //     };
    
// //     // ThingSpeak API key
// //     const apiKey = "TARBKGKSKEC8PRAR";
    
// //     // Timing coordination (matches ESP32's 30s read interval)
// //     const MIN_UPDATE_INTERVAL = 30000; // 30 seconds
// //     let lastUpdateTime = 0;
// //     let updateInProgress = false;
    
// //     // Update button appearance
// //     function updateButton(btn, isOn, deviceName) {
// //         btn.textContent = `${deviceName}: ${isOn ? "ON" : "OFF"}`;
// //         btn.classList.toggle("on", isOn);
// //     }
    
// //     // Calculate binary value (0-7)
// //     function calculateStateValue() {
// //         return (deviceStates.led ? 4 : 0) + 
// //                (deviceStates.buzzer ? 2 : 0) + 
// //                (deviceStates.fan ? 1 : 0);
// //     }
    
// //     // Send update to ThingSpeak with state persistence
// //     function sendToThingSpeak() {
// //         const now = Date.now();
// //         const timeSinceLastUpdate = now - lastUpdateTime;
        
// //         if (timeSinceLastUpdate < MIN_UPDATE_INTERVAL && lastUpdateTime !== 0) {
// //             const remaining = Math.ceil((MIN_UPDATE_INTERVAL - timeSinceLastUpdate)/1000);
// //             console.log(`Waiting ${remaining}s to sync with ESP32...`);
// //             setTimeout(sendToThingSpeak, MIN_UPDATE_INTERVAL - timeSinceLastUpdate);
// //             return;
// //         }
        
// //         if (updateInProgress) return;
// //         updateInProgress = true;
        
// //         const value = calculateStateValue();
// //         const url = `https://api.thingspeak.com/update?api_key=${apiKey}&field1=${value}`;
        
// //         fetch(url)
// //             .then(response => response.json())
// //             .then(data => {
// //                 lastUpdateTime = Date.now();
// //                 console.log(`State ${value} (${deviceStates.led?'1':'0'}${deviceStates.buzzer?'1':'0'}${deviceStates.fan?'1':'0'}) sent`);
                
// //                 // Special handling for buzzer (auto-off after 2 seconds)
// //                 if (deviceStates.buzzer) {
// //                     setTimeout(() => {
// //                         deviceStates.buzzer = false;
// //                         updateButton(buzzerBtn, false, "Buzzer");
// //                         sendToThingSpeak();
// //                     }, 2000);
// //                 }
                
// //                 updateInProgress = false;
// //             })
// //             .catch(error => {
// //                 console.error("Update failed:", error);
// //                 updateInProgress = false;
// //             });
// //     }
    
// //     // Handle button clicks with visual feedback
// //     function handleClick(device) {
// //         return () => {
// //             // Toggle the device state
// //             deviceStates[device] = !deviceStates[device];
            
// //             // Update the button UI immediately
// //             updateButton(
// //                 device === 'led' ? ledBtn : 
// //                 device === 'buzzer' ? buzzerBtn : fanBtn,
// //                 deviceStates[device],
// //                 device.toUpperCase()
// //             );
            
// //             // Send the update (will handle timing internally)
// //             sendToThingSpeak();
            
// //             // Visual feedback
// //             const btn = device === 'led' ? ledBtn : 
// //                        device === 'buzzer' ? buzzerBtn : fanBtn;
// //             btn.classList.add('pending');
// //             setTimeout(() => btn.classList.remove('pending'), 1000);
// //         };
// //     }
    
// //     // Add event listeners
// //     ledBtn.addEventListener("click", handleClick("led"));
// //     buzzerBtn.addEventListener("click", handleClick("buzzer"));
// //     fanBtn.addEventListener("click", handleClick("fan"));
    
// //     // Initialize UI
// //     updateButton(ledBtn, false, "LED");
// //     updateButton(buzzerBtn, false, "Buzzer");
// //     updateButton(fanBtn, false, "Fan");
    
// //     console.log("Control system ready. Updates will sync with ESP32's 30s intervals.");
// // });








document.addEventListener("DOMContentLoaded", () => {
    // Get all buttons and status message element
    const ledBtn = document.getElementById("ledBtn");
    const buzzerBtn = document.getElementById("buzzerBtn");
    const fanBtn = document.getElementById("fanBtn");
    const statusMessage = document.getElementById("statusMessage");
    
    // Device states (LED is MSB, Fan is LSB)
    const deviceStates = {
        led: false,
        buzzer: false,
        fan: false
    };
    
    // ThingSpeak API key
    const apiKey = "TARBKGKSKEC8PRAR"; // Replace with your write API key
    
    // Toggle cooldown tracking
    let lastToggleTime = 0;
    const toggleCooldown = 30000; // 30 seconds in milliseconds
    
    // Update button appearance
    function updateButton(btn, isOn, deviceName) {
        btn.textContent = isOn ? "TURN OFF" : "TURN ON";
        btn.classList.toggle("on", isOn);
    }
    
    // Calculate binary value (0-7)
    function calculateStateValue() {
        return (deviceStates.led ? 4 : 0) + 
               (deviceStates.buzzer ? 2 : 0) + 
               (deviceStates.fan ? 1 : 0);
    }
    
    // Send update to ThingSpeak
    function sendToThingSpeak() {
        const value = calculateStateValue();
        const url = `https://api.thingspeak.com/update?api_key=${apiKey}&field1=${value}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(`State updated: ${value} (${deviceStates.led ? '1' : '0'}${deviceStates.buzzer ? '1' : '0'}${deviceStates.fan ? '1' : '0'})`);
            })
            .catch(error => {
                console.error("Error updating ThingSpeak:", error);
            });
    }
    
    // Handle button clicks with cooldown
    function handleClick(device) {
        return () => {
            const now = Date.now();
            const timeSinceLastToggle = now - lastToggleTime;
            
            if (timeSinceLastToggle < toggleCooldown) {
                const remainingSeconds = Math.ceil((toggleCooldown - timeSinceLastToggle) / 1000);
                console.log(`Please wait ${remainingSeconds} more seconds before toggling again`);
                statusMessage.textContent = `Please wait ${remainingSeconds} more seconds before toggling again`;
                return;
            }
            
            // Update last toggle time
            lastToggleTime = now;
            
            // Toggle the device state
            deviceStates[device] = !deviceStates[device];
            
            // Update the button UI
            updateButton(
                device === 'led' ? ledBtn : 
                device === 'buzzer' ? buzzerBtn : fanBtn,
                deviceStates[device],
                device.toUpperCase()
            );
            
            // Send the new state to ThingSpeak
            sendToThingSpeak();
            
            // Temporarily disable buttons
            disableButtonsTemporarily();
        };
    }
    
    // Disable buttons during cooldown
    function disableButtonsTemporarily() {
        [ledBtn, buzzerBtn, fanBtn].forEach(btn => {
            btn.disabled = true;
        });
        
        setTimeout(() => {
            [ledBtn, buzzerBtn, fanBtn].forEach(btn => {
                btn.disabled = false;
            });
            console.log("Buttons are now ready for toggling");
            statusMessage.textContent = "Buttons are ready for toggling";
        }, toggleCooldown);
    }
    
    // Add event listeners
    ledBtn.addEventListener("click", handleClick("led"));
    buzzerBtn.addEventListener("click", handleClick("buzzer"));
    fanBtn.addEventListener("click", handleClick("fan"));
    
    // Initialize UI
    updateButton(ledBtn, false, "LED");
    updateButton(buzzerBtn, false, "Buzzer");
    updateButton(fanBtn, false, "Fan");
    
    // Initial state message
    console.log("System ready. Initial state: 0 (000)");
    statusMessage.textContent = "System ready. Buttons are ready for toggling";
});