import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import RouteContent from "./RouteContent";
export default function RouteCard() {
  return (
    // <div className="h-56 w-full">
    <Card className="h-full w-full">
      {/* <Divider /> */}
      <CardBody>
        <RouteContent />
      </CardBody>
      <Divider />
      <CardBody>
        <p>hello</p>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
      </CardBody>
      <Divider />
      <CardBody>
        <p>hello</p>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
      </CardBody>
      <Divider />
    </Card>
    // </div>
  );
}
