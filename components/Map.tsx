"use client";
import React from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
export default function Maps() {
  const center = [51.505, -0.09];
  console.log(process.env.comma_key);
  return (
    <div className="h-[80vh] w-full border-4 border-cyan-600">
      <Map
        mapboxAccessToken={process.env.mapbox_key}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
}
