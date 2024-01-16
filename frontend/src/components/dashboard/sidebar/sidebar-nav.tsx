"use client";

import { Button } from "@/components/ui/button";
import useSidebar from "@/hooks/use-sidebar";
import { SIDEBAR_MENU } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function SidebarNav() {
  const pathname = usePathname();
  const { isFull, toggleIsFull } = useSidebar();
  const active = (pathname: string, active: string) => {
    return pathname == active;
  };
  return (
    <div className=" mt-16 flex w-full flex-col gap-1 px-4">
      {SIDEBAR_MENU.map((menu, i) => (
        <Button
          key={i}
          className=" h-12 justify-start rounded-lg"
          asChild
          variant={active(pathname, menu.active) ? "default" : "ghost"}
        >
          <Link href={menu.path}>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-1 items-center gap-x-2">
                <menu.icon
                  variant={pathname == menu.active ? "Bold" : "Outline"}
                  size={16}
                />
                <p
                  className={cn(" text-sm", {
                    hidden: !isFull,
                  })}
                >
                  {menu.label}
                </p>
              </div>
            </div>
          </Link>
        </Button>
      ))}
    </div>
  );
}
