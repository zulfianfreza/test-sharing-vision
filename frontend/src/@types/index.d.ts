import { Icon } from "iconsax-react";

interface BaseResponse<T> {
  code: number;
  status: string;
  data: T;
}

interface PaginateResponse<T> extends BaseResponse<T> {
  page: number;
  page_size: number;
  total_pages: number;
}

export interface Menu {
  label: string;
  path: string;
}

export interface SidebarMenu {
  label: string;
  path: string;
  icon: Icon;
  active: string;
}

export interface Status {
  label: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  created_date: Date;
  updated_date: Date;
  status: string;
}
