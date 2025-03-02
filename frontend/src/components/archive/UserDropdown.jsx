import React, { useState } from "react";
import Dropdown from "./Dropdown";
import FollowingModal from "./FollowingModal";

const UserDropdown = ({ isOpen, onLogout, onClose }) => {
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);

  const options = [
    { label: "Account Info", onClick: () => console.log("Go to Account Info") },
    { label: "Settings", onClick: () => console.log("Go to Settings") },
    {
      label: "Following",
      onClick: () => {
        setIsFollowingOpen(true);
        onClose();
      },
    },
    { label: "Log Out", onClick: onLogout },
  ];

  return (
    <>
      <Dropdown isOpen={isOpen} options={options} onClose={onClose} />
      <FollowingModal
        isOpen={isFollowingOpen}
        onClose={() => setIsFollowingOpen(false)}
      />
    </>
  );
};

export default UserDropdown;
