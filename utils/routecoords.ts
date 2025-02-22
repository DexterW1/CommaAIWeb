import axios from "axios";
import { getPathStaticMapUrl } from "@/api/getters";
const MAPBOX_KEY = process.env.MAPBOX_KEY;
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
  return getPathStaticMapUrl("dark", path, 382, 382, true);
};

export const getCoordArray = (coords: any) => {
  if (coords.length === 0) {
    return undefined;
  }
  const path: [number, number][] = [];
  coords.forEach(({ lng, lat }: any) => {
    path.push([lng, lat]);
  });
  return path;
};

export const reverseLookup = async (coords: Coordinate, navFormat = false) => {
  const endpoint = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  let response = null;
  try {
    response = axios.get(
      `${endpoint}${coords.lng},${coords.lat}.json?&access_token=${MAPBOX_KEY}&limit=1`,
    );
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null; // or handle the error accordingly
  }
  try {
    const { features } = (await response).data;
    const address = features[0].context[0].text;
    const city = features[0].context[2].text;
    return { address, city };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null; // or handle the error accordingly
  }
};
