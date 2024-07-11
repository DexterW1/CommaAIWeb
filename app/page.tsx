"use client";
import React, { useEffect, useState } from "react";
import Maps from "@/components/Map";
import ProfileCard from "@/components/ui/ProfileCard";
import RouteCard from "@/components/ui/RouteCard";
import { Input } from "@nextui-org/input";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { useGeolocation } from "@/utils/useGeolocation";
import { useDeviceStore } from "@/store/deviceStore";
import { Grid } from "react-loader-spinner";
import SortCard from "@/components/SortCard";
import { useRouteStore } from "@/store/routeStore";
export default function Home() {
  const fetchAllData = useDeviceStore((state) => state.fetchAllData);
  const fetchCoords = useRouteStore((state) => state.fetchCoords);
  const loading = useDeviceStore((state) => state.deviceLoading);
  const { location } = useGeolocation();
  useEffect(() => {
    const waitforFetch = async () => {
      await fetchAllData();
      await fetchCoords();
    };
    waitforFetch();
  }, []);
  if (loading || !location)
    return (
      <div className="flex h-[90vh] w-full flex-col items-center justify-center">
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#FFFFFF"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    );
  return (
    <div className="flex h-full min-h-[90vh] flex-col p-4 md:flex-row md:border lg:px-20 xl:px-40">
      {/* Maps container */}
      <div className="order-1 mb-4 h-[60vh] w-full overflow-auto md:order-2 md:h-full md:w-[100%]">
        <Maps location={location} />
      </div>
      {/* Sidebar container */}
      <div className="order-2 flex flex-col items-center gap-4 md:order-1 md:mr-4 md:w-[40%]">
        <ProfileCard />
        <div className="flex w-full flex-col gap-2 md:h-full">
          <h1 className="text-large text-zinc-400">Routes</h1>
          <Input
            startContent={<PiMagnifyingGlassLight size={20} />}
            placeholder="Search Routes"
            size="lg"
            className="mb-2"
          />
          <SortCard />
          {/* scroll container sidebar */}
          <div className="flex flex-col gap-4 overflow-y-auto pr-2 md:h-[50vh]">
            <RouteCard />
            {/* <RouteCard />
            <RouteCard />
            <RouteCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
