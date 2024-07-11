import { create } from "zustand";
import { useDeviceStore } from "./deviceStore";
import { getCoords } from "@/utils/routecoords";
import { getStaticMapUrl } from "@/utils/routecoords";
type RouteStore = {
  routes: object;
  coords: object[];
  mapurl: string;
  fetchCoords: (coords: any) => void;
  setRoute: (route: object) => void;
  fetchRoute: () => void;
};

export const useRouteStore = create<RouteStore>((set, get) => ({
  routes: {},
  coords: [],
  mapurl: "",
  setMapUrl: (mapurl: string) => set({ mapurl }),
  setRoute: (route: object) => {},
  fetchCoords: async (coords: any) => {
    const route = useDeviceStore.getState().segments;
    console.log("Route inside fetchCoords", route.at(0));
    const coordsData = await getCoords(route.at(0));
    console.log("This is coord data after flat", coordsData);
    const mapurl = await getStaticMapUrl(coordsData);
    set({ mapurl: mapurl });
  },
  fetchRoute: async () => {},
}));
