"use client";

import Navbar from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import useSidebar from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isFull } = useSidebar();
  return (
    <div className=" min-h-screen w-full bg-white">
      <Sidebar />
      <div
        className={cn(
          " ml-0 flex min-h-screen flex-col transition-all duration-300 lg:ml-72",
          {
            "lg:ml-20": !isFull,
          }
        )}
      >
        <Navbar />
        <div className=" flex-1 p-10">{children}</div>
        <div className="flex border-t p-4 px-6">
          <p className=" text-sm text-gray-900">
            Created by{" "}
            <Link
              href="https://julianreza.com"
              className=" font-medium text-blue-600 hover:underline"
            >
              Julian Reza
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
