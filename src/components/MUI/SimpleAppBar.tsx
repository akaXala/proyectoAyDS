import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Avatar, Tooltip, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';

// DOM de NextJS
import Image from 'next/image';

// Alertas de SweetAlert
import { mostrarAlerta } from '@/components/sweetAlert/ModalAlerts';

const userOptions = ['Perfil', 'Cerrar sesión'];

interface SimpleAppBarProps {
  logoText: string;
  avatarSrc: string;
}

const SimpleAppBar: React.FC<SimpleAppBarProps> = ({ logoText, avatarSrc }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserOption = async (option: string) => {
    handleCloseUserMenu();
    if (option === 'Cerrar sesión') {
      // Cerrar sesión
      try {
        const response = await fetch("/api/logout", { method: "POST" });
        if (response.ok) {
          router.push('/'); // Redirigir al login
        } else {
          mostrarAlerta("Error al cerrar sesión", "No sabemos que ha pasado", "Aceptar", "error");
        }
      } catch (err) {
        mostrarAlerta("Error al conectar con el servidor", `${err}`, "Aceptar", "error");
      }
    } else if (option === 'Perfil') {
      router.push('/perfil');
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 2,
              justifyContent: { xs: 'flex-start' },
              textAlign: 'center',
              width: { xs: '100%', md: 'auto' },
              flexGrow: 1,
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
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                ml: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {logoText}
            </Typography>
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
              {userOptions.map((option) => (
                <MenuItem key={option} onClick={() => handleUserOption(option)}>
                  <Typography textAlign="center">{option}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default SimpleAppBar;
