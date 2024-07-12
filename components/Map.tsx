"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getMarkers } from "@/utils/helperFunctions";
import { useDeviceStore } from "@/store/deviceStore";
import { IoLocationSharp } from "react-icons/io5";
const apikey = process.env.MAPBOX_KEY;
export default function Maps({ location }: any) {
  const [markers, setMarkers] = useState<any[]>([]);
  const { theme } = useTheme();
  const segments = useDeviceStore((state) => state.segments).slice(0, 5);
  useEffect(() => {
    if (segments) {
      const newMarkers = getMarkers(segments);
      setMarkers(newMarkers);
    }
  }, [segments]);
  if (markers[0] === undefined && markers[0] === undefined) return null;
  return (
    <div className="h-full w-full">
      <Map
        id="commaMap"
        mapboxAccessToken={apikey}
        initialViewState={{
          longitude: markers[0].lng ?? location.longitude,
          latitude: markers[0].lat ?? location.latitude,
          zoom: 10,
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
      >
        {markers &&
          markers.map((marker, index) => {
            if (marker.lng !== undefined && marker.lat !== undefined) {
              return (
                <Marker
                  key={index}
                  longitude={marker.lng}
                  latitude={marker.lat}
                  anchor="bottom"
                >
                  <IoLocationSharp size={30} color={marker.color} />
                </Marker>
              );
            }
            return null;
          })}
      </Map>
    </div>
  );
}
