import React from "react";
import Maps from "@/components/Map";
import ProfileCard from "@/components/ui/ProfileCard";
export default function Home() {
  return (
    <div className=" flex flex-col min-h-[90vh] px-4 md:flex-row md:border md:gap-12">
      {/* Maps container */}
      <div className="w-full h-80 order-1 mb-4 md:order-2 md:w-[100%] md:h-full">
        <Maps />
      </div>
      {/* Sidebar container */}
      <div className="flex flex-col items-center order-2 md:order-1 md:w-[40%]">
        <ProfileCard />
      </div>
    </div>
  );
}
