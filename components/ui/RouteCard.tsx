import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import RouteContent from "./RouteContent";
import { useRouteStore } from "@/store/routeStore";
export default function RouteCard() {
  const routes = useRouteStore((state) => state.routes);
  if (routes.length === 0) return null;
  return (
    <div className="flex-1">
      <Card className="h-full w-full">
        {/* <Divider /> */}
        {routes.map((route, index) => (
          <>
            <CardBody key={index}>
              <RouteContent data={route} />
            </CardBody>
            {index !== routes.length - 1 && <Divider />}
          </>
        ))}
      </Card>
    </div>
  );
}
