"use client";
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import { getQCameraStreamUrl } from "@/api/getters";
import { FiDownload, FiStar } from "react-icons/fi";
import { GoStarFill } from "react-icons/go";
import { FaShareFromSquare } from "react-icons/fa6";

export default function TransparentModal({ isOpen, onClose, data }: any) {
  const videoref = useRef<null | HTMLVideoElement>(null);
  const [isFavorite, setIsFavorite] = React.useState(false);
  useEffect(() => {
    const fetchVideo = async () => {
      const hls = new Hls({ debug: true });
      if (Hls.isSupported()) {
        const videoUrl = await getQCameraStreamUrl(data.route.fullname);
        hls.loadSource(videoUrl);
        if (videoref.current) {
          hls.attachMedia(videoref.current);
        }
      } else if (
        videoref.current &&
        videoref.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        const videoUrl = await getQCameraStreamUrl(data.route.fullname);
        videoref.current.src = videoUrl;
      }
    };

    if (isOpen) {
      fetchVideo();
    }
  }, [isOpen, data.route.fullname]);
  console.log(getQCameraStreamUrl(data.route.fullname));
  if (!isOpen) return null;
  return (
    <Card className="absolute right-4 top-4 flex h-[90%] w-[80%] items-center justify-center md:w-[60%] xl:w-[45%]">
      <CardHeader className="flex justify-end">
        <Button radius="full" isIconOnly onClick={onClose}>
          X
        </Button>
      </CardHeader>
      <CardBody>
        <div className="mb-4">
          <h1>{data.date}</h1>
          <p>{data.distance}</p>
          <p>{data.duration}</p>
          <video
            ref={videoref}
            autoPlay={false}
            controls
            className="rounded-lg"
          />
        </div>
        <ButtonGroup>
          <Button
            onClick={() => setIsFavorite(!isFavorite)}
            endContent={
              isFavorite ? (
                <GoStarFill size={20} color="gold" />
              ) : (
                <FiStar size={20} color="gold" />
              )
            }
          >
            Favorite
          </Button>
          <Button endContent={<FiDownload size={20} />}>Download</Button>
          <Button endContent={<FaShareFromSquare size={20} />}>Share</Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  );
}
