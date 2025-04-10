// April 11-4:1pm
export function dateFormat(isoString) {
    if (!isoString || isoString === "TBD") return "TBD"; // Handle empty or "TBD" dates

    const dateObj = new Date(isoString);

    // Format the date as "Aug 25"
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short", // Abbreviated month (e.g., "Aug")
      day: "numeric", // Day number (e.g., "25")
    }).format(dateObj);

    // Format the time as "9pm"
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const formattedTime = `${hours % 12 || 12}${
      minutes === 0 ? "" : `:${minutes}`
    }${hours >= 12 ? "pm" : "am"}`;

    // Combine the date and time
    return `${formattedDate}-${formattedTime}`;
};

// Friday, Aprill 11
export function formatDay(isoString) {
    if (!isoString || isoString === "TBD") return "TBD";

    const dateObj = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(dateObj);
  }

// 4:01 PM - 6:01 PM EST
export function formatTimeRange(isoString) {
    if (!isoString || isoString === "TBD") return "TBD";

    const dateObj = new Date(isoString);
    const endDate = new Date(dateObj);
    endDate.setHours(dateObj.getHours() + 2); // Default to 2 hours if no end time provided

    const startFormatted = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(dateObj);

    const endFormatted = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(endDate);

    return `${startFormatted} - ${endFormatted} EST`;
}