"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Map, { Marker, Source, Layer } from "react-map-gl";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import "mapbox-gl/dist/mapbox-gl.css";
import { getGeoJson, getMarkers } from "@/utils/helperFunctions";
import { useDeviceStore } from "@/store/deviceStore";
import { useRouteStore } from "@/store/routeStore";
import { IoLocationSharp } from "react-icons/io5";
import { FeatureCollection } from "geojson";
import { Button } from "@nextui-org/button";
import { FiMenu } from "react-icons/fi";
import TransparentModal from "./ui/TransparentModal";
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
  const [showModal, setShowModal] = useState(true);
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
  // console.log(routes);
  return (
    <div className="relative h-full w-full">
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
          markers.map((marker, index) => (
            <Popover key={index}>
              <PopoverTrigger>
                <Marker
                  className="z-0"
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
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-2">
                  <h1 className="text-lg">
                    <p>hello</p>
                  </h1>
                  <h1 className="text-lg">
                    <p>helllo</p>
                  </h1>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        {geojson && (
          <Source id="route" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        )}
      </Map>
      {!showModal && (
        <Button
          onClick={() => setShowModal(true)}
          className="absolute right-4 top-4"
          color="primary"
          variant="shadow"
          radius="full"
          isIconOnly
        >
          <FiMenu size={25} />
        </Button>
      )}
      <TransparentModal
        // show={showModal}
        data={routes[selectedRoute]}
        url={routes[selectedRoute].videoUrl}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Route Details"
      />
    </div>
  );
}
