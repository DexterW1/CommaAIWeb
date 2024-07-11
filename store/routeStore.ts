import { create } from "zustand";
import { useDeviceStore } from "./deviceStore";
import { getCoords, getStaticMapUrl } from "@/utils/routecoords";

interface RouteData {
  route: object;
  coords: object[];
  mapurl: string | undefined;
}

type RouteStore = {
  routes: RouteData[];
  fetchCoords: () => void;
  setRoutes: (routes: RouteData[]) => void;
  fetchAllRoutes: () => void;
};

export const useRouteStore = create<RouteStore>((set, get) => ({
  routes: [],
  setRoutes: (routes: RouteData[]) => set({ routes }),
  fetchCoords: async () => {
    const routeSegments = useDeviceStore.getState().segments;
    const routesData: RouteData[] = [];

    for (const route of routeSegments) {
      const coordsData = await getCoords(route);
      const mapurl = await getStaticMapUrl(coordsData);
      routesData.push({
        route,
        coords: coordsData,
        mapurl,
      });
    }

    set({ routes: routesData });
  },
  fetchAllRoutes: async () => {
    const routeSegments = useDeviceStore.getState().segments;
    const routesData: RouteData[] = [];

    for (const route of routeSegments) {
      const coordsData = await getCoords(route);
      const mapurl = await getStaticMapUrl(coordsData);
      routesData.push({
        route,
        coords: coordsData,
        mapurl,
      });
    }

    set({ routes: routesData });
  },
}));
