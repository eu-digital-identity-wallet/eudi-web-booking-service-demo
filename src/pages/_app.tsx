import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";

import AppLayout from "@/client/components/organisms/AppLayout";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003680", // Deep blue
    },
    secondary: {
      main: "#FEB902", // Yellow/Orange
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#003680",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#003680",
    },
    body1: {
      fontSize: "1rem",
      color: "#000000",
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minWidth: "412px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#003680",
          boxShadow: "none",
          borderBottom: "1px solid #dddddd",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 20px",
        },
        containedPrimary: {
          backgroundColor: "#0070C2",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#003680",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          fontSize: "1.3rem",
          fontWeight: 600,
          color: "#000000",
        },
      },
    },
  },
});

export default function App(props: AppProps) {
  const { Component, ...rest } = props;
  return (
    <AppCacheProvider {...props}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout>
          <Component {...rest} />
        </AppLayout>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
