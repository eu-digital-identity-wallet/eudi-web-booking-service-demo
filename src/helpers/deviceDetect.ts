import { GetServerSidePropsContext } from "next/types";
import DeviceDetector from "node-device-detector";
const deviceDetector = new DeviceDetector();

export function deviceDetect(userAgent: string = "") {
  const { device } = deviceDetector.detect(userAgent);
  const deviceType = device.type === "smartphone" ? "mobile" : "desktop";

  return deviceType;
}


export const getDeviceTypeProps = (context: GetServerSidePropsContext) => {
  const deviceType = deviceDetect(context.req.headers['user-agent'] ?? '');
  return { props: { deviceType } };
};
