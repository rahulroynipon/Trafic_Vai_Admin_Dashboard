import { ErrorMessage, Form, Formik } from "formik";
import { createBlogSchema as validationSchema } from "../../schema/blog.schema";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";
import Button from "../ui/Button";
import ImageDropzone from "../ui/ImageDropzone";
import useBlogStore from "./../../store/blogStore";
import { useEffect, useRef } from "react";
import Dropdown from "../ui/Dropdown";
import useOptionStore from "../../store/optionStore";
import { GiCheckMark } from "react-icons/gi";
import { cn } from "../../lib/utils";

function CreateBlog() {
  const initialValues = {
    title: "",
    description: "",
    thumbnail: "",
    service: "",
  };

  const { services } = useOptionStore();
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
          {({ resetForm, values, setFieldValue, errors, touched }) => (
            <Form className="space-y-4">
              <ImageDropzone
                name="thumbnail"
                label="Thumbnail"
                required
                className="h-[362px]"
              />

              {/* dropdown menu start */}
              <div className="w-full">
                <label
                  htmlFor="service"
                  className="font-medium mb-1 text-sm text-content-400 block"
                >
                  Service<span className="text-red-500">*</span>
                </label>

                <Dropdown
                  id="service"
                  name="service"
                  className={cn(
                    touched.service &&
                      errors.service &&
                      "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  )}
                  value={
                    services.find((s) => s.value === values.service)?.label
                  }
                  onChange={(item) => setFieldValue("service", item?.value)}
                  renderOption={({ select }) => (
                    <ul className="max-h-60 overflow-y-auto">
                      {services?.map((service) => (
                        <li
                          key={service?.value}
                          onClick={() => select(service)}
                          className="flex items-center justify-between gap-3 py-2 px-3 hover:bg-base-300 cursor-pointer transition-colors duration-150"
                        >
                          <span>{service?.label}</span>
                          {service?.value === values.service && (
                            <GiCheckMark className="text-primary" />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                />

                <ErrorMessage
                  name="service"
                  component="div"
                  className="text-red-700 text-sm mt-1.5"
                />
              </div>

              {/* dropdown menu end */}

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
