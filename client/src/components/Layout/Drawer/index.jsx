import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Backdrop from '@mui/material/Backdrop';

import Logo from '../../../assets/Images/cima.png';
import { ROUTES_PATHS } from '../../../utils/RoutesPaths';
import messages from '../../../assets/locales/messages';
import { Drawer } from './components/StyledDrawer';
import { DrawerHeader } from './components/StyledDrawerHeader';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';

export const drawerWidth = 242;
export const closedDrawerWidth = '4.5rem';
export const drawerMargin = '1rem';

export default function MiniDrawer({ open, handleDrawerToggle, isRtl, sideMenuItems }) {
  const location = useLocation();
  const [path, setPath] = useState('');

  const { locale } = useSelector((state) => state.locale);
  const { shared } = messages[locale];

  const [openItemsIds, setOpenItemsIds] = useState([]);

  const handleItemClick = (itemId) => {
    if (openItemsIds.includes(itemId)) {
      setOpenItemsIds(openItemsIds.filter((item) => item !== itemId));
    } else {
      setOpenItemsIds([...openItemsIds, itemId]);
    }
  };

  useEffect(() => {
    setPath(location.pathname);
  }, [location, setPath]);

  const activeRoute = (activekeys) => {
    return activekeys.some((key) => path.includes(key));
  };

  const handleBackdropClick = () => {
    if (open) {
      handleDrawerToggle();
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: 'secondary.main',
            color: 'text.primary',
          },
        }}>
        <DrawerHeader>
          <Box
            sx={{
              textAlign: 'center',
            }}>
            <Link to={ROUTES_PATHS.movies}>
              <img src={Logo} alt="Cima" width={open ? '60%' : 0} />
            </Link>
          </Box>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              '&:hover': {
                backgroundColor: 'action.iconHover',
              },
            }}>
            {(isRtl && open) || (!isRtl && !open) ? (
              <ChevronRightIcon sx={{ color: 'text.primary' }} />
            ) : (
              <ChevronLeftIcon sx={{ color: 'text.primary' }} />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {sideMenuItems.map(({ id, title, icon, slug, activekeys, hasChildren, children }) =>
            hasChildren ? (
              <div key={id}>
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleItemClick(id)}>
                  <ListItemButton
                    selected={activeRoute(activekeys)}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      '&.Mui-selected': {
                        backgroundColor: 'action.iconHoverDarker',
                        '&:hover': {
                          backgroundColor: 'action.iconHoverDarker',
                          opacity: 0.8,
                        },
                      },
                    }}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={shared?.drawer[title]}
                      sx={(theme) => ({
                        opacity: open ? 1 : 0,
                        '&>span': {
                          fontFamily: activeRoute(activekeys) && theme.typography.fontFamilySemiBold,
                        },
                      })}
                    />
                    {openItemsIds.includes(id) ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                {/* Nested List */}
                <Collapse in={openItemsIds.includes(id)} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {children.map((child, index) => (
                      <Link to={child.slug} key={index} style={{ color: 'white' }}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                          <ListItemButton
                            selected={activeRoute(child.activekeys)}
                            sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              pr: 2.5,
                              pl: 5,
                              '&:hover': {
                                backgroundColor: 'action.iconHover',
                              },
                              '&.Mui-selected': {
                                backgroundColor: 'action.iconHover',
                                borderLeft: '5px solid',
                                borderColor: 'action.iconHoverDarker',
                                '&:hover': {
                                  backgroundColor: 'action.iconHover',
                                  opacity: 0.8,
                                },
                              },
                            }}>
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                              }}>
                              {child.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={shared?.drawer[child.title]}
                              sx={(theme) => ({
                                opacity: open ? 1 : 0,
                                '&>span': {
                                  fontFamily: activeRoute(activekeys) && theme.typography.fontFamilySemiBold,
                                  fontSize: '1rem',
                                  minHeight: '25px',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                },
                              })}
                            />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </div>
            ) : (
              <Link to={slug} key={id} style={{ color: 'white' }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    selected={activeRoute(activekeys)}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      my: 1,
                      '&:hover': {
                        backgroundColor: 'action.iconHover',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'action.iconHover',
                        borderLeft: '5px solid',
                        borderColor: 'action.iconHoverDarker',
                        '&:hover': {
                          backgroundColor: 'action.iconHover',
                          opacity: 0.8,
                        },
                      },
                    }}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'text.primary',
                      }}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={shared?.drawer[title]}
                      sx={(theme) => ({
                        opacity: open ? 1 : 0,
                        '&>span': {
                          fontFamily: activeRoute(activekeys) && theme.typography.fontFamilySemiBold,
                        },
                      })}
                      data-testid={'list-item-text'}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
          )}
        </List>
      </Drawer>
      <Backdrop open={open} onClick={handleBackdropClick} sx={{ display: { md: 'none' } }} />
    </Box>
  );
}
