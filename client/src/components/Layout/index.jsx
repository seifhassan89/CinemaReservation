import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import MiniDrawer, { closedDrawerWidth, drawerMargin, drawerWidth } from './Drawer';
import AppBar from './AppBar';
import { sideMenuItems } from '../../utils/SideMenuItems';
import { DrawerHeader } from './Drawer/components/StyledDrawerHeader';

const Layout = () => {
  const { isRtl } = useSelector((state) => state.locale);
  const { appBarTitle } = useSelector((state) => state.appHelpers);
  const { appBarContent, appBarMobileContent } = useSelector((state) => state.appHelpers);

  // initially false for mobile view
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        minHeight: '100vh',
      }}>
      {/* Top Bar */}
      <AppBar
        drawerOpen={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        appBarTitle={appBarTitle}
        appBarContent={appBarContent}
        appBarMobileContent={appBarMobileContent}
      />
      {/* side navigation */}
      <MiniDrawer
        handleDrawerToggle={handleDrawerToggle}
        open={drawerOpen}
        isRtl={isRtl}
        sideMenuItems={sideMenuItems}
      />
      <Box
        sx={{
          pt: 4,
          pr: '2rem',
          pl: { xs: '2rem', md: 0 },
          ml: {
            xs: 0,
            md: drawerOpen
              ? `calc(${drawerWidth}px + ${drawerMargin})`
              : `calc(${closedDrawerWidth} + ${drawerMargin})`,
          },

          width: `100%`,
          transition: (theme) =>
            theme.transitions.create(['margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}>
        <DrawerHeader />
        {/* Render The main component  */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
