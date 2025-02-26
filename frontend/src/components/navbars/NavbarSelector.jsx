import React, { useContext } from 'react';
import LoggedOutNavbar from './LoggedOutNavbar';
import StudentNavbar from './StudentNavbar.jsx';
import ClubNavbar from './ClubNavbar';
import { UserContext } from '../../context/UserContext.jsx';

const NavbarSelector = () => {
  const { userContext } = useContext(UserContext);
  const navbarType = '' // Just type in Student or Club here to test the different navbars for now

  if (userContext == null) {
    console.log(`navbar rendering --> ${JSON.stringify(userContext)}`);
    return <LoggedOutNavbar />;
  } else if (userContext['role'] === 'STUDENT') {
    console.log(`navbar rendering --> ${JSON.stringify(userContext)}`);
    return <StudentNavbar />;
  } else if (userContext['role'] === 'CLUB') {
    console.log(`navbar rendering --> ${JSON.stringify(userContext)}`);
    return <ClubNavbar />;
  }

  // switch (navbarType) { // change between User,club and navbarlogic
  //   case 'STUDENT':
  //     return <StudentNavbar />;
  //   case 'CLUB':
  //     return <ClubNavbar />;
  //   default:
  //     return <LoggedOutNavbar />; // Fallback for unexpected user types
  // }
};

export default NavbarSelector;