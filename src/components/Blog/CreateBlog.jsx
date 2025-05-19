import { Form, Formik } from "formik";
import { createBlogSchema as validationSchema } from "../../schema/blog.schema";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";
import Button from "../ui/Button";
import ImageDropzone from "../ui/ImageDropzone";
import useBlogStore from "./../../store/blogStore";
import { useEffect, useRef } from "react";

function CreateBlog() {
  const initialValues = {
    title: "",
    description: "",
    thumbnail: "",
  };

  const { createBlogHandler, isLoading, isSuccess } = useBlogStore();
  const formikRef = useRef(null);

  const handleSubmit = (values, { resetForm }) => {
    if (isLoading.create) return;
    createBlogHandler(values);
  };

  useEffect(() => {
    if (isSuccess.create && formikRef.current) {
      formikRef.current.resetForm();
    }
  }, [isSuccess]);

  return (
    <div className="bg-base-100">
      <div className="p-4 z-10 sticky top-0 bg-base-100">
        <h1 className="text-2xl font-semibold text-content-200 pb-4 border-gray-200 border-b">
          Add New Blog
        </h1>
      </div>
      <div className="p-4 w-full">
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ resetForm }) => (
            <Form className="space-y-4">
              <ImageDropzone
                name="thumbnail"
                label="Thumbnail"
                required
                className="h-[362px]"
              />
              <InputField
                name="title"
                label="Title"
                required
                placeholder="Enter a compelling title for your blog post"
              />
              <TextAreaField
                name="description"
                label="Blog Description"
                placeholder="Write a brief and engaging description for your blog post..."
                rows={12}
                required
              />
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" onClick={() => resetForm()}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading.create}
                  disabled={isLoading.create}
                >
                  Upload Blog
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateBlog;
