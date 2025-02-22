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
import { Button } from "@nextui-org/button";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
export default function Home() {
  const fetchAllData = useDeviceStore((state) => state.fetchAllData);
  const fetchCoords = useRouteStore((state) => state.fetchCoords);
  const loading = useDeviceStore((state) => state.deviceLoading);
  // const { location } = useGeolocation();
  useEffect(() => {
    const waitforFetch = async () => {
      await fetchAllData();
      await fetchCoords();
    };
    waitforFetch();
  }, []);
  if (loading)
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
    <div className="flex h-full min-h-[90vh] flex-col p-4 md:flex-row lg:px-10 xl:px-32">
      {/* Maps container */}
      <div className="order-1 mb-4 h-[60vh] w-full overflow-auto md:order-2 md:h-full md:w-[60%] lg:w-full">
        <Maps location={location} />
      </div>
      {/* Sidebar container */}
      <div className="order-2 flex flex-col items-center gap-4 md:order-1 md:mr-4 md:w-[60%] 2xl:w-[40%]">
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
          <ScrollShadow
            size={20}
            visibility="bottom"
            className="flex w-full flex-col gap-y-4 md:h-[55vh] md:overflow-y-scroll md:pr-2"
          >
            <RouteCard />
            <div className="mb-4 flex items-center justify-center">
              <Button color="primary" variant="shadow" radius="full">
                Load more
              </Button>
            </div>
          </ScrollShadow>
        </div>
      </div>
    </div>
  );
}
