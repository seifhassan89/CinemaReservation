import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import { drawerMargin, drawerWidth } from '../Drawer';
import messages from '../../../assets/locales/messages';
import { toggleLocale } from '../../../store/Locale/slice';
import { AppBar } from './components/StyledAppBar';
import { logoutRequest } from '../../../store/Auth/slice';

const CustomAppBar = ({ drawerOpen, handleDrawerOpen, appBarTitle, appBarContent, appBarMobileContent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { locale } = useSelector((state) => state.locale);
  const { shared } = messages[locale];

  const [anchorEl, setAnchorEl] = useState(null);
  // Dropdown menu for log out and toggle locale
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClicked = () => {
    dispatch(logoutRequest({ navigate }));
  };

  const handleToggleLocale = () => {
    dispatch(toggleLocale());
  };

  return (
    <AppBar
      position="absolute"
      sx={{
        borderRadius: {
          xs: 0,
          md: drawerOpen && '0 0 0 18px',
        },
        width: {
          xs: '100%',
          md: drawerOpen ? `calc(100% - ${drawerWidth}px - ${drawerMargin})` : '100%',
        },
        backgroundColor: 'secondary.main',
      }}>
      <Toolbar>
        {/* Burger icon to toggle short/long nav bar(Drawer) */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            position: 'absolute',
            mr: 5,
            ...(drawerOpen && { display: 'none' }),
          }}>
          <MenuIcon />
        </IconButton>
        {/* Title */}
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          noWrap
          sx={{
            flexGrow: 1,
            ml: { xs: 6, md: drawerOpen ? 3 : 6 },
            transition: (theme) =>
              theme.transitions.create(['margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }}>
          {appBarTitle}
        </Typography>
        {/* this content will be dynamic props based on view EX: =>  show searchBar With Filter BTN  */}
        {appBarContent}

        {/* icon for drop down menu to logout and change lang */}
        <IconButton
          size="large"
          aria-label="display more actions"
          edge="end"
          color="inherit"
          onClick={handleMenuClick}
          aria-controls={menuOpen ? 'actions-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? 'true' : undefined}>
          <MoreIcon />
        </IconButton>
      </Toolbar>
      <Menu
        disableScrollLock={true}
        anchorEl={anchorEl}
        id="actions-menu"
        open={menuOpen}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            color: 'text.input',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        data-testid={'actions-menu'}>
        {/* if Mobile => Then show Filter BTN In DropDown */}
        {appBarMobileContent?.map((item, i) => (
          <MenuItem
            key={i}
            sx={{
              display: { md: 'none' },
            }}
            onClick={() => {
              item.onClick();
              handleMenuClose();
            }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography>{item.label}</Typography>
          </MenuItem>
        ))}
        {/* Language */}
        <MenuItem
          onClick={() => {
            handleToggleLocale();
            handleMenuClose();
          }}>
          <ListItemIcon>
            <LanguageOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography>{shared?.toggleLocale}</Typography>
        </MenuItem>
        {/* Logout */}
        <MenuItem
          onClick={() => {
            handleLogoutClicked();
            handleMenuClose();
          }}>
          <ListItemIcon>
            <LogoutOutlined fontSize="small" />
          </ListItemIcon>
          {shared?.appBar.logout}
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default CustomAppBar;
