import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

import { closedMixin, openedMixin } from "./Mixins";
import { drawerWidth } from "..";

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  position: "fixed",
  zIndex: open ? theme.zIndex.drawer + 100 : theme.zIndex.drawer,
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme, drawerWidth),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
