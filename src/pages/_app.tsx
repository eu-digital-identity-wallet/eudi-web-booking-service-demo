
import { env } from '@/env.mjs';
import { ThemeProvider } from '@mui/material/styles';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppContext, AppProps } from 'next/app';import "react-toastify/dist/ReactToastify.css";

import { createTheme } from '@mui/material/styles';
import AppLayout from '@/client/components/templates/AppLayout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366', // Deep blue
    },
    secondary: {
      main: '#FFD700', // Yellow/Orange
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#003366',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#003366',
    },
    body1: {
      fontSize: '1rem',
      color: '#333333',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#003366',
          boxShadow: 'none',
          borderBottom: '1px solid #dddddd',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 20px',
        },
        containedPrimary: {
          backgroundColor: '#003366',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#002244',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          fontSize: '1.5rem',
          fontWeight: 600,
          color: '#003366',
        },
      },
    },
  },
});


export default function App( props : AppProps) {
  const { Component, ...rest } = props;
  return (
    <AppCacheProvider {...props}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout >
          <Component {...rest} />
        </AppLayout>
      </ThemeProvider>
    </AppCacheProvider>
  );
  
}



