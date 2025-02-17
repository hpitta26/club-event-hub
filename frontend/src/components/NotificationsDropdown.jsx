import React from "react";
import Dropdown from "./Dropdown";  // Import the reusable Dropdown component

const NotificationsDropdown = ({ isOpen, onClose }) => {
    // Define an array of notification options with labels and click handlers
    const notifications = [
        { label: "Invite", onClick: onClose }, // Example notification for an invite
        { label: "New event that user might be interested in", onClick: onClose }, // Event notification
        { label: "THIS IS A SUPER ROUGH PLACE HOLDER FOR NOTIF", onClick: onClose } // Placeholder notification
    ];

    // Render the Dropdown component with the notifications as options
    return <Dropdown isOpen={isOpen} options={notifications} onClose={onClose} />;
};

export default NotificationsDropdown; 
