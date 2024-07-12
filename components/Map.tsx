"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getGeoJson, getMarkers } from "@/utils/helperFunctions";
import { useDeviceStore } from "@/store/deviceStore";
import { useRouteStore } from "@/store/routeStore";
import { IoLocationSharp } from "react-icons/io5";
import { FeatureCollection } from "geojson";
const apikey = process.env.MAPBOX_KEY;
const layerStyle: any = {
  id: "route",
  type: "line",
  paint: {
    "line-color": "#80f3c6",
    "line-width": 6,
  },
};
export default function Maps({ location }: any) {
  const [markers, setMarkers] = useState<any[]>([]);
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const { theme } = useTheme();
  const routes = useRouteStore((state) => state.routes);
  const selectedRoute = useRouteStore((state) => state.selectedRoute);
  const segments = useDeviceStore((state) => state.segments);
  useEffect(() => {
    if (segments) {
      const newMarkers = getMarkers(segments);
      setMarkers(newMarkers);
    }
  }, [segments]);
  useEffect(() => {
    if (routes.length > 0) {
      const newGeojson = getGeoJson(routes[selectedRoute].coords);
      setGeojson(newGeojson);
    }
  }, [routes, selectedRoute]);
  if (markers[0] === undefined || geojson === null) {
    return null;
  }
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
                  <IoLocationSharp
                    size={selectedRoute === index ? 40 : 30}
                    color={marker.color}
                  />
                </Marker>
              );
            }
            return null;
          })}
        {geojson && (
          <Source id="route" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        )}
      </Map>
    </div>
  );
}
