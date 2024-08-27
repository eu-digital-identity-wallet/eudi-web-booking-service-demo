import { GetServerSidePropsContext } from "next";
import DeviceDetector from "node-device-detector";
const deviceDetector = new DeviceDetector();

export async function deviceDetect(context: GetServerSidePropsContext) {
  const UA = context.req.headers["user-agent"] ?? "";

  const { device } = deviceDetector.detect(UA);

  return {
    props: {
      deviceType: device.type === "smartphone" ? "mobile" : "desktop",
    },
  };
}
