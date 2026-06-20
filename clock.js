// Philippine Time Clock
// Real-time clock display for the portfolio header

/**
 * Initialize and update Philippine time display
 * @param {string} elementId - ID of the element to display the clock
 * @param {string} timeZone - IANA timezone string (default: Asia/Manila)
 */
function initializeClock(elementId = "phClock", timeZone = "Asia/Manila") {
  const clockElement = document.getElementById(elementId);
  
  if (!clockElement) {
    console.warn(`Clock element with ID "${elementId}" not found`);
    return;
  }

  /**
   * Update the clock display with current time
   */
  function updateTime() {
    const now = new Date();
    const options = {
      timeZone: timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    };
    
    try {
      const timeString = new Intl.DateTimeFormat("en-US", options).format(now);
      const tzAbbrev = getTimeZoneAbbreviation(timeZone);
      clockElement.textContent = `${tzAbbrev} ${timeString}`;
    } catch (error) {
      console.error("Error updating clock:", error);
      clockElement.textContent = "Clock Error";
    }
  }

  /**
   * Get timezone abbreviation
   * @param {string} tz - Timezone string
   * @returns {string} - Timezone abbreviation
   */
  function getTimeZoneAbbreviation(tz) {
    const abbreviations = {
      "Asia/Manila": "PHT",
      "America/New_York": "EST",
      "America/Chicago": "CST",
      "America/Denver": "MST",
      "America/Los_Angeles": "PST",
      "Europe/London": "GMT",
      "Europe/Paris": "CET",
      "Asia/Tokyo": "JST",
      "Australia/Sydney": "AEDT",
    };
    return abbreviations[tz] || tz.split("/")[1] || tz;
  }

  // Initial update
  updateTime();

  // Update every second
  setInterval(updateTime, 1000);
}

// Auto-initialize if clock element exists
document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById("phClock")) {
    initializeClock("phClock", "Asia/Manila");
  }
});

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { initializeClock };
}
