import { create } from "zustand";
type DeviceStore = {
  dongleID: string;
  deviceName: string;
  user: {
    email: string;
    id: string;
    prime: boolean;
    regdate: number;
    superuser: boolean;
    user_id: string;
    username?: string;
  };
  setDeviceName: (deviceName: string) => void;
  setDongleID: (dongleID: string) => void;
  setUser: (user: any) => void;
};
export const useDeviceStore = create<DeviceStore>((set) => ({
  dongleID: "",
  deviceName: "",
  user: {
    email: "",
    id: "",
    prime: false,
    regdate: 0,
    superuser: false,
    user_id: "",
  },
  setDongleID: (dongleID: string) => set({ dongleID }),
  setDeviceName: (deviceName: string) => set({ deviceName }),
  setUser: (user: object) => set({ user }),
}));
