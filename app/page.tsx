"use client";
import React, { useEffect } from "react";
import Maps from "@/components/Map";
import ProfileCard from "@/components/ui/ProfileCard";
import RouteCard from "@/components/ui/RouteCard";
import { Input } from "@nextui-org/input";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { useDeviceStore } from "@/store/deviceStore";
import { Grid } from "react-loader-spinner";
export default function Home() {
  const fetchAllData = useDeviceStore((state) => state.fetchAllData);
  const loading = useDeviceStore((state) => state.deviceLoading);
  useEffect(() => {
    fetchAllData();
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
    <div className="flex h-full min-h-[90vh] flex-col p-4 md:flex-row md:border lg:px-20 xl:px-40">
      {/* Maps container */}
      <div className="order-1 mb-4 h-80 w-full overflow-auto md:order-2 md:h-full md:w-[100%]">
        <Maps />
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
          <RouteCard />
          <RouteCard />
        </div>
      </div>
    </div>
  );
}
