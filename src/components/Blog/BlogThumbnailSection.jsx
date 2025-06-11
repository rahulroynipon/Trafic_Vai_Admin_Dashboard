import { useEffect, useState } from "react";
import useBlogStore from "../../store/blogStore";
import Skeleton from "../ui/Skeleton";
import Button from "../ui/Button";
import { IoCamera } from "react-icons/io5";
import useAuthStore from "./../../store/authStore";
import { permessions } from "./../../data/Permissions";
import Modal from "../ui/Modal";
import ImageInputField from "../ui/ImageInputField";
import { Form, Formik } from "formik";
import { upadteThumbnail as validationSchema } from "../../schema/blog.schema";
import { useParams } from "react-router";

function BlogThumbnailSection() {
  const { id } = useParams();
  const { blog, isLoading, isSuccess, updateBlogHandler } = useBlogStore();
  const { hasPermission } = useAuthStore();

  const initialValues = {
    thumbnail: null,
  };

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleClose = () => {
    setIsEdit(false);
  };

  const handleSubmit = (values) => {
    if (isLoading.thumbnail) return;
    updateBlogHandler("thumbnail", id, values);
  };

  useEffect(() => {
    if (isSuccess.thumbnail) handleClose();
  }, [isSuccess]);

  return (
    <div className="p-5 bg-base-100 shadow-sm">
      {isLoading.getSingle ? (
        //loading animation
        <div className="relative">
          <div className="aspect-[10/4] w-full">
            <Skeleton className="max-w-full rounded-none h-full" />
          </div>
          {hasPermission(permessions.blog) ? (
            <Skeleton className="size-8 rounded-full absolute top-4 right-5" />
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
          <Button
            onClick={handleEdit}
            variant="icon"
            className="size-10 absolute top-4 right-5"
          >
            <IoCamera className="text-2xl" />
          </Button>
        </div>
      )}

      {hasPermission(permessions.blog) ? (
        <Modal title="Update Thumbnail" isOpen={isEdit} onClose={handleClose}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {() => (
              <Form className="space-y-4 mt-5">
                <ImageInputField name="thumbnail" />
                <Button
                  type="submit"
                  className="w-full"
                  isLoading={isLoading.thumbnail}
                  disabled={isLoading.thumbnail}
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      ) : null}
    </div>
  );
}

export default BlogThumbnailSection;
