import React, { useContext } from 'react';
import LoggedOutNavbar from './LoggedOutNavbar';
import StudentNavbar from './StudentNavbar.jsx';
import ClubNavbar from './ClubNavbar';
import { UserContext } from '../../context/UserContext.jsx';

const NavbarSelector = () => {
  const { userContext } = useContext(UserContext);
  const navbarType = 'Student'

  // if (navbarType === 'LoggedOut') {
  //   return <LoggedOutNavbar />; //FOR TESTING CHANGE IT HERE !!!! STILL WORKING ON THIS LOGIC
  // }

  switch (navbarType) { // change between User,club and navbarlogic
    case 'Student':
      return <StudentNavbar />;
    case 'Club':
      return <ClubNavbar />;
    default:
      return <LoggedOutNavbar />; // Fallback for unexpected user types
  }
};

export default NavbarSelector;