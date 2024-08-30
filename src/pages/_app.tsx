import AppLayout from "@/client/components/AppLayout";
import "@/client/styles/tailwind.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, ...rest }: AppProps) {
  return (
    <AppLayout>
      <Component {...rest} />
    </AppLayout>
  );
}
