import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import { Box } from "@mui/material";

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
        bgcolor:"white",
        pb: 4,  
      }}
    >
      {children}
    </Box>
    <Footer />
  </Fragment>
);

export default AppLayout;
