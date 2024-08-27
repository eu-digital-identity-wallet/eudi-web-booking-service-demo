import AppLayout from "@/components/AppLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, ...rest }: AppProps) {
  return (
    <AppLayout>
      <Component {...rest} />
    </AppLayout>
  );
}
