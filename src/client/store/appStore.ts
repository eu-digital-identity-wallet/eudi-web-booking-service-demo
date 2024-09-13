import { create } from "zustand";

export enum ModalStatus {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}
type Store = {
  modal: ModalStatus;
  deviceType: string;
  setDeviceType: (device: string) => void;
  changeModalStatus: (modal: ModalStatus) => void;
};

const useAppStore = create<Store>()((set) => ({
  modal: ModalStatus.CLOSE,
  deviceType: "",
  setDeviceType: (device: string) => set(() => ({ deviceType: device })),

  changeModalStatus: (modal) => set({ modal }),
}));

export default useAppStore;
