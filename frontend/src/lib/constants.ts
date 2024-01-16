import { Menu, SidebarMenu, Status } from "@/@types";
import { Document, Home2 } from "iconsax-react";
import { Grand_Hotel, Sofia } from "next/font/google";

export const sofia = Sofia({ subsets: ["latin"], weight: ["400"] });
export const grandHotel = Grand_Hotel({ subsets: ["latin"], weight: ["400"] });

export const MENU_LIST: Menu[] = [
  { label: "Home", path: "/" },
  { label: "Pricing", path: "/pricing" },
  { label: "Resource", path: "/resource" },
];

export const SIDEBAR_MENU: SidebarMenu[] = [
  {
    label: "Home",
    icon: Home2,
    path: "/",
    active: "/",
  },
  {
    label: "Posts",
    icon: Document,
    path: "/posts",
    active: "/posts",
  },
];

export const STATUS_LIST: Status[] = [
  {
    label: "Publish",
    slug: "publish",
  },
  {
    label: "Draft",
    slug: "draft",
  },
  {
    label: "Trash",
    slug: "trash",
  },
];
