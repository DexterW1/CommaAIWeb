import { create } from "zustand";
import { useDeviceStore } from "./deviceStore";
import { getCoords, getStaticMapUrl, reverseLookup } from "@/utils/routecoords";
import { getRoute } from "@/api/getters";
import { getQCameraStreamUrl } from "@/api/getters";
import {
  formatRouteDistance,
  formatRouteDuration,
  convertDate,
} from "@/utils/helperFunctions";

interface RouteData {
  route: any;
  coords: object[];
  mapurl: string | undefined;
  distance: string | undefined;
  color: string;
  duration: string | undefined;
  date: string | undefined;
  videoUrl: string | undefined;
  city: (object | null)[] | undefined;
}

type RouteStore = {
  routes: RouteData[];
  selectedRoute: number;
  setSelectedRoute: (index: number) => void;
  fetchCoords: () => void;
  setRoutes: (routes: RouteData[]) => void;
  sortRoutes: (sortBy: string) => void;
};

export const useRouteStore = create<RouteStore>((set, get) => ({
  routes: [],
  selectedRoute: 0,
  setRoutes: (routes: RouteData[]) => set({ routes }),
  setSelectedRoute: (index: number) => set({ selectedRoute: index }),
  fetchCoords: async () => {
    const routeSegments = useDeviceStore.getState().segments;
    const routesData: RouteData[] = [];
    for (const route of routeSegments) {
      const coordsData = await getCoords(route);
      const mapurl = await getStaticMapUrl(coordsData);
      const routeInfo = await getRoute((route as any).fullname ?? "");
      const videoUrl = await getQCameraStreamUrl((route as any).fullname);
      const routeDistance = formatRouteDistance(route);
      const routeDuration = formatRouteDuration(route);
      const routeDate = convertDate((route as any).start_time);
      const start_loc = { lat: routeInfo.start_lat, lng: routeInfo.start_lng };
      const end_loc = { lat: routeInfo.end_lat, lng: routeInfo.end_lng };
      const startCity = await reverseLookup(start_loc);
      const endCity = await reverseLookup(end_loc);
      const routeCity = [startCity, endCity];
      routesData.push({
        route: routeInfo,
        coords: coordsData,
        mapurl,
        distance: routeDistance,
        color: (route as any).color,
        duration: routeDuration,
        date: routeDate,
        videoUrl,
        city: routeCity,
      });
    }

    set({ routes: routesData });
  },
  sortRoutes: (sortBy: string) => {
    const routes = get().routes;
    let sortedRoutes = [...routes];
    if (sortBy === "recent") {
      sortedRoutes = routes.sort((a, b) => {
        return (
          new Date(b.date ?? "").getTime() - new Date(a.date ?? "").getTime()
        );
      });
    } else if (sortBy === "distance") {
      sortedRoutes = routes.sort((a, b) => {
        return (b.route.length ?? 0) - (a.route.length ?? 0);
      });
    } else if (sortBy === "duration") {
      sortedRoutes = routes.sort((a, b) => {
        return (b.route.duration ?? 0) - (a.route.duration ?? 0);
      });
    }
    console.log(sortedRoutes);
    set({ routes: sortedRoutes });
  },
}));
