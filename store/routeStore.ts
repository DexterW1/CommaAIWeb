import { create } from "zustand";
import { useDeviceStore } from "./deviceStore";
import { getCoords, getStaticMapUrl } from "@/utils/routecoords";
import { getRoute } from "@/api/getters";

import {
  formatRouteDistance,
  // formatRouteDuration,
} from "@/utils/helperFunctions";

interface RouteData {
  route: any;
  coords: object[];
  mapurl: string | undefined;
  distance: string | undefined;
  color: string;
  // duration: string | undefined;
}

type RouteStore = {
  routes: RouteData[];
  fetchCoords: () => void;
  setRoutes: (routes: RouteData[]) => void;
  // fetchAllRoutes: () => void;
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
      const routeInfo = await getRoute((route as any).fullname ?? "");

      const routeDistance = formatRouteDistance(route);
      // const routeDuration = formatRouteDuration(route);
      // console.log(routeInfo);
      routesData.push({
        route: routeInfo,
        coords: coordsData,
        mapurl,
        distance: routeDistance,
        color: (route as any).color,
        // duration: routeDuration,
      });
    }

    set({ routes: routesData });
  },
  // fetchAllRoutes: async () => {
  //   const routeSegments = useDeviceStore.getState().segments;
  //   const routesData: RouteData[] = [];

  //   for (const route of routeSegments) {
  //     const coordsData = await getCoords(route);
  //     const mapurl = await getStaticMapUrl(coordsData);
  //     const routeInfo = await getRoute((route as any).fullname ?? "");
  //     console.log(routeInfo);
  //     routesData.push({
  //       route,
  //       coords: coordsData,
  //       mapurl,
  //       distance: undefined,
  //     });
  //   }

  //   set({ routes: routesData });
  // },
}));
