import axios from "axios";
import { getPathStaticMapUrl } from "@/api/getters";
export const getUrls = async <T>(route: any, fn: string): Promise<T[]> => {
  let urls: string[] = [];
  if (route) {
    const segmentNumbers = Array.from({ length: route.maxqlog }, (x, i) => i);
    urls = segmentNumbers.map((i) => `${route.url}/${i}/${fn}`);
  }

  try {
    const responses = await Promise.all(
      urls.map(async (url) => {
        const response = await axios.get<T>(url);
        return response.data;
      }),
    );

    return responses;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // or handle the error accordingly
  }
};
export const getCoords = async (route: any): Promise<any[]> => {
  try {
    const coords = await getUrls(route, "coords.json");
    return coords.flat();
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return []; // or handle the error accordingly
  }
};

interface Coordinate {
  lng: number;
  lat: number;
}

export const getStaticMapUrl = async (coords: Coordinate[]) => {
  if (coords.length === 0) {
    return undefined;
  }
  const path: [number, number][] = [];
  coords.forEach(({ lng, lat }) => {
    path.push([lng, lat]);
  });
  return getPathStaticMapUrl("dark", path, 380, 192, true);
};
