"use client";
import React from "react";
import { useTheme } from "next-themes";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
const apikey = process.env.MAPBOX_KEY;
export default function Maps() {
  const { theme } = useTheme();
  return (
    <div className="w-full h-full">
      <Map
        mapboxAccessToken={apikey}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
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
