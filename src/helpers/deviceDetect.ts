import DeviceDetector from "node-device-detector";
const deviceDetector = new DeviceDetector();

export function deviceDetect(userAgent: string = "") {
  const { device } = deviceDetector.detect(userAgent);
  const deviceType = device.type === "smartphone" ? "mobile" : "desktop";

  return deviceType;
}
