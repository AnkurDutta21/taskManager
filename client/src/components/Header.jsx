import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1E293B',
  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
  zIndex: theme.zIndex.drawer + 1,
}));

const Header = ({ onMenuClick, drawerWidth = 280 }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  
  // This would come from your auth context/state management
  const currentUser = {
    name: 'Admin',
    role: 'Administrator',
    email: 'admin@taskmanager.com',
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleProfileMenuClose();
    navigate('/profile');
  };

  const handleSettings = () => {
    handleProfileMenuClose();
    navigate('/settings');
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    // Add your logout logic here
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear auth tokens, user data, etc.
      localStorage.removeItem('authToken');
      navigate('/login');
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ minHeight: 70, height: 70 }}>
        {/* Menu Icon for Mobile */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{
            mr: 2,
            display: { md: 'none' },
            color: '#ffffff',
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* App Title */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            color: '#ffffff',
            fontWeight: 600,
            fontSize: { xs: '1rem', sm: '1.25rem' },
            display: 'block',
          }}
        >
          Pendulum
        </Typography>

        {/* Right Side - User Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* User Name and Role */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              textAlign: 'right',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: '#ffffff',
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {currentUser.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#94A3B8',
                fontSize: '0.75rem',
              }}
            >
              {currentUser.role}
            </Typography>
          </Box>

          {/* Profile Avatar */}
          <IconButton
            onClick={handleProfileMenuOpen}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={anchorEl ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? 'true' : undefined}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#3B82F6',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              {getInitials(currentUser.name)}
            </Avatar>
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          id="profile-menu"
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          onClick={handleProfileMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 220,
              borderRadius: 2,
              '& .MuiMenuItem-root': {
                px: 2,
                py: 1.5,
                borderRadius: 1,
                mx: 1,
                my: 0.5,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/* User Info in Menu */}
          <Box sx={{ px: 2, py: 1.5, mb: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B' }}>
              {currentUser.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.875rem' }}>
              {currentUser.email}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />

          {/* Menu Items */}
          <MenuItem onClick={handleProfile}>
            <ListItemIcon>
              <PersonIcon fontSize="small" sx={{ color: '#64748B' }} />
            </ListItemIcon>
            <Typography variant="body2">My Profile</Typography>
          </MenuItem>

          <MenuItem onClick={handleSettings}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" sx={{ color: '#64748B' }} />
            </ListItemIcon>
            <Typography variant="body2">Settings</Typography>
          </MenuItem>

          <Divider sx={{ my: 1 }} />

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: '#EF4444' }} />
            </ListItemIcon>
            <Typography variant="body2" sx={{ color: '#EF4444' }}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
