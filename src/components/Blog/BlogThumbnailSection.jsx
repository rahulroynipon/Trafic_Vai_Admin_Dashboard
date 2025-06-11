import { useState } from "react";
import useBlogStore from "../../store/blogStore";
import Skeleton from "../ui/Skeleton";
import Button from "../ui/Button";
import { IoCamera } from "react-icons/io5";
import useAuthStore from "./../../store/authStore";
import { permessions } from "./../../data/Permissions";

function BlogThumbnailSection() {
  const { blog, isLoading } = useBlogStore();
  const { hasPermission } = useAuthStore();

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleClose = () => {
    setIsEdit(false);
  };

  return (
    <div className="p-5 bg-base-100 shadow-sm">
      {isLoading.getSingle ? (
        //loading animation
        <div className="relative">
          <div className="aspect-[10/4] w-full">
            <Skeleton className="max-w-full rounded-none h-full" />
          </div>
          {hasPermission(permessions.blog) ? (
            <Skeleton className="size-8 rounded-full absolute top-6 right-6" />
          ) : null}
        </div>
      ) : (
        // display the thumbnail
        <div className="relative">
          <div className="aspect-[10/4] w-full">
            <img
              src={blog?.thumbnail?.url}
              alt={`${blog?.slug || "blog"} thumbnail`}
              className="w-full h-full object-cover"
            />
          </div>
          <Button variant="icon" className="size-10 absolute top-6 right-6">
            <IoCamera className="text-2xl" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default BlogThumbnailSection;
