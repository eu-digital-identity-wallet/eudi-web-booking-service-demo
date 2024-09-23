import { Box } from "@mui/material";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import Header from "../organisms/Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => (
  <Fragment>
    <ToastContainer />
    <Header />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        pb: 4,
      }}
    >
      {children}
    </Box>
  </Fragment>
);

export default AppLayout;
