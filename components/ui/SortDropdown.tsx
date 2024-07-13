"use client";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useRouteStore } from "@/store/routeStore";
type Selection = "all" | Set<React.Key>;

export default function SortDropdown() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(
    new Set(["Recent"]),
  );
  const sortRoutes = useRouteStore((state) => state.sortRoutes);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  const handleSelectionChange = (keys: Selection) => {
    if (keys === "all") {
      // Handle 'all' selection if applicable
      return;
    }

    const newSelectedKeys = new Set<string>();
    keys.forEach((key) => {
      if (typeof key === "string") {
        newSelectedKeys.add(key);
      }
    });
    setSelectedKeys(newSelectedKeys);
    sortRoutes(newSelectedKeys.values().next().value);
  };

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
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem key="recent">Recent</DropdownItem>
        <DropdownItem key="distance">Distance</DropdownItem>
        <DropdownItem key="duration">Duration</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
