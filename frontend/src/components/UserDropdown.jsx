import React from "react";
import Dropdown from "./Dropdown"; // Import the reusable Dropdown component

const UserDropdown = ({ isOpen, onLogout, onClose }) => {
    // Define the dropdown options for user actions
    const options = [
        { 
            label: "Account Info", 
            onClick: () => console.log("Go to Account Info") // Placeholder action for navigating to account info
        },
        { 
            label: "Settings", 
            onClick: () => console.log("Go to Settings") // Placeholder action for navigating to settings
        },
        { 
            label: "Log Out", 
            onClick: onLogout // Calls the logout function when clicked
        }
    ];

    // Render the Dropdown component with user options
    return <Dropdown isOpen={isOpen} options={options} onClose={onClose} />;
};

export default UserDropdown; 
