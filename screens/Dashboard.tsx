import React from "react";
import Maps from "@/components/Map";
export default function Dashboard() {
  return (
    <div className=" flex flex-col border border-red-500 min-h-[93vh] pt-4">
      <h1 className="text-4xl">Dashboard</h1>
      <Maps />
    </div>
  );
}
