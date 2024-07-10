// Type: API
import axios from "axios";
import polyline from "@mapbox/polyline";
const BASE_URL = "https://api.commadotai.com/";
const API_KEY = process.env.COMMA_KEY;
const MAPBOX_KEY = process.env.MAPBOX_KEY;
const MAPBOX_USERNAME = "commaai";

const MAPBOX_LIGHT_STYLE_ID = "clcl7mnu2000214s2zgcdly6e";
const MAPBOX_DARK_STYLE_ID = "clcgvbi4f000q15t6o2s8gys3";
type Coords = [number, number][];
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

export function getPathStaticMapUrl(
  themeId: string,
  coords: Coords,
  width: number,
  height: number,
  hidpi: boolean,
  strokeWidth: number = 4,
  color: string = "DFE0FF",
  opacity: number = 1,
): string {
  const styleId =
    themeId === "light" ? MAPBOX_LIGHT_STYLE_ID : MAPBOX_DARK_STYLE_ID;
  const hidpiStr = hidpi ? "@2x" : "";
  const encodedPolyline = polyline.encode(
    prepareCoords(coords, POLYLINE_SAMPLE_SIZE),
    POLYLINE_PRECISION,
  );
  const path = `path-${strokeWidth}+${color}-${opacity}(${encodeURIComponent(
    encodedPolyline,
  )})`;
  return `https://api.mapbox.com/styles/v1/${MAPBOX_USERNAME}/${styleId}/static/${path}/auto/${width}x${height}${hidpiStr}?logo=false&attribution=false&padding=30,30,30,30&access_token=${MAPBOX_KEY}`;
}
