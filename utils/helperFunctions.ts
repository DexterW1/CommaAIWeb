import { FeatureCollection } from "geojson";
import { getCoordArray } from "./routecoords";

export const convertTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}H ${remainingMinutes}M`;
};
const convertTime12format = (time: string) => {
  const date = new Date(time);
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes} ${ampm}`;
};

export const getMarkers = (segments: any) => {
  const markers: { lat: any; lng: any; time: any; color: string }[] = [];
  segments.forEach((segment: any) => {
    markers.push({
      lat: segment.start_lat,
      lng: segment.start_lng,
      time: segment.create_time,
      color: segment.color,
    });
  });
  return markers;
};
export const formatDistance = (miles: number | undefined): string => {
  if (miles === undefined) return "";
  return `${miles.toFixed(1) ?? 0} mi`;
};

export const formatRouteDistance = (route: any | undefined): string => {
  if (route?.length === undefined) return "";
  return formatDistance(route.length);
};

export const formatRouteDuration = (route: any | undefined): string => {
  if (route?.length === undefined) return "";
  const startTime = convertTime12format(route.start_time);
  const endTime = convertTime12format(route.end_time);
  return `${startTime} - ${endTime}`;
  // return convertTime(route.duration);
};

export const getEveryNthPoint = (coords: number[][], n: number): number[][] => {
  const result: number[][] = [];
  for (let i = 0; i < coords.length; i += n) {
    result.push(coords[i]);
  }
  return result;
};
export const getGeoJson = (coords: any) => {
  if (coords === undefined) return null;
  const modifiedCoords = getEveryNthPoint(getCoordArray(coords) || [], 3) || [];
  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "LineString", coordinates: modifiedCoords },
        properties: null,
      },
    ],
  };
  return geojson;
};
