import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import gatherULogo from '../assets/icons/GatherUIcon.svg';
import SearchBar from './searchBar';

function ResponsiveAppBar() {
  
  const [openSearch, setOpenSearch] = useState(false);

  //controls for the navbar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpenSearch(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const userType = 'club';

  let leftPages = [];
  let rightPage = null;
  let mobilePages = [];
  let settings = [];

  if (userType === 'user') {
    leftPages = ['Analytics', 'Events', 'Dashboard'];
    mobilePages = leftPages;
    settings = ['Manage Club', 'Logout'];
  } else if (userType === 'loggedOut') {
    leftPages = ['Home', 'About'];
    mobilePages = leftPages;
    settings = ['Login', 'Register'];
  } else {
    leftPages = ['Following', 'Discover'];
    rightPage = 'Your Events';
    mobilePages = ['Following', 'Discover', 'Your Events'];
    settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getPageIcon = (page) => {
    switch (page) {
      case 'Following':
        return {
          icon: <PersonRoundedIcon sx={{ fontSize: '1rem', mr: 0.0 }} />,
          hoverColor: '#FD4EB7',
        };
      case 'Discover':
        return {
          icon: <ExploreRoundedIcon sx={{ fontSize: '1rem', mr: 0.0 }} />,
          hoverColor: '#4D9FFD',
        };
      case 'Your Events':
        return {
          icon: <CalendarMonthRoundedIcon sx={{ fontSize: '1rem', mr: 0.5 }} />,
          hoverColor: '#FDD74D',
        };
      case 'Analytics':
        return {
          icon: <AnalyticsIcon sx={{ fontSize: '1rem', mr: 0.5 }} />,
          hoverColor: '#FD4EB7',
        };
      case 'Events':
        return {
          icon: <EventNoteRoundedIcon sx={{ fontSize: '1rem', mr: 0.5 }} />,
          hoverColor: '#4D9FFD',
        };
      case 'Dashboard':
        return {
          icon: <DashboardRoundedIcon sx={{ fontSize: '1rem', mr: 0.5 }} />,
          hoverColor: '#FDD74D',
        };
      case 'Home':
        return {
          icon: <HomeRoundedIcon sx={{ fontSize: '1rem', mr: 0.5 }} />,
          hoverColor: '#FD4EB7',
        };
      case 'About':
        return {
          icon: <InfoRoundedIcon sx={{ fontSize: '1rem', mr: 0.5 }} />,
          hoverColor: '#4D9FFD',
        };
      default:
        return { icon: null, hoverColor: '#F0EFEB' };
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '36px !important', p: 0 }}>
          {/* Mobile Layout */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IconButton
              size="small"
              aria-label="navigation menu"
              aria-controls="menu-appbar-mobile"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ p: 0 }}
            >
              <MenuIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={gatherULogo}
                alt="GatherU Logo"
                style={{ height: 24, width: 'auto' }}
              />
            </Box>

            {/* Mobile Right Section: includes Search and User Avatar */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Search trigger in Mobile */}
              <Box
                onClick={() => setOpenSearch(true)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid rgba(255,255,255,0.5)',
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  cursor: 'pointer',
                  marginRight: '8px',
                }}
              >
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Search...
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Ctrl + K
                </Typography>
              </Box>

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User Avatar"
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      width: 24,
                      height: 24,
                      border: '2px solid transparent',
                      transition: 'border-color 0.3s ease',
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: '30px',
                  '& .MuiPaper-root': {
                    backgroundColor: '#000000',
                    color: '#F0EFEB',
                  },
                  '& .MuiMenuItem-root': {
                    py: 0.5,
                    minHeight: '28px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                  },
                }}
                id="menu-appbar-user"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={handleCloseUserMenu}
                    sx={{ '&:hover': { color: '#4D9FFD' } }}
                  >
                    <Typography sx={{ textAlign: 'center', fontSize: '0.875rem' }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Menu
              id="menu-appbar-mobile"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                '& .MuiPaper-root': { backgroundColor: '#000000', color: '#F0EFEB' },
              }}
            >
              {mobilePages.map((page) => {
                const { icon } = getPageIcon(page);
                return (
                  <MenuItem key={page} onClick={handleCloseNavMenu} sx={{ py: 0.5 }}>
                    <Typography
                      textAlign="center"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      {icon}
                      {page}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          {/* Desktop Layout */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              width: '100%',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Left: Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <img
                src={gatherULogo}
                alt="GatherU Logo"
                style={{ height: 24, width: 'auto' }}
              />
            </Box>

            {/* Center: Navigation Pages (Following, Discover) */}
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {leftPages.map((page) => {
                const { icon, hoverColor } = getPageIcon(page);
                return (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      color: '#F0EFEB',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.3s ease',
                      transform: 'perspective(500px) translateZ(0)',
                      fontSize: '0.875rem',
                      py: 0.25,
                      px: 2.0,
                      minWidth: 'auto',
                      mx: 0.0,
                      '&:hover': {
                        color: hoverColor,
                        transform: 'perspective(500px) translateZ(10px) scale(1.05)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '& .MuiSvgIcon-root': { color: hoverColor },
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#F0EFEB',
                        transition: 'color 0.3s ease',
                      },
                    }}
                  >
                    {icon}
                    {page}
                  </Button>
                );
              })}
            </Box>

            {/* Right: "Your Events" and User Avatar/Settings */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                marginLeft: 'auto', // push to the right
                gap: 1,
              }}
            >
              {/* If userType is "user" and there's a rightPage, display it */}
              {userType === 'user' && rightPage && (
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: '#F0EFEB',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    transform: 'perspective(500px) translateZ(0)',
                    fontSize: '0.875rem',
                    py: 0.25,
                    px: 1.5,
                    minWidth: 'auto',
                    '&:hover': {
                      color: getPageIcon(rightPage).hoverColor,
                      transform: 'perspective(500px) translateZ(10px) scale(1.05)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '& .MuiSvgIcon-root': {
                        color: getPageIcon(rightPage).hoverColor,
                      },
                    },
                    '& .MuiSvgIcon-root': {
                      color: '#F0EFEB',
                      transition: 'color 0.3s ease',
                    },
                  }}
                >
                  {getPageIcon(rightPage).icon}
                  {rightPage}
                </Button>
              )}

              {/* Search trigger in Desktop */}
              <Box
                onClick={() => setOpenSearch(true)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid rgba(255,255,255,0.5)',
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  cursor: 'pointer',
                }}
              >
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Search...
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Ctrl + K
                </Typography>
              </Box>

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User Avatar"
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      width: 24,
                      height: 24,
                      border: '2px solid transparent',
                      transition: 'border-color 0.3s ease',
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: '30px',
                  '& .MuiPaper-root': {
                    backgroundColor: '#000000',
                    color: '#F0EFEB',
                  },
                  '& .MuiMenuItem-root': {
                    py: 0.5,
                    minHeight: '28px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                  },
                }}
                id="menu-appbar-user"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={handleCloseUserMenu}
                    sx={{ '&:hover': { color: '#4D9FFD' } }}
                  >
                    <Typography sx={{ textAlign: 'center', fontSize: '0.875rem' }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
      {/* 4) Render the SearchBar component, controlling its open state */}
      <SearchBar open={openSearch} onClose={() => setOpenSearch(false)} />
    </AppBar>
  );
}

export default ResponsiveAppBar;
