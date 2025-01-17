import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, Drawer, List, ListItem, ListItemButton, ListItemText, Avatar, Tooltip, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { mostrarAlerta } from '@/components/sweetAlert/ModalAlerts';

interface Page {
  label: string;
  path: string;
}

interface ResponsiveAppBarProps {
  pages?: Page[]; // Personalización de las páginas
  avatarSrc?: string; // Personalización de la imagen del avatar
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({
  pages = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],
  avatarSrc = '/static/images/avatar/default.jpg', // Valor por defecto
}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNavigation = (path: string) => {
    setDrawerOpen(false);
    router.push(path);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserOption = async (option: string) => {
    handleCloseUserMenu();
    if (option === 'Cerrar sesión') {
      try {
        const response = await fetch('/api/logout', { method: 'POST' });
        if (response.ok) {
          router.push('/');
        } else {
          mostrarAlerta('Error al cerrar sesión', 'No sabemos que ha pasado', 'Aceptar', 'error');
        }
      } catch (err) {
        mostrarAlerta('Error al conectar con el servidor', `${err}`, 'Aceptar', 'error');
      }
    } else if (option === 'Perfil') {
      router.push('/perfil');
    }
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {pages.map((page) => (
          <ListItem key={page.label} disablePadding>
            <ListItemButton onClick={() => handleNavigation(page.path)}>
              <ListItemText primary={page.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerList}
            </Drawer>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 2,
              justifyContent: { xs: 'center', md: 'flex-start' },
              textAlign: 'center',
              width: { xs: '100%', md: 'auto' },
            }}
          >
            <Image
              src="/LOGO.png"
              alt="Logo club de leones"
              width={70}
              height={70}
              priority
              style={{ cursor: 'pointer' }}
              onClick={() => (window.location.href = '/')}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleNavigation(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src={avatarSrc} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => handleUserOption('Perfil')}>
                <Typography textAlign="center">Perfil</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleUserOption('Cerrar sesión')}>
                <Typography textAlign="center">Cerrar sesión</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
