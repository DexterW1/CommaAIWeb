"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
export default function SortDropdown() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Recent"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button size="md" radius="sm" variant="bordered" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        bottomContent
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="recent">Recent</DropdownItem>
        <DropdownItem key="farthest">Farthest</DropdownItem>
        <DropdownItem key="closest">Closest</DropdownItem>
        <DropdownItem key="duration">Duration</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
