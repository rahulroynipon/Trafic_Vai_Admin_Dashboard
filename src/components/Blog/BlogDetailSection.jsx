import { useState } from "react";
import { FaUserPen } from "react-icons/fa6";
import useBlogStore from "../../store/blogStore";
import useAuthStore from "../../store/authStore";
import { permessions } from "../../data/Permissions";
import Skeleton from "../ui/Skeleton";
import Button from "../ui/Button";
import { MdEditSquare } from "react-icons/md";

function BlogDetailSection() {
  const { blog, isLoading } = useBlogStore();
  const { hasPermission } = useAuthStore();

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => setIsEdit(true);
  const handleClose = () => setIsEdit(false);

  return (
    <div className="p-5 bg-base-100 shadow-sm">
      {!isEdit ? (
        <div>
          <h2 className="text-xl font-semibold text-content-200">
            Update Blog
          </h2>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start gap-3">
            {isLoading.getSingle ? (
              <Skeleton className="h-8 w-full max-w-md mb-3.5" />
            ) : (
              <h2 className="text-content-200 text-lg md:text-xl lg:text-2xl font-semibold mb-3.5">
                {blog?.title}
              </h2>
            )}

            {hasPermission(permessions.manager) &&
              (isLoading.getSingle ? (
                <Skeleton className="size-8 rounded-full" />
              ) : (
                <Button
                  onClick={handleEdit}
                  variant="icon"
                  className="size-10 relative -top-1"
                >
                  <MdEditSquare className="text-2xl" />
                </Button>
              ))}
          </div>

          {isLoading.getSingle ? (
            Array.from({ length: 8 }).map((_, idx) => (
              <Skeleton key={idx} className="h-4 mb-2 w-full" />
            ))
          ) : (
            <p className="text-content-300 whitespace-pre-line">
              {blog?.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogDetailSection;
