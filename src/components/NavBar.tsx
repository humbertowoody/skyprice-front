'use client';
import Link from 'next/link';
import ApartmentIcon from '@mui/icons-material/Apartment';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InfoIcon from '@mui/icons-material/Info';

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ zIndex: 1000 }}
        component="nav">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ApartmentIcon sx={{ mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                flexGrow: 1,
                fontWeight: 800,
                color: 'inherit',
                textDecoration: 'none',
              }}>
              SkyPrice
            </Typography>

            {/* Para pantallas medianas y grandes */}
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Button
                color="inherit"
                component={Link}
                href="/"
                sx={{
                  fontWeight: 600,
                  textTransform: 'none',
                }}>
                Estimación de Precio
              </Button>
              <Button
                color="inherit"
                component={Link}
                href="/acerca-de"
                sx={{
                  fontWeight: 600,
                  textTransform: 'none',
                }}>
                Acerca de
              </Button>
            </Box>

            {/* Para pantallas pequeñas */}
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
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
                }}>
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href="/">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MonetizationOnIcon sx={{ mr: 1 }} />{' '}
                    <Typography textAlign="center">
                      Estimación de Precio
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href="/acerca-de">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InfoIcon sx={{ mr: 1 }} />{' '}
                    <Typography textAlign="center">Acerca de</Typography>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}