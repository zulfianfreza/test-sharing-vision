"use client";

import { Post } from "@/@types";
import React, { useEffect } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Edit, Eye, Trash } from "iconsax-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "@/services/post";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PostListItemProps {
  post: Post;
  index: number;
}

export default function PostListItem({ post, index }: PostListItemProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["post", post.id],
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleTrash = () => {
    mutate({
      params: { postId: post.id },
      request: {
        title: post.title,
        content: post.content,
        category: post.category,
        status: "trash",
      },
    });
  };

  return (
    <TableRow key={post.id}>
      <TableCell>{index}</TableCell>
      <TableCell>{post.title}</TableCell>
      <TableCell>{post.category}</TableCell>
      <TableCell>{post.status}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Link href={`/posts/${post.id}`}>
            <Eye size={16} />
          </Link>
          <Link href={`/posts/${post.id}/edit`}>
            <Edit size={16} />
          </Link>
          <button onClick={handleTrash}>
            <Trash size={16} />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
