import React from "react";
import { Image } from "@nextui-org/image";
import { Avatar } from "@nextui-org/avatar";
import { FaCar } from "react-icons/fa6";
export default function RouteContent({ data }: any) {
  return (
    <div className="flex flex-row gap-4">
      <div className="h-[150px] w-[150px]">
        <Image
          width={"100%"}
          height={"100%"}
          src={data.mapurl}
          alt="route image"
        />
      </div>

      {/* content container */}
      <div>
        <div className="flex flex-row items-center gap-2">
          <div className="rounded-full bg-blue-500 p-2">
            <FaCar size={15} />
          </div>
          <h1 className="text-small text-zinc-400">7:30 AM - 7:47 AM</h1>
        </div>
      </div>
    </div>
  );
}
