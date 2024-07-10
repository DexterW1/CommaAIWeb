"use client";
import React, { use, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/avatar";
import { convertTime } from "@/utils/helperFunctions";
import { useDeviceStore } from "@/store/deviceStore";
export default function ProfileCard() {
  const dongleID = useDeviceStore((state) => state.dongleID);
  const stats = useDeviceStore((state) => state.stats);
  const loading = useDeviceStore((state) => state.deviceLoading);
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="w-full">
      <Card className="h-full">
        <CardHeader className="gap-4">
          <Avatar />
          <h1>{dongleID ? dongleID : "My Vehicle ID..."}</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-row justify-between">
            <div className="">
              <h2>Distance</h2>
              <h1>
                {parseInt((stats as any).all.distance, 10) ?? "loading"} MI
              </h1>
            </div>
            <div className="">
              <h2>Duration</h2>
              <h1>{convertTime((stats as any).all.minutes) ?? "loading"}</h1>
            </div>
            <div className="">
              <h2>Routes</h2>
              <h1>{(stats as any).all.routes ?? "loading"}</h1>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
