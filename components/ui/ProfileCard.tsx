"use client";
import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { getAccount, getDevice } from "@/api/getters";
export default function ProfileCard() {
  return (
    <div className="w-full">
      <Card className="h-full">
        <CardHeader className="gap-4">
          <Avatar />
          <h1>My Vechicle</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-row justify-between">
            <div className="">
              <h2>Distance</h2>
              <h1>120 MI</h1>
            </div>
            <div className="">
              <h2>Duration</h2>
              <h1>2H 22M</h1>
            </div>
            <div className="">
              <h2>Routes</h2>
              <h1>12</h1>
            </div>
            <Button title="test" onClick={getDevice} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
