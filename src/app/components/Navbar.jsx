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
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

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
const drawerWidth = 240;
const navItems = ['Dashboard', 'Data Semua Kos', 'Cari kos', 'Data Pengguna', 'Pengaturan'];

function Navbar({ hiddenLogin = false, session }, props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [login, setLogin] = React.useState(false)
  // let login = false
  // const router = useRouter()
  const { window } = props
  const pathname = usePathname()
  if (pathname === '/login' || pathname === '/register' || pathname === '/dashboard') {
    hiddenLogin = true
  }

  // React.useEffect(() => {
  //   if (session) {
  //     console.log(session)
  //     // hiddenLogin = false
  //     // setLogin(true)
  //   }
  // }, [session, pathname])
  // React.useEffect(()=>{

  // },[pathname])

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', paddingX: 2, margin: 2 }}>
      <Button href='/' sx={{ marginBottom: 2 }} >
        <img src="/logo.png" alt="logo" width={140} />
      </Button>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ color: blue[500] }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
    <>
      <AppBar position="static" color='inherit' >
        <Container maxWidth="xl">
          <Toolbar >
            {
              !session &&
              <a href="/">
                <img src="/logo.png" alt="logo" width={120} />
              </a>
            }
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {/* <IconButton
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
              </Menu> */}
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

              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <nav> */}
      {session &&
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        // <Drawer
        //   sx={{
        //     display: { xs: 'block', sm: 'block' },

        //   }}
        //   anchor={'left'}
        //   variant='persistent'
        //   open={true}
        //   onClose={() => { }}
        // >
        //   {drawer}
        //   {/* {list(anchor)} */}
        // </Drawer>
      }
      {/* <Drawer
          container={container}
          variant="temporary"
          open={true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer> */}
      {/* </nav> */}
    </>
  );
}
export default Navbar;
