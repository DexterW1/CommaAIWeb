import React from "react";
import { Image } from "@nextui-org/image";
import { FaCar } from "react-icons/fa6";
export default function RouteContent({ data, city }: any) {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex h-[125px] w-[125px] items-center xl:h-[150px] xl:w-[150px]">
        <Image
          width={"100%"}
          height={"100%"}
          src={data.mapurl}
          alt="route image"
        />
      </div>
      {/* content container */}
      <div className="flex flex-grow flex-col">
        <div className="flex flex-row items-center gap-4">
          <div className="hidden rounded-full bg-blue-500 p-2 xl:block">
            <FaCar size={15} />
          </div>
          <div className="w-full flex-col">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-sm md:text-medium lg:text-large">
                {data.date}
              </h1>
              <p className="rounded-lg bg-blue-500 p-1">{data.distance}</p>
            </div>
            <h1 className="text-small text-zinc-400">{data.duration}</h1>
          </div>
        </div>
        {/* Location */}
        <div className="flex flex-row justify-between">
          <div>
            <p className="text-sm text-zinc-400">Origin:</p>
            <p>{city[0].address}</p>
            <p>{city[0].city}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-400">Destination:</p>
            <p>{city[1].address}</p>
            <p>{city[1].city}</p>
          </div>
        </div>
        {/* distance */}
      </div>
    </div>
  );
}
