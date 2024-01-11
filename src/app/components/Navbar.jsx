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
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import Icon from '@mui/material/Icon';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
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
const drawerWidth = 250;

const navItems = {
  1: ['Dashboard', 'Data Semua Kos', 'Cari kos', 'Data Pengguna', 'Pengaturan'],
  2: ['Dashboard', 'Kos Saya', 'Cari kos', 'Transaksi', 'Pengaturan'],
  3: ['Dashboard', 'Data Kos Saya', 'Cari kos', 'Penghuni', 'Transaksi', 'Pengaturan']
};
const navIcons = {
  1: ['dashboard', 'home', 'search', 'person', 'settings'],
  2: ['dashboard', 'home', 'search', 'receipt', 'settings'],
  3: ['dashboard', 'home', 'search', 'person', 'receipt', 'settings']
};
const navLinks = {
  1: ['/', '/kos', '/find', '/users', '/settings'],
  2: ['/', '/kos', '/find', '/transaction', '/settings'],
  3: ['/', '/kos', '/find', '/penghuni', '/transaction', '/settings'],
}

function Navbar({ hiddenLogin = false, session }, props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter()
  const { window } = props
  const pathname = usePathname()
  if (pathname === '/login' || pathname === '/register' || pathname === '/dashboard') {
    hiddenLogin = true
  }

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container = window !== undefined ? () => window().document.body : undefined;


  const navItem = navItems[session?.id_role] ?? []
  const navIcon = navIcons[session?.id_role] ?? []
  const navLink = navLinks[session?.id_role] ?? []


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', paddingX: 1, margin: 2 }}>
      <Button href='/' sx={{ marginBottom: 2 }} >
        <img src="/logo.png" alt="logo" width={140} />
      </Button>
      <Divider />
      <List>
        {navItem.map((item, idx) => (
          <ListItem key={item} disablePadding>
            <ListItemButton href={`/dashboard${navLink[idx]}`}  sx={{ color: blue[500] }}>
              <ListItemIcon>
                <Icon sx={{ color: blue[500] }}>{navIcon[idx]}</Icon>
              </ListItemIcon>
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
                      <Typography fontWeight={500}>{session.name.slice(0,10)}</Typography>
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
                  <Button onClick={signOut} >Logout</Button>
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
