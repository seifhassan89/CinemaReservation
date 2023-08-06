export const getDesignTokens = (isRtl) => ({
  direction: isRtl ? 'rtl' : 'ltr',
  palette: {
    mode: 'light',
    primary: { main: '#006BB6' },
    secondary: { main: '#172C49' },
    info: { main: '#ffffff' },
    text: {
      primary: '#ffffff',
      secondary: '#dddddd',
      input: '#000000',
      darkGrey: '#9c9c9c',
    },
    background: {
      default: '#041937',
      main: '#ffffff',
    },
    action: {
      disabledBackground: 'rgba(0, 107, 182, 0.5)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      iconHover: 'rgba(174, 171, 216, 0.13)',
      iconHoverDarker: 'rgba(174, 171, 216, 0.3)',
    },
    error: {
      main: '#d32f2f',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: isRtl ? ['"Univers-Regular"', 'sans-serif'].join(',') : ['"EMprint-Regular"', 'sans-serif'].join(','),
    body0: {
      fontFamily: isRtl ? 'Univers-Semibold' : 'EMprint-Semibold',
      fontSize: '1.35rem',
    },
    body1: {
      fontFamily: isRtl ? 'Univers-Regular' : 'EMprint-Regular',
      fontSize: '1.2rem',
    },
    body2: {
      fontFamily: isRtl ? 'Univers-Light' : 'EMprint-Light',
      fontSize: '1rem',
    },
    button: {
      fontFamily: isRtl ? 'Univers-Semibold' : 'EMprint-Semibold',
      fontSize: '1.25rem',
      textTransform: 'none',
    },
    h6: {
      fontSize: '1.2rem',
    },
    h5: {
      fontFamily: isRtl ? 'Univers-Semibold' : 'EMprint-Semibold',
    },
    h4: {
      fontFamily: isRtl ? 'Univers-Semibold' : 'EMprint-Semibold',
      fontSize: '2.5rem',
    },
    fontFamilyBold: isRtl ? ['"Univers-Bold"', 'sans-serif'].join(',') : ['"EMprint-Bold"', 'sans-serif'].join(','),
    fontFamilySemiBold: isRtl
      ? ['"Univers-Semibold"', 'sans-serif'].join(',')
      : ['"EMprint-Semibold"', 'sans-serif'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => `
        a {
          color: ${themeParam.palette.primary.main};
          font-size: small
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '0.75rem',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        body: {
          fontFamily: isRtl
            ? ['"Univers-Semibold"', 'sans-serif'].join(',')
            : ['"EMprint-Semibold"', 'sans-serif'].join(','),
        },
        head: {
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: '1px',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontFamily: isRtl
            ? ['"Univers-Semibold"', 'sans-serif'].join(',')
            : ['"EMprint-Semibold"', 'sans-serif'].join(','),
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          backgroundColor: '#041937',
          borderRadius: '8px',
        },
        inputRoot: {
          borderRadius: '8px',
        },
        tag: {
          backgroundColor: '#172C49',
        },
        endAdornment: {
          '& > button': {
            color: '#ffffff',
          },
        },
        listbox: {
          color: '#000000',
        },
        noOptions: {
          color: '#000000',
        },
        loading: {
          color: '#000000',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '20px',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          color: '#000000',
        },
      },
    },
  },
});
