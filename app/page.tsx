import React from "react";
import Maps from "@/components/Map";
import ProfileCard from "@/components/ui/ProfileCard";
import RouteCard from "@/components/ui/RouteCard";
import { Input } from "@nextui-org/input";
import { PiMagnifyingGlassLight } from "react-icons/pi";
export default function Home() {
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
