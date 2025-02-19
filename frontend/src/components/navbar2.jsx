import * as React from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import gatherULogo from '../assets/icons/GatherUIcon.svg';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'; // calender
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'; //following
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded'; //Discover

const pages = ['Following', 'Discover', 'Calender'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
<AppBar 
  position="static" 
  sx={{ 
    backgroundColor: '#000000', // Black background
    '& .MuiToolbar-root': {
      minHeight: '40px !important',
      padding: '0 !important'
    }
  }}
>
  <Container 
    maxWidth="xl" 
    sx={{ 
      py: 0
    }}
  >
    <Toolbar 
      disableGutters 
      sx={{ 
        minHeight: '40px !important',
        padding: '2px 0'
      }}
    >
      {/* Logo Section - Using light gray */}
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
        <img
          src={gatherULogo}
          alt="GatherU Logo"
          style={{ height: 16, width: 'auto' }}
        />
      </Box>

      {/* Pages List - Centered with color transitions */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {pages.map((page) => {
          // Get the appropriate icon and color for each page
          let icon;
          let hoverColor;
          switch(page) {
            case 'Following':
              icon = <PersonRoundedIcon sx={{ fontSize: '1.1rem', mr: 0.5 }} />;
              hoverColor = '#FD4EB7'; // Pink
              break;
            case 'Discover':
              icon = <ExploreRoundedIcon sx={{ fontSize: '1.1rem', mr: 0.5 }} />;
              hoverColor = '#4D9FFD'; // Blue
              break;
            case 'Calender':
              icon = <CalendarMonthRoundedIcon sx={{ fontSize: '1.1rem', mr: 0.5 }} />;
              hoverColor = '#FDD74D'; // Yellow
              break;
            default:
              icon = null;
              hoverColor = '#F0EFEB'; // Light gray
          }

          return (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ 
                color: '#F0EFEB', // Light gray text
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                transition: 'all 0.3s ease',
                transform: 'perspective(500px) translateZ(0)',
                fontSize: '0.875rem',
                py: 0.5,
                px: 1.5,
                minWidth: 'auto',
                mx: 0.5,
                
                '&:hover': {
                  color: hoverColor,
                  transform: 'perspective(500px) translateZ(10px) scale(1.05)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', // Subtle highlight
                  '& .MuiSvgIcon-root': {
                    color: hoverColor, // Icon color changes too
                  }
                },

                '& .MuiSvgIcon-root': {
                  color: '#F0EFEB', // Light gray icons
                  transition: 'color 0.3s ease',
                }
              }}
            >
              {icon}
              {page}
            </Button>
          );
        })}
      </Box>

      {/* User Settings - Using light gray with hover effects */}
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton 
            onClick={handleOpenUserMenu} 
            sx={{ 
              p: 0,
              '&:hover': {
                '& .MuiAvatar-root': {
                  borderColor: '#4D9FFD', // Blue border on hover
                }
              }
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/2.jpg"
              sx={{ 
                width: 28, 
                height: 28,
                border: '2px solid transparent',
                transition: 'border-color 0.3s ease'
              }}
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ 
            mt: '35px',
            '& .MuiPaper-root': {
              backgroundColor: '#000000', // Black background for menu
              color: '#F0EFEB', // Light gray text
            },
            '& .MuiMenuItem-root': {
              py: 0.5,
              minHeight: '32px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)', // Subtle highlight
              }
            }
          }}
          id="menu-appbar"
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
              sx={{
                '&:hover': {
                  color: '#4D9FFD', // Blue text on hover
                }
              }}
            >
              <Typography sx={{ 
                textAlign: 'center',
                fontSize: '0.875rem'
              }}>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Toolbar>
  </Container>
</AppBar>
  );
}

export default ResponsiveAppBar;