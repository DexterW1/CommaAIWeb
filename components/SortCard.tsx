import React from "react";
import SortDropdown from "./ui/SortDropdown";
export default function SortCard() {
  return (
    <div className="mb-2">
      <h1 className="mb-2 text-large text-zinc-400">Sort By:</h1>
      <SortDropdown />
    </div>
  );
}
