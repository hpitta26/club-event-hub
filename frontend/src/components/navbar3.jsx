import React from 'react';
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
import gatherULogo from '../assets/icons/GatherUIcon.svg';

const pages = ['Following', 'Discover', 'Calender'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
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
        return { icon: <PersonRoundedIcon sx={{ fontSize: '1rem', mr: 0.5 }} />, hoverColor: '#FD4EB7' };
      case 'Discover':
        return { icon: <ExploreRoundedIcon sx={{ fontSize: '1rem', mr: 0.5 }} />, hoverColor: '#4D9FFD' };
      case 'Calender':
        return { icon: <CalendarMonthRoundedIcon sx={{ fontSize: '1rem', mr: 0.5 }} />, hoverColor: '#FDD74D' };
      default:
        return { icon: null, hoverColor: '#F0EFEB' };
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '36px !important', p: '0' }}>
          {/* Mobile Layout */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between'
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
              <img src={gatherULogo} alt="GatherU Logo" style={{ height: 24, width: 'auto' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User Avatar"
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      width: 24,
                      height: 24,
                      border: '2px solid transparent',
                      transition: 'border-color 0.3s ease'
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: '30px',
                  '& .MuiPaper-root': { backgroundColor: '#000000', color: '#F0EFEB' },
                  '& .MuiMenuItem-root': {
                    py: 0.5,
                    minHeight: '28px',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
                  }
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
                  <MenuItem key={setting} onClick={handleCloseUserMenu} sx={{ '&:hover': { color: '#4D9FFD' } }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '0.875rem' }}>{setting}</Typography>
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
              sx={{ '& .MuiPaper-root': { backgroundColor: '#000000', color: '#F0EFEB' } }}
            >
              {pages.map((page) => {
                const { icon } = getPageIcon(page);
                return (
                  <MenuItem key={page} onClick={handleCloseNavMenu} sx={{ py: 0.5 }}>
                    <Typography textAlign="center" sx={{ display: 'flex', alignItems: 'center' }}>
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
              alignItems: 'center'
            }}
          >
            <Box sx={{ width: 80, display: 'flex', alignItems: 'center' }}>
              <img src={gatherULogo} alt="GatherU Logo" style={{ height: 24, width: 'auto' }} />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {pages.map((page) => {
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
                      px: 1.5,
                      minWidth: 'auto',
                      mx: 0.5,
                      '&:hover': {
                        color: hoverColor,
                        transform: 'perspective(500px) translateZ(10px) scale(1.05)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '& .MuiSvgIcon-root': { color: hoverColor }
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#F0EFEB',
                        transition: 'color 0.3s ease'
                      }
                    }}
                  >
                    {icon}
                    {page}
                  </Button>
                );
              })}
            </Box>
            <Box sx={{ width: 80, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User Avatar"
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      width: 24,
                      height: 24,
                      border: '2px solid transparent',
                      transition: 'border-color 0.3s ease'
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: '30px',
                  '& .MuiPaper-root': { backgroundColor: '#000000', color: '#F0EFEB' },
                  '& .MuiMenuItem-root': {
                    py: 0.5,
                    minHeight: '28px',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
                  }
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
                  <MenuItem key={setting} onClick={handleCloseUserMenu} sx={{ '&:hover': { color: '#4D9FFD' } }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '0.875rem' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;