import React, { useContext } from 'react';
import LoggedOutNavbar from './LoggedOutNavbar';
import UserNavbar from './UserNavbar';
import ClubNavbar from './ClubNavbar';
import { UserContext } from '../../context/UserContext.jsx';

const NavbarSelector = () => {
  const { userContext } = useContext(UserContext);

  if (!userContext) {
    return <LoggedOutNavbar />; //FOR TESTING CHANGE IT HERE !!!! STILL WORKING ON THIS LOGIC
  }

  switch (userContext.userType) { // change between User,club and navbarlogic
    case 'User':
      return <UserNavbar />;
    case 'club':
      return <ClubNavbar />;
    default:
      return <LoggedOutNavbar />; // Fallback for unexpected user types
  }
};

export default NavbarSelector;