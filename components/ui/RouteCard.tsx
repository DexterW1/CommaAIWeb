"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import RouteContent from "./RouteContent";
import { useRouteStore } from "@/store/routeStore";
import { useMap } from "react-map-gl";
export default function RouteCard() {
  const routes = useRouteStore((state) => state.routes); // Only get the first 5 routes
  const { commaMap } = useMap();
  const selectedRoute = useRouteStore((state) => state.selectedRoute);
  const setSelectedRoute = useRouteStore((state) => state.setSelectedRoute);
  const handleClick = (index: number) => {
    setSelectedRoute(index);
    const lng = routes[index].route.start_lng;
    const lat = routes[index].route.start_lat;
    if (commaMap) {
      commaMap.flyTo({ center: [lng, lat], zoom: 14 });
    }
  };
  if (routes.length === 0) return null;
  return (
    <div className="flex-1">
      <Card className="h-full w-full">
        {/* <Divider /> */}
        {routes.map((route, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`cursor-pointer ${selectedRoute === index ? `rounded-2xl border-2` : ""}`}
            style={{ borderColor: route.color }}
          >
            <CardBody>
              <RouteContent data={route} />
            </CardBody>
            {index !== routes.length - 1 && <Divider />}
          </div>
        ))}
      </Card>
    </div>
  );
}
