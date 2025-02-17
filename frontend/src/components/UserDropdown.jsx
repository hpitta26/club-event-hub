import React from "react";
import Dropdown from "./Dropdown";

const UserDropdown = ({ isOpen, onLogout, onClose }) => {
    const options = [
        { label: "Account Info", onClick: () => console.log("Go to Account Info") },
        { label: "Settings", onClick: () => console.log("Go to Settings") },
        { label: "Log Out", onClick: onLogout }
    ];

    return <Dropdown isOpen={isOpen} options={options} onClose={onClose} />;
};

export default UserDropdown;
