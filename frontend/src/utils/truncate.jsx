export function truncate(eventTitle, maxLen) {
    return eventTitle.length > maxLen ? eventTitle.slice(0, maxLen) + "..." : eventTitle;
};