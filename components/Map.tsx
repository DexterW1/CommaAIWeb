"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getMarkers } from "@/utils/helperFunctions";
import { useDeviceStore } from "@/store/deviceStore";
import { useRouteStore } from "@/store/routeStore";
import { IoLocationSharp } from "react-icons/io5";
import { getCoordArray } from "@/utils/routecoords";
import { getEveryNthPoint } from "@/utils/helperFunctions";
import { FeatureCollection } from "geojson";
const apikey = process.env.MAPBOX_KEY;
export default function Maps({ location }: any) {
  const [markers, setMarkers] = useState<any[]>([]);
  const { theme } = useTheme();
  const routes = useRouteStore((state) => state.routes);
  const segments = useDeviceStore((state) => state.segments);
  useEffect(() => {
    if (segments) {
      const newMarkers = getMarkers(segments);
      setMarkers(newMarkers);
    }
  }, [segments]);
  if (markers[0] === undefined && markers[0] === undefined) {
    return null;
  }
  if (!routes[0]?.coords) {
    return null;
  }
  const modifiedCoords =
    getEveryNthPoint(getCoordArray(routes[1].coords) || [], 3) || [];
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
  const layerStyle: any = {
    id: "route",
    type: "line",
    paint: {
      "line-color": "#80f3c6",
      "line-width": 6,
    },
  };
  // console.log(routes);
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
        <Source id="route" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
}
