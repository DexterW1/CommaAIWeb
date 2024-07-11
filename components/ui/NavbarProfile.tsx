"use client";
import React from "react";
import { DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { CiUser } from "react-icons/ci";
import { TbHelp } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { Divider } from "@nextui-org/divider";
export default function NavbarProfile() {
  return (
    <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
      <DropdownItem key="user" startContent={<CiUser />}>
        Profile
      </DropdownItem>
      <DropdownItem key="settings" startContent={<CiSettings />}>
        Settings
      </DropdownItem>
      <Divider />
      <DropdownItem key="help" startContent={<TbHelp />}>
        Help Center
      </DropdownItem>
      <DropdownItem key="logout" startContent={<CiLogout />}>
        Logout
      </DropdownItem>
    </DropdownMenu>
  );
}
