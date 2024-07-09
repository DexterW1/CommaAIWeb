import { create } from "zustand";
type DeviceStore = {
  dongleID: string;
  deviceName: string;
  setDeviceName: (deviceName: string) => void;
  setDongleID: (dongleID: string) => void;
};
export const useDeviceStore = create<DeviceStore>((set) => ({
  dongleID: "",
  deviceName: "",
  setDongleID: (dongleID: string) => set({ dongleID }),
  setDeviceName: (deviceName: string) => set({ deviceName }),
}));
