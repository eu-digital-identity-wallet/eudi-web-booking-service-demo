import MainLayout from "@/client/components/layout/MainLayout";
import "@/client/styles/tailwind.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, ...rest }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <MainLayout>
        <Component {...rest} />
      </MainLayout>
    </ThemeProvider>
  );
}
