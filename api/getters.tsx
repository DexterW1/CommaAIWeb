// Type: API
import axios from "axios";
import polyline from "@mapbox/polyline";
const BASE_URL = "https://api.commadotai.com/";
const API_KEY = process.env.COMMA_KEY;
const MAPBOX_KEY = process.env.MAPBOX_KEY;
const MAPBOX_USERNAME = "mapbox";

const MAPBOX_LIGHT_STYLE_ID = "light-v11";
const MAPBOX_DARK_STYLE_ID = "dark-v11";
type Coords = [number, number][];
const POLYLINE_SAMPLE_SIZE = 50;
const POLYLINE_PRECISION = 4;
export async function getAccount() {
  try {
    const response = await axios.get(`${BASE_URL}v1/me/`, {
      headers: {
        Authorization: `JWT ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
export async function getDevice() {
  try {
    const response = await axios.get(`${BASE_URL}v1/me/devices/`, {
      headers: {
        Authorization: `JWT ${API_KEY}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
export async function getDeviceStats(dongleID: string) {
  try {
    const response = await axios.get(
      `${BASE_URL}v1.1/devices/${dongleID}/stats`,
      {
        headers: {
          Authorization: `JWT ${API_KEY}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
export async function getSegments(dongleID: string, limit = 3) {
  try {
    const response = await axios.get(
      `${BASE_URL}v1/devices/${dongleID}/routes_segments?limit=${limit}`,
      {
        headers: {
          Authorization: `JWT ${API_KEY}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// Map functions

function prepareCoords(coords: Coords, sampleSize: number): Coords {
  const sample = [];
  const step = Math.max(Math.floor(coords.length / sampleSize), 1);
  for (let i = 0; i < coords.length; i += step) {
    const point = coords[i];
    // 1. mapbox uses lng,lat order
    // 2. polyline output is off by 10x when precision is 4
    sample.push([point[1] * 10, point[0] * 10] as [number, number]);
  }
  return sample;
}
export function getPathStaticMapUrl(
  themeId: string,
  coords: Coords,
  width: number,
  height: number,
  hidpi: boolean,
  strokeWidth: number = 3,
  color: string = "80f3c6",
  opacity: number = 1,
): string {
  const styleId =
    themeId === "light" ? MAPBOX_LIGHT_STYLE_ID : MAPBOX_DARK_STYLE_ID;
  const hidpiStr = hidpi ? "@2x" : "";
  const encodedPolyline = polyline.encode(
    prepareCoords(coords, POLYLINE_SAMPLE_SIZE),
    POLYLINE_PRECISION,
  );
  const startCoord = coords[0];
  const endCoord = coords[coords.length - 1];
  // pin-l-embassy+f74e4e(-74.0021,40.7338)
  const markerStart = `pin-s-car+000(${startCoord[0]},${startCoord[1]})`;
  const markerEnd = `pin-s-embassy+f74e4e(${endCoord[0]},${endCoord[1]})`;
  const path = `path-${strokeWidth}+${color}-${opacity}(${encodeURIComponent(
    encodedPolyline,
  )})`;
  return `https://api.mapbox.com/styles/v1/${MAPBOX_USERNAME}/${styleId}/static/${path},${markerStart},${markerEnd}/auto/${width}x${height}${hidpiStr}?logo=false&attribution=false&padding=30,30,30,30&access_token=${MAPBOX_KEY}`;
}
