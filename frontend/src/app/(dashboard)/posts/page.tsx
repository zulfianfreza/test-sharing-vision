"use client";
import PostListItem from "@/components/dashboard/post-list-item";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { STATUS_LIST } from "@/lib/constants";
import { getPosts } from "@/services/post";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface PageParams {
  searchParams: {
    status: string;
    page: number;
  };
}

export default function PostsPage({ searchParams }: PageParams) {
  const paramsStatus = searchParams.status ?? "publish";
  const paramsPage = searchParams.page ?? 1;
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["posts", { status: paramsStatus, page: paramsPage }],
    queryFn: () => getPosts({ status: paramsStatus, page: paramsPage }),
    enabled: !!paramsStatus,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className=" text-2xl font-semibold">All posts</h1>
        <Button size="sm" asChild>
          <Link href="/posts/new">Add</Link>
        </Button>
      </div>
      <div className="flex items-center gap-2 mt-8">
        {STATUS_LIST.map((status, i) => (
          <Button
            key={i}
            size="sm"
            asChild
            variant={paramsStatus == status.slug ? "default" : "outline"}
          >
            <Link href={`/posts?status=` + status.slug}>{status.label}</Link>
          </Button>
        ))}
      </div>

      <div className=" mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[48px]">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((post, i) => (
              <PostListItem
                post={post}
                index={i + 1 + (paramsPage - 1) * 10}
                key={i}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-1 mt-4 justify-center">
        <Button
          className=" items-center"
          variant="ghost"
          size="sm"
          disabled={paramsPage == 1}
          onClick={() => {
            router.push(
              `${pathname}?page=${paramsPage - 1}&status=${paramsStatus}`
            );
          }}
        >
          <ChevronLeft size={16} />
          Prev
        </Button>
        {Array.from({ length: data?.total_pages ?? 0 }).map((_, i) => (
          <Button
            key={i}
            size="sm"
            className=" w-9"
            variant={i + 1 == paramsPage ? "default" : "outline"}
            onClick={() => {
              router.push(`${pathname}?page=${i + 1}&status=${paramsStatus}`);
            }}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          className=" items-center"
          variant="ghost"
          size="sm"
          disabled={paramsPage == data?.total_pages}
          onClick={() => {
            router.push(
              `${pathname}?page=${paramsPage + 1}&status=${paramsStatus}`
            );
          }}
        >
          Next
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
