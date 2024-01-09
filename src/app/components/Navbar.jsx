'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
// import Icon from '@mui/material/Icon';
// import Icon from '@mui/icons-material';
import AdbIcon from '@mui/icons-material/Adb';
import Link from '@mui/material/Link';
import { useRouter, usePathname } from 'next/navigation';
import { blue } from '@mui/material/colors';
import { signOut } from "next-auth/react";
// import { Icon, Stack } from '@mui/material';
// import { Icon, Stack } from '@mui/material';

const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const settings = ['Logout'];

function Navbar({ hiddenLogin = false, session }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [login, setLogin] = React.useState(false)
  // let login = false
  // const router = useRouter()
  const pathname = usePathname()
  if (pathname === '/login' || pathname === '/register' || pathname === '/dashboard') {
    hiddenLogin = true
  }

  React.useEffect(() => {
    if (session) {
      console.log(session)
      // hiddenLogin = false
      // setLogin(true)
    }
  }, [session, pathname])
  // React.useEffect(()=>{

  // },[pathname])


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
    <AppBar position="static" color='inherit' >
      <Container maxWidth="xl">
        <Toolbar >
          <a href="/">
            <img src="/logo.png" alt="logo" width={120} />
          </a>


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
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <a href="/">
            <img src="/logo.png" alt="logo" />
          </a> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {session ?
              // login ?
              <Tooltip title="Open settings">
                <Stack direction={'row'} gap={2}>
                  <Stack direction={'row'} gap={1}>
                    <IconButton>
                      <NotificationsIcon sx={{ color: blue[500] }}></NotificationsIcon>
                    </IconButton>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ bgcolor: blue[500], width: 36, height: 36 }} alt={session.name} src={session.img} variant='rounded' />
                    </IconButton>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={500}>{session.name}</Typography>
                    <Typography fontSize={12}>{session.role}</Typography>
                  </Stack>
                </Stack>
              </Tooltip>
              : hiddenLogin ? null :
                <Button href='/login'>Login</Button>
            }

            <Menu
              sx={{ mt: '38px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Button onClick={signOut} textAlign="center">Logout</Button>
              </MenuItem>
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
