// Anti-cache mechanism - Forces browser to load the latest version of resources
function applyCacheBusting() {
    const timestamp = new Date().getTime();
    const linkElements = document.querySelectorAll("link[rel=\"stylesheet\"]");
    const scriptElements = document.querySelectorAll("script[src]");
    
    // Update CSS links
    linkElements.forEach(link => {
        if (link.href && !link.href.includes("?v=")) {
            link.href = `${link.href}?v=${timestamp}`;
        }
    });
    
    // Update JS scripts
    scriptElements.forEach(script => {
        if (script.src && !script.src.includes("?v=")) {
            script.src = `${script.src}?v=${timestamp}`;
        }
    });
    
    console.log("Cache busting applied to resources");
}

// Apply cache busting when the page loads
applyCacheBusting();

document.addEventListener("DOMContentLoaded", function() {
    // Initialize theme based on user preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    toggleDarkMode(prefersDark.matches);
    prefersDark.addListener((e) => toggleDarkMode(e.matches));

    // Set up profile keydown for accessibility
    const profile = document.getElementById("profile");
    if(profile){
      profile.addEventListener("keydown", function(e) {
          if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleDisplay();
          }
      });
    }

    // Update scroll progress on scroll event
    window.addEventListener("scroll", updateProgressBar);
    
    // Fix spacing issues between timeline items
    fixTimelineSpacing();
});

// Function to fix spacing issues between timeline items
function fixTimelineSpacing() {
    console.log("Fixing timeline spacing issues");
    
    // Specifically fix VENT to Mortgage spacing issue
    const ventTimelineItem = document.querySelector(".timeline-item:has(#ventGallery)");
    const mortgageTimelineItem = document.querySelector(".timeline-item:has(h4:contains(\"Mortgage\"))");
    
    if (ventTimelineItem && mortgageTimelineItem) {
        console.log("Found VENT and Mortgage items, adjusting spacing");
        
        // Apply direct style fixes
        ventTimelineItem.style.marginBottom = "0";
        ventTimelineItem.style.paddingBottom = "0";
        mortgageTimelineItem.style.marginTop = "0";
        mortgageTimelineItem.style.paddingTop = "10px";
        
        // Add a class for CSS targeting
        ventTimelineItem.classList.add("no-bottom-space");
        mortgageTimelineItem.classList.add("no-top-space");
        
        // Adjust any expandable containers
        const expandableContainer = ventTimelineItem.querySelector(".expandable");
        if (expandableContainer) {
            expandableContainer.style.marginBottom = "0";
            expandableContainer.style.paddingBottom = "0";
        }
    }
}

function updateProgressBar(){
    const winScroll = window.pageYOffset || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("progress-bar");
    if(progressBar){
      progressBar.style.width = scrolled + "%";
    }
}

function toggleDisplay() {
    const timeline = document.getElementById("timeline");
    const introText = document.querySelector(".intro-text");
    const contactInfo = document.getElementById("contactInfo");
    const profile = document.getElementById("profile");
    
    const isExpanded = timeline.classList.toggle("active");
    if(introText) introText.classList.toggle("visible", isExpanded);
    if(contactInfo) contactInfo.classList.toggle("visible", isExpanded);
    if(profile){
      profile.classList.toggle("pulse-stopped", isExpanded);
      profile.setAttribute("aria-expanded", isExpanded);
    }
    
    if (isExpanded) {
        timeline.scrollIntoView({ behavior: "smooth", block: "start" });
        const onAudio = document.getElementById("autopilotOn");
        if(onAudio) onAudio.play().catch(() => {});
    } else {
        const offAudio = document.getElementById("autopilotOff");
        if(offAudio) offAudio.play().catch(() => {});
    }
}

function toggleDarkMode(isDark) {
    if (isDark) {
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.style.setProperty("--background-color", "#1a1a1a");
        document.documentElement.style.setProperty("--text-color", "#e6e6e6");
        document.documentElement.style.setProperty("--highlight-color", "#0096ff");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        document.documentElement.style.setProperty("--background-color", "#0d0d0d");
        document.documentElement.style.setProperty("--text-color", "#f0f0f0");
        document.documentElement.style.setProperty("--highlight-color", "#0074d9");
    }
}

function toggleTheme(){
    if (document.documentElement.getAttribute("data-theme") === "dark"){
        toggleDarkMode(false);
    } else {
        toggleDarkMode(true);
    }
}

function showContent(type){
    const contentDisplay = document.getElementById("content-display");
    let contentHTML = "";
    switch(type){
        case "thesis":
            contentHTML = "<embed src=\"path/to/thesis.pdf\" type=\"application/pdf\" width=\"100%\" height=\"600px\">";
            break;
        case "asia":
            contentHTML = "<embed src=\"path/to/asia.pdf\" type=\"application/pdf\" width=\"100%\" height=\"600px\">";
            break;
        case "paris":
            contentHTML = "<embed src=\"path/to/paris.pdf\" type=\"application/pdf\" width=\"100%\" height=\"600px\">";
            break;
        case "advanced":
            contentHTML = "<embed src=\"path/to/advanced.pdf\" type=\"application/pdf\" width=\"100%\" height=\"600px\">";
            break;
        case "aalu":
            contentHTML = "<embed src=\"path/to/aalu.pdf\" type=\"application/pdf\" width=\"100%\" height=\"600px\">";
            break;
        case "glass":
            contentHTML = "<iframe src=\"https://www.evolo.us/glass-pavilion-at-usc-school-of-architecture/\" width=\"100%\" height=\"600px\" frameborder=\"0\" allowfullscreen></iframe>";
            break;
        case "history":
            contentHTML = "<embed src=\"path/to/history.pdf\" type=\"application/pdf\" width=\"100%\" height=\"600px\">";
            break;
        case "intro":
            contentHTML = "<embed src=\"path/to/intro.pdf\" type=\"application/pdf\" width=\"100%\" height=\"600px\">";
            break;
        case "photo":
            contentHTML = "<embed src=\"path/to/photo.pdf\" type=\"application/pdf\" width=\"100%\" height=\"600px\">";
            break;
        case "vent":
            contentHTML = `<h2>VENT Project</h2>
                          <p>The VENT project was an exploration of innovative ventilation solutions for architectural spaces. 
                          The project focused on energy efficiency and improving air quality through smart design.</p>
                          <div id="ventContentGallery"></div>`;
            break;
        case "artcenter-letter":
            contentHTML = "<h2>ArtCenter Acceptance Letter</h2>\n<p>ArtCenter<br>August 29, 2018<br>Saeed Ghods<br>9201 City Lights Dr<br>Aliso Viejo, CA 92656</p>\n<p>Dear Saeed,</p>\n<p>I am pleased to inform you that the Graduate Admissions Committee has accepted your application to ArtCenter College of Design. You have been admitted to the Grad Transportation Design Department as a first term graduate student for the Fall semester starting September 08, 2018. Typical length of study for the MS in Grad Transportation Design is six full terms. The program can be completed in two years.</p>";
            break;
        default:
            contentHTML = "<p>Content not available</p>";
    }
    if(contentDisplay){
      contentDisplay.innerHTML = contentHTML;
      contentDisplay.style.display = "block";
      contentDisplay.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}
