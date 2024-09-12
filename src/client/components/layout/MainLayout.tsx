import { ReactNode } from "react";

import { Montserrat } from "next/font/google";

import { classNames } from "@/client/utils/classNames";
import { ToastContainer } from "react-toastify";
import Footer from "../Footer";
import Header from "../Header";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <div className={classNames("min-h-screen", montserrat.className)}>
        <ToastContainer />
        <Header />
        <main>{props.children}</main>
      </div>
      <Footer />
    </>
  );
}
