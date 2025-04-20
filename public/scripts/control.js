// 


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
    function updateButton(btn, isOn) {
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
                const stateMessage = `State updated: ${value} (${deviceStates.led ? '1' : '0'}${deviceStates.buzzer ? '1' : '0'}${deviceStates.fan ? '1' : '0'})`;
                console.log(stateMessage);
                statusMessage.textContent = stateMessage;
                
                // Set timeout to return to ready message after 3 seconds
                setTimeout(() => {
                    statusMessage.textContent = "Buttons are ready for toggling";
                }, 3000);
            })
            .catch(error => {
                const errorMessage = `Error updating ThingSpeak: ${error}`;
                console.error(errorMessage);
                statusMessage.textContent = errorMessage;
            });
    }
    
    // Handle button clicks with cooldown
    function handleClick(device) {
        return () => {
            const now = Date.now();
            const timeSinceLastToggle = now - lastToggleTime;
            
            if (timeSinceLastToggle < toggleCooldown) {
                const remainingSeconds = Math.ceil((toggleCooldown - timeSinceLastToggle) / 1000);
                const waitMessage = `Please wait ${remainingSeconds} more seconds before toggling again`;
                console.log(waitMessage);
                statusMessage.textContent = waitMessage;
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
                deviceStates[device]
            );
            
            // Show immediate feedback
            const actionMessage = `${device.toUpperCase()} turned ${deviceStates[device] ? 'ON' : 'OFF'}`;
            console.log(actionMessage);
            statusMessage.textContent = actionMessage;
            
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
            const readyMessage = "Buttons are ready for toggling";
            console.log(readyMessage);
            statusMessage.textContent = readyMessage;
        }, toggleCooldown);
    }
    
    // Add event listeners
    ledBtn.addEventListener("click", handleClick("led"));
    buzzerBtn.addEventListener("click", handleClick("buzzer"));
    fanBtn.addEventListener("click", handleClick("fan"));
    
    // Initialize UI
    updateButton(ledBtn, false);
    updateButton(buzzerBtn, false);
    updateButton(fanBtn, false);
    
    // Initial state message
    const initMessage = "System ready. Initial state: 0 (000)";
    console.log(initMessage);
    statusMessage.textContent = initMessage;
    
    // Set timeout to show ready message after 3 seconds
    setTimeout(() => {
        statusMessage.textContent = "Buttons are ready for toggling";
    }, 3000);
});