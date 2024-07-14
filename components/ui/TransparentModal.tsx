"use client";
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { getQCameraStreamUrl } from "@/api/getters";
export default function TransparentModal({ isOpen, onClose, data }: any) {
  const videoref = useRef<null | HTMLVideoElement>(null);
  useEffect(() => {
    const fetchVideo = async () => {
      const hls = new Hls({ debug: true });
      if (Hls.isSupported()) {
        hls.loadSource(await getQCameraStreamUrl(data.route.fullname));
        hls.attachMedia(videoref.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoref.current?.play();
        });
      }
    };
  }, []);
  console.log(getQCameraStreamUrl(data.route.fullname));
  if (!isOpen) return null;
  return (
    <Card className="absolute right-4 top-4 flex h-80 w-[35%] items-center justify-center">
      <CardHeader className="flex justify-end">
        <Button radius="full" isIconOnly onClick={onClose}>
          X
        </Button>
      </CardHeader>
      <CardBody>
        <div>
          <h1>{data.date}</h1>
          <p>{data.distance}</p>
          <p>{data.duration}</p>
        </div>
      </CardBody>
    </Card>
  );
}
