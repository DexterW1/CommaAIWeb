"use client";
import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { convertTime } from "@/utils/helperFunctions";
import { useDeviceStore } from "@/store/deviceStore";
import { useRouteStore } from "@/store/routeStore";
export default function ProfileCard() {
  const stats = useDeviceStore((state) => state.stats);
  const loading = useDeviceStore((state) => state.deviceLoading);
  const [time, setTime] = useState(convertTime((stats as any).all.minutes));
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="w-full">
      <Card className="h-full">
        <CardBody>
          <div className="flex flex-row gap-4">
            <Image
              width={150}
              height={150}
              src="images/car.jpg"
              alt="test"
              isBlurred
            />
            <div className="justfiy-between flex flex-row gap-4">
              <div className="flex h-full flex-col justify-center">
                <h1 className="text-2xl">
                  {parseInt((stats as any).all.distance, 10) ?? "loading"}{" "}
                  <span className="text-sm">MI</span>
                </h1>
                <h1 className="text-sm text-zinc-500">Distance</h1>
              </div>
              <div className="flex h-full flex-col justify-center">
                <h1 className="text-2xl">
                  {(time as any).h}
                  <span className="text-sm"> H </span>
                  {(time as any).m}
                  <span className="text-sm"> M </span>
                </h1>
                <h1 className="text-sm text-zinc-500">Duration</h1>
              </div>
              <div className="flex h-full flex-col justify-center">
                <h1 className="text-2xl">
                  {(stats as any).all.routes ?? "loading"}
                </h1>
                <h1 className="text-sm text-zinc-500">Routes</h1>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
