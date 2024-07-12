import { create } from "zustand";
import {
  getAccount,
  getDevice,
  getDeviceStats,
  getSegments,
} from "@/api/getters";
type DeviceStore = {
  limit: number;
  device: object;
  stats: object;
  profile: object;
  segments: [];
  dongleID: string;
  deviceLoading: boolean;
  setLimit: (limit: number) => void;
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

const colors = [
  "#e6194B", // Red
  "#f58231", // Orange
  "#ffe119", // Yellow
  "#bfef45", // Lime
  "#3cb44b", // Green
  "#42d4f4", // Cyan
  "#4363d8", // Blue
  "#911eb4", // Purple
  "#f032e6", // Magenta
  "#a9a9a9", // Grey
];
export const useDeviceStore = create<DeviceStore>((set, get) => ({
  dongleID: "",
  device: {},
  segments: [],
  profile: {},
  stats: {},
  deviceLoading: true,
  limit: 5,
  setLimit: (limit: number) => set({ limit }),
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
    const limit = get().limit;
    const segmentsData = await getSegments(dongleID, limit);
    const segmentsWithColors = segmentsData.map(
      (segment: any, index: number) => ({
        ...segment,
        color: colors[index],
      }),
    );
    set({ segments: segmentsWithColors });
    // set({ segments: await getSegments(dongleID, limit) });
  },
  fetchAllData: async () => {
    await get().fetchDeviceData();
    await get().fetchProfile();
    await get().fetchSegments();
    set({ deviceLoading: false });
  },
}));
