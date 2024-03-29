"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostCreateRequest, postCreateRequest } from "@/lib/validation/post";
import { createPost } from "@/services/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function NewPostPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<PostCreateRequest>({
    resolver: zodResolver(postCreateRequest),
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ["post", "create"],
    mutationFn: createPost,
  });

  const onSubmit: SubmitHandler<PostCreateRequest> = async (data) => {
    const request = postCreateRequest.parse(data);

    mutateAsync(request);
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      router.push(`/posts?status=${getValues("status")}`);
    }
  }, [getValues, router, queryClient, isSuccess]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <h1 className=" text-2xl font-semibold">New post</h1>
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
        </div>
      </form>
    </div>
  );
}
