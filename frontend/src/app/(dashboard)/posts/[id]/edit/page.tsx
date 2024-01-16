"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostUpdateRequest, postUpdateRequest } from "@/lib/validation/post";
import { getPostById, updatePost } from "@/services/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface PageParams {
  params: {
    id: number;
  };
}

export default function EditPostPage({ params }: PageParams) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    watch,
    formState: { errors },
  } = useForm<PostUpdateRequest>({
    resolver: zodResolver(postUpdateRequest),
  });

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", params.id],
    queryFn: () => getPostById(params.id),
    enabled: !!params.id,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["post", "create"],
    mutationFn: updatePost,
  });

  const onSubmit: SubmitHandler<PostUpdateRequest> = async (data) => {
    const request = postUpdateRequest.parse(data);

    mutate({
      params: {
        postId: post?.id ?? 0,
      },
      request,
    });

    queryClient.invalidateQueries({ queryKey: ["posts"] });

    router.push(`/posts?status=${request.status}`);
    console.log(data);
  };

  useEffect(() => {
    setValue("title", post?.title ?? "");
    setValue("content", post?.content ?? "");
    setValue("category", post?.category ?? "");
  }, [setValue, post]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <h1 className=" text-2xl font-semibold">Edit post {post?.id}</h1>
          <div className=" gap-2 flex">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setValue("status", "draft")}
            >
              {isPending ? "..." : "Draft"}
            </Button>
            <Button
              size="sm"
              type="submit"
              onClick={() => setValue("status", "publish")}
            >
              {isPending ? "..." : "Publish"}
            </Button>
          </div>
        </div>

        <div className=" mt-8">
          <div className=" space-y-1">
            <Label>Title</Label>
            <Input {...register("title")} />
            {errors.title && (
              <p className=" text-red-600 text-xs">{errors.title.message}</p>
            )}
          </div>

          <div className=" space-y-1 mt-4">
            <Label>Content</Label>
            <Textarea rows={10} {...register("content")} />
            {errors.content && (
              <p className=" text-red-600 text-xs">{errors.content.message}</p>
            )}
          </div>

          <div className=" space-y-1 mt-4">
            <Label>Category</Label>
            <Input {...register("category")} />
            {errors.category && (
              <p className=" text-red-600 text-xs">{errors.category.message}</p>
            )}
          </div>

          <div className=" space-y-1 mt-4">
            <Label>Status</Label>
            {errors.status && (
              <p className=" text-red-600 text-xs">{errors.status.message}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
