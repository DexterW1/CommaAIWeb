"use client";
import React, { use, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { convertTime } from "@/utils/helperFunctions";
import { useDeviceStore } from "@/store/deviceStore";
const carImagePath = "public/images/car.jpg";
export default function ProfileCard() {
  const dongleID = useDeviceStore((state) => state.dongleID);
  const stats = useDeviceStore((state) => state.stats);
  const loading = useDeviceStore((state) => state.deviceLoading);
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
              <div className="flex h-full flex-col justify-between">
                <h2>Distance</h2>
                <h1>
                  {parseInt((stats as any).all.distance, 10) ?? "loading"} MI
                </h1>
              </div>
              <div className="flex h-full flex-col justify-between">
                <h2>Duration</h2>
                <h1>{convertTime((stats as any).all.minutes) ?? "loading"}</h1>
              </div>
              <div className="flex h-full flex-col justify-between">
                <h2>Routes</h2>
                <h1>{(stats as any).all.routes ?? "loading"}</h1>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
