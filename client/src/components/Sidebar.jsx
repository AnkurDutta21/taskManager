import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { menuItems } from './menuItems';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Box,
  Typography,
  Divider,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    borderRight: 'none',
    boxShadow: '4px 0 8px -3px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
  },
}));

const LogoSection = styled(Box)(({ theme }) => ({
  padding: '20px 24px',
  display: 'flex',
  alignItems: 'center',
  height: 70,
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  padding: '16px 24px 8px',
  letterSpacing: '0.5px',
}));

const CategoryHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  padding: '16px 24px 8px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: '4px 12px',
  borderRadius: '12px',
  backgroundColor:
    active === 'true' ? 'rgba(33, 150, 243, 0.08)' : 'transparent',
  color:
    active === 'true' ? theme.palette.primary.main : theme.palette.text.primary,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor:
      active === 'true' ? 'rgba(33, 150, 243, 0.12)' : 'rgba(0, 0, 0, 0.04)',
    transform: 'translateX(5px)',
  },
  '& .MuiListItemIcon-root': {
    color:
      active === 'true'
        ? theme.palette.primary.main
        : theme.palette.text.secondary,
  },
}));

const Sidebar = ({ open = true, mobileOpen = false, onMobileClose = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [expandedCategories, setExpandedCategories] = useState({
    main: true,
    Company: true,
    Department: true,
    Organization: true,
    CreateUsers: true,
    Assign: true,
    Management: true,
    Communication: true,
    MyWork: true,
    Alerts: true,
    Reports: true,
  });

  const filterMenuItems = (items) => {
    if (!items) return [];
    return items.filter((item) => {
      if (!item.roles) return true;
      // For now, show all items. You can add user role checking here later
      return true;
    });
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const isPathActive = (itemPath) => {
    if (itemPath.includes(':')) {
      const pathPattern = itemPath.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pathPattern}$`);
      return regex.test(location.pathname);
    }
    return location.pathname === itemPath;
  };

  const renderCategory = (title, items, category) => {
    const filteredItems = filterMenuItems(items);
    if (filteredItems.length === 0) return null;

    return (
      <>
        <CategoryHeader onClick={() => toggleCategory(category)}>
          <CategoryTitle sx={{ p: 0 }}>{title}</CategoryTitle>
          <IconButton size="small" sx={{ p: 0 }}>
            {expandedCategories[category] ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )}
          </IconButton>
        </CategoryHeader>
        <Collapse in={expandedCategories[category]} timeout="auto">
          <List>
            {filteredItems.map((item, index) => {
              const isActive = isPathActive(item.path);
              return (
                <StyledListItem
                  button
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    if (mobileOpen) onMobileClose();
                  }}
                  active={isActive ? 'true' : 'false'}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontWeight: isActive ? 600 : 400,
                      },
                    }}
                  />
                </StyledListItem>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  };

  const drawer = (
    <>
      <LogoSection sx={{ bgcolor: '#1E293B' }}>
        <Typography
          variant="h6"
          sx={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          TaskManager
        </Typography>
      </LogoSection>

      <Box
        sx={{
          mt: 2,
          px: 1,
          overflow: 'auto',
          height: 'calc(100vh - 70px)',
          overflowX: 'hidden',
        }}
      >
        {renderCategory('Main', menuItems.main, 'main')}
        {filterMenuItems(menuItems.main).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}

        {renderCategory('Company', menuItems.Company, 'Company')}
        {filterMenuItems(menuItems.Company).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}

        {renderCategory('Department', menuItems.Department, 'Department')}
        {filterMenuItems(menuItems.Department).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}

        {renderCategory('Create Users', menuItems.CreateUsers, 'CreateUsers')}
        {filterMenuItems(menuItems.CreateUsers).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}

        {renderCategory('Organization', menuItems.Organization, 'Organization')}
        {filterMenuItems(menuItems.Organization).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}

        {renderCategory('Assign', menuItems.Assign, 'Assign')}
        {filterMenuItems(menuItems.Assign).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}

        {renderCategory('Management', menuItems.Management, 'Management')}
        {filterMenuItems(menuItems.Management).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}

        {renderCategory('Communication', menuItems.Communication, 'Communication')}
        {filterMenuItems(menuItems.Communication).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}

        {renderCategory('My Work', menuItems.MyWork, 'MyWork')}
        {filterMenuItems(menuItems.MyWork).length > 0 && (
          <Divider sx={{ my: 2, opacity: 0.5 }} />
        )}
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            borderRight: 'none',
            boxShadow: '4px 0 8px -3px rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <StyledDrawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        {drawer}
      </StyledDrawer>
    </>
  );
};

export default Sidebar;
