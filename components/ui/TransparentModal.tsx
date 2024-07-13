import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
export default function TransparentModal({ isOpen, onClose, data }: any) {
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
