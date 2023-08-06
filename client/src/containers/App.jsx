import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";

import Loader from "../components/Loader";
import AppRoutes from "../routes/Routes";
import { getDesignTokens } from "../utils/Theme";
import Snackbar from "../components/Snackbar";
import "./App.scss";

const App = () => {
  const { isLoading } = useSelector((state) => state.loader);
  const { isRtl } = useSelector((state) => state.locale);

  const cacheLtr = createCache({
    key: "muiltr",
  });

  const cacheRtl = createCache({
    key: "muirtl",
    // prefixer is the only stylis plugin by default, so when
    // overriding the plugins you need to include it explicitly
    // if you want to retain the auto-prefixing behavior.
    stylisPlugins: [prefixer, rtlPlugin],
  });

  useLayoutEffect(() => {
    document.body.setAttribute("dir", isRtl ? "rtl" : "ltr");
  }, [isRtl]);

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={createTheme(getDesignTokens(isRtl))}>
        <CssBaseline />
        <AppRoutes />
        {isLoading && <Loader />}
        <Snackbar />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
