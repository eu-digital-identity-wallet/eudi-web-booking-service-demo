import TravelBook from "@/components/TravelBook";
import { deviceDetect } from "@/shared/deviceDetect";
import useAppStore from "@/store/appStore";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import { useEffect } from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return deviceDetect(context);
}

export default function Home(props: AppProps) {
  const { setDeviceType } = useAppStore();

  useEffect(() => {
    setDeviceType(props.pageProps.deviceType);
  }, [props.pageProps.deviceType, setDeviceType]);
  return <TravelBook />;
}
