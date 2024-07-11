import { create } from "zustand";
import {
  getAccount,
  getDevice,
  getDeviceStats,
  getSegments,
} from "@/api/getters";
type DeviceStore = {
  device: object;
  stats: object;
  profile: object;
  segments: [];
  dongleID: string;
  deviceLoading: boolean;
  setStats: (stats: object) => void;
  setDongleID: (dongleID: string) => void;
  setDevice: (device: object) => void;
  setProfile: (profile: object) => void;
  setSegments: (segments: []) => void;
  fetchDeviceData: () => void;
  fetchSegments: () => void;
  fetchProfile: () => void;
  fetchAllData: () => void;
};
export const useDeviceStore = create<DeviceStore>((set, get) => ({
  dongleID: "",
  device: {},
  segments: [],
  profile: {},
  stats: {},
  deviceLoading: true,
  setStats: (stats: object) => set({ stats }),
  setDongleID: (dongleID: string) => set({ dongleID }),
  setDevice: (device: object) => set({ device }),
  setProfile: (profile: object) => set({ profile }),
  setSegments: (segments: []) => set({ segments }),
  fetchDeviceData: async () => {
    const dataDevice = await getDevice();
    set({ device: dataDevice[0] });
    set({ dongleID: dataDevice[0].dongle_id });
  },
  fetchProfile: async () => {
    const dongleID = get().dongleID;
    const dataProfile = await getAccount();
    const dataStats = await getDeviceStats(dongleID);
    set({ stats: dataStats });
    set({ profile: dataProfile });
  },
  fetchSegments: async () => {
    const dongleID = get().dongleID;
    const limit = 3;
    set({ segments: await getSegments(dongleID, limit) });
  },
  fetchAllData: async () => {
    await get().fetchDeviceData();
    await get().fetchProfile();
    await get().fetchSegments();
    set({ deviceLoading: false });
  },
}));
