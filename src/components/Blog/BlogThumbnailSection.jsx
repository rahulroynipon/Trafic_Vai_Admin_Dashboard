import useBlogStore from "../../store/blogStore";
import Skeleton from "../ui/Skeleton"; // Optional: only if you have a Skeleton component

function BlogThumbnailSection() {
  const { blog, isLoading } = useBlogStore();

  return (
    <div className="p-5 bg-base-100 shadow-sm">
      <div className="aspect-[10/4] w-full">
        {isLoading.getSingle ? (
          <Skeleton className="max-w-full rounded-none h-full" />
        ) : (
          <img
            src={blog?.thumbnail?.url}
            alt={`${blog?.slug || "blog"} thumbnail`}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

export default BlogThumbnailSection;
