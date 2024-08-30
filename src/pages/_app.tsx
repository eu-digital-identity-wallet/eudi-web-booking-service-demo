import AppLayout from "@/components/AppLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, ...rest }: AppProps) {
  return (
    <AppLayout>
      <Component {...rest} />
    </AppLayout>
  );
}
