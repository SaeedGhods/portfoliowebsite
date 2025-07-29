/**
 * Timestamp Updater - Gets actual last modification time
 * Fetches the last modified time from the server
 */

document.addEventListener("DOMContentLoaded", function() {
    // Get the actual last modified time from the server
    getLastModifiedTime();
});

async function getLastModifiedTime() {
    try {
        // Try to get the last modified time from the server
        const response = await fetch('/api/last-modified', {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            updateTimestampDisplay(data.lastModified);
        } else {
            // Fallback: use current time but indicate it's an estimate
            updateTimestampDisplay(new Date().toISOString(), true);
        }
    } catch (error) {
        console.log("Could not fetch last modified time, using fallback:", error);
        // Fallback: use current time but indicate it's an estimate
        updateTimestampDisplay(new Date().toISOString(), true);
    }
}

function updateTimestampDisplay(lastModifiedTime, isEstimate = false) {
    const date = new Date(lastModifiedTime);
    
    // Format options
    const options = { 
        year: "numeric", 
        month: "long", 
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
    };
    
    // Format the timestamp text
    let timestampText = "Last updated: " + date.toLocaleString("en-US", options);
    if (isEstimate) {
        timestampText += " (estimated)";
    }
    
    // Create or update timestamp element
    let timestampElement = document.getElementById("timestamp-display");
    if (!timestampElement) {
        timestampElement = document.createElement("div");
        timestampElement.id = "timestamp-display";
        timestampElement.className = "timestamp-visible";
        document.body.appendChild(timestampElement);
    }
    
    timestampElement.textContent = timestampText;
    console.log("Timestamp display updated: " + timestampText);
}
