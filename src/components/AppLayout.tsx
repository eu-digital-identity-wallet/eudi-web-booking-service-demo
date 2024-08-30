import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Header from "./Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => (
  <Fragment>
    <ToastContainer />
    <Header />
    <div className="flex flex-col pb-10 bg-white">{children}</div>
    <Footer />
  </Fragment>
);

export default AppLayout;
