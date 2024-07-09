"use client";
import React from "react";
import { useTheme } from "next-themes";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useGeolocation } from "@/utils/useGeolocation";
const apikey = process.env.MAPBOX_KEY;
export default function Maps() {
  const { theme } = useTheme();
  const { location } = useGeolocation();
  if (!location.latitude && !location.longitude) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="w-full h-full">
      <Map
        mapboxAccessToken={apikey}
        initialViewState={{
          longitude: location.longitude ?? 0,
          latitude: location.latitude ?? 0,
          zoom: 14,
        }}
        style={{
          width: "100%",
          borderRadius: "1rem",
        }}
        mapStyle={
          theme === "light"
            ? "mapbox://styles/mapbox/light-v10"
            : "mapbox://styles/mapbox/dark-v11"
        }
      />
    </div>
  );
}
