import React from "react";
import Maps from "@/components/Map";
import ProfileCard from "@/components/ui/ProfileCard";
import RouteCard from "@/components/ui/RouteCard";
import { Input } from "@nextui-org/input";
import { PiMagnifyingGlassLight } from "react-icons/pi";
export default function Home() {
  return (
    <div className="flex flex-col min-h-[90vh] h-full p-4 md:flex-row md:border">
      {/* Maps container */}
      <div className="w-full h-80 order-1 mb-4 md:order-2 md:w-[100%] md:h-full overflow-auto">
        <Maps />
      </div>
      {/* Sidebar container */}
      <div className="flex flex-col items-center order-2 gap-4 md:order-1 md:w-[40%] md:mr-4">
        <ProfileCard />
        <div className="flex flex-col gap-2 w-full md:h-full">
          <h1 className="text-zinc-400 text-large">Routes</h1>
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
