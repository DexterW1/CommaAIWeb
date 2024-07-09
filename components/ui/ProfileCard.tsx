import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
export default function ProfileCard() {
  return (
    <div className="w-full h-56">
      <Card className="h-full">
        <CardHeader>
          <h1>hello</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>hello</p>
        </CardBody>
      </Card>
    </div>
  );
}
