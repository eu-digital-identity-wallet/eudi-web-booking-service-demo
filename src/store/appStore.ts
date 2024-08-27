import { create } from "zustand";

type Store = {
  deviceType: string;
  setDeviceType: (device: string) => void;
};

const useAppStore = create<Store>()((set) => ({
  deviceType: "",
  setDeviceType: (device: string) => set(() => ({ deviceType: device })),
}));



export default useAppStore;
