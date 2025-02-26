import React, { useContext } from 'react';
import LoggedOutNavbar from './LoggedOutNavbar';
import StudentNavbar from './StudentNavbar.jsx';
import ClubNavbar from './ClubNavbar';
import { UserContext } from '../../context/UserContext.jsx';

const NavbarSelector = () => {
  const { userContext } = useContext(UserContext);

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
};

export default NavbarSelector;