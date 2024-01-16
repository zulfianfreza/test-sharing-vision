"use client";

import useSidebar from "@/hooks/use-sidebar";
import { HambergerMenu } from "iconsax-react";
import Image from "next/image";
import React from "react";

export default function Navbar() {
  const { toggleIsDisplay } = useSidebar();
  return (
    <div className=" flex h-20 items-center justify-between border-b border-gray-200 bg-white p-4 px-6">
      <div className="flex items-center">
        <button onClick={toggleIsDisplay} className=" block lg:hidden">
          <HambergerMenu />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <div className=" relative aspect-square h-10 overflow-hidden rounded-full bg-red-100">
          <Image
            src="/images/avatar.png"
            fill
            alt=""
            className=" object-cover"
          />
        </div>
        <p className=" text-sm">Julian</p>
      </div>
    </div>
  );
}
