import React from "react";
import { Avatar } from "@nextui-org/avatar";
import { useDeviceStore } from "@/store/deviceStore";
export default function User() {
  const profile = useDeviceStore((state) => state.profile);
  console.log("user/profiel", profile);
  return (
    <div className="flex flex-row items-center gap-4">
      <Avatar
        src="images/avatar.png"
        size="sm"
        className="transition-transform"
      />
      {/* name/email container */}
      <div className="flex flex-col">
        <p className="font-bold">{profile.username ?? "Temp-Username"}</p>
        <p className="text-sm text-gray-500">{profile.email}</p>
      </div>
    </div>
  );
}
