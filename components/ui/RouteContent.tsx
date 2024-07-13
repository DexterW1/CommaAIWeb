import React from "react";
import { Image } from "@nextui-org/image";
import { Avatar } from "@nextui-org/avatar";
import { FaCar } from "react-icons/fa6";
export default function RouteContent({ data }: any) {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex h-[150px] w-[150px] items-center">
        <Image
          width={"100%"}
          height={"100%"}
          src={data.mapurl}
          alt="route image"
        />
      </div>
      {/* content container */}
      <div>
        <div className="flex flex-row items-center gap-4">
          <div className="hidden rounded-full bg-blue-500 p-2 xl:block">
            <FaCar size={15} />
          </div>
          <div>
            <h1 className="text-lg">{data.date}</h1>
            <h1 className="text-small text-zinc-400">{data.duration}</h1>
          </div>
        </div>
        {/* distance */}
        <div>
          <p>{data.distance}</p>
        </div>
      </div>
    </div>
  );
}
