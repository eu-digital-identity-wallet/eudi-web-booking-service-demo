import { create } from "zustand";

export enum ModalStatus {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}
type Store = {
  modal: ModalStatus;
  deviceType: string;
  setDeviceType: (device: string) => void;
  changeModalStatus: () => void;
};

const useAppStore = create<Store>()((set) => ({
  modal: ModalStatus.CLOSE,
  deviceType: "",
  setDeviceType: (device: string) => set(() => ({ deviceType: device })),
  changeModalStatus: () =>
    set((state) => ({
      modal:
        state.modal === ModalStatus.CLOSE
          ? ModalStatus.OPEN
          : ModalStatus.CLOSE,
    })),
}));

export default useAppStore;
