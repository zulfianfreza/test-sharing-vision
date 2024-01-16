"use client";

import { Button } from "@/components/ui/button";
import { SIDEBAR_MENU, sofia } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowLeft2 } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import SidebarNav from "./sidebar-nav";
import useSidebar from "@/hooks/use-sidebar";

export default function Sidebar() {
  const pathname = usePathname();
  const { isFull, toggleIsFull, isDisplay, toggleIsDisplay } = useSidebar();
  return (
    <div className={cn("fixed z-50 h-screen w-fit", { "w-full": isDisplay })}>
      <div
        className=" h-screen w-full bg-black/25 backdrop-blur-sm lg:hidden"
        onClick={toggleIsDisplay}
      ></div>
      <div
        className={cn(
          " fixed top-0 z-50 -ml-72 h-screen w-72 border-r bg-white transition-all duration-300 lg:ml-0",
          {
            "w-20": !isFull,
          },
          { "ml-0": isDisplay }
        )}
      >
        <div className=" relative flex h-20 w-full items-center justify-center">
          <h1 className={cn("text-lg font-bold")}>TSV</h1>

          <button
            className={cn(
              " absolute -bottom-3 -right-3 hidden rounded-full border bg-white p-1 transition-all duration-300 lg:block",
              { "rotate-180": !isFull },
              { block: isDisplay }
            )}
            onClick={toggleIsFull}
          >
            <ArrowLeft2 size={16} />
          </button>
        </div>

        <SidebarNav />
      </div>
    </div>
  );
}
