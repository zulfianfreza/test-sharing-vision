"use client";
import { getPostById } from "@/services/post";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface PageParams {
  params: {
    id: number;
  };
}

export default function PostPage({ params }: PageParams) {
  const { data: post } = useQuery({
    queryKey: ["post", params.id],
    queryFn: () => getPostById(params.id),
  });
  return (
    <div>
      <div className="">
        <h1 className=" text-2xl font-semibold">{post?.title}</h1>
        <div className="flex items-center gap-2 mt-4">
          <p className=" text-sm">{post?.category}</p>
          <span>•</span>
          <p className=" text-sm">{post?.status}</p>
        </div>
      </div>
      <div className=" mt-8">
        <article>{post?.content}</article>
      </div>
    </div>
  );
}
