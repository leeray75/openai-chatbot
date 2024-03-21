"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link'


const pages = ['Chat', 'Image Generation'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function HeaderAppBar({ "user-data": userData }) {
  //console.log("[header-app-bar] userData:\n", userData);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const router = useRouter();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {

    return event => {
      switch (page) {
        case 'Chat':
          router.push("/chat");
          break;
        case 'Image Generation':
          router.push("/image-generation");
      }
      setAnchorElNav(null);
    }
  };

  const handleCloseUserMenu = (setting = null) => {

    return event => {
      console.log("[components][header][header-app-bar](handleCloseUserMenu) event:", event);
      console.log("[components][header][header-app-bar](handleCloseUserMenu) setting:", setting);
      switch (setting) {
        case 'Logout':
          (async () => {
            try {
              const response = await fetch('/api/user/logout', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                }
              });

              if (response.ok) {
                const { token } = await response.json();
                console.log("[components][header][header-app-bar](handleCloseUserMenu) Logout successful");
                router.push("/");
                // Handle successful login (e.g., store token in localStorage)
              } else {
                // Handle login error
                console.error('Logout failed');
              }
            } catch (error) {
              console.error('Error during logout:', error);
            }
          })();
          break;
      }
      setAnchorElUser(null);
    }
  };
  useEffect(() => {
    console.log("[header-app-bar] userData:\n", userData);
  }, [userData])
  return (
    <AppBar position="fixed" className="header-app-bar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link href="/">

              <Typography
                variant="span"
                noWrap
                component="span"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <AdbIcon />
                LOGO
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} className="user-account-container">
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderAppBar;

