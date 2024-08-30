import BookingCreate from "@/client/components/BookingCreate";
import useAppStore from "@/client/store/appStore";
import { deviceDetect } from "@/helpers/deviceDetect";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import { useEffect } from "react";

export function getServerSideProps(context: GetServerSidePropsContext) {
  const deviceType = deviceDetect(context.req.headers["user-agent"] ?? "");
  return { props: { deviceType } };
}

export default function Home(props: AppProps) {
  const { setDeviceType } = useAppStore();

  useEffect(() => {
    setDeviceType(props.pageProps.deviceType);
  }, [props.pageProps.deviceType, setDeviceType]);
  return <BookingCreate />;
}
