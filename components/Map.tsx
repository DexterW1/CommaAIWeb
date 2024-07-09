"use client";
import React from "react";

import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
const apikey = process.env.MAPBOX_KEY;
export default function Maps() {
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
        mapStyle="mapbox://styles/mapbox/dark-v11"
      />
    </div>
  );
}
