import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
export default function RouteCard() {
  return (
    <div className="h-56 w-full">
      <Card className="h-full w-full">
        <CardHeader>
          <h1>hello</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>hello</p>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
        </CardBody>
      </Card>
    </div>
  );
}
