import { useState } from "react";
import useBlogStore from "../../store/blogStore";
import useAuthStore from "../../store/authStore";
import { permessions } from "../../data/Permissions";
import { updateBlogSchema as validationSchema } from "../../schema/blog.schema";
import Skeleton from "../ui/Skeleton";
import Button from "../ui/Button";
import { MdEditSquare } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { Formik, Form, ErrorMessage } from "formik";
import Dropdown from "../ui/Dropdown";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";
import { cn } from "../../lib/utils";
import useOptionStore from "../../store/optionStore";

function BlogDetailSection() {
  const { blog, isLoading } = useBlogStore();
  const { hasPermission } = useAuthStore();
  const { services } = useOptionStore();

  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => setIsEdit(true);
  const handleClose = () => setIsEdit(false);

  const initialValues = {
    service: blog?.service || "",
    title: blog?.title || "",
    description: blog?.description || "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="p-5 bg-base-100 shadow-sm">
      {isLoading.getSingle ? (
        // loading skeleton
        <>
          <div className="flex justify-between items-start gap-3 mb-5">
            <Skeleton className="h-8 w-full max-w-md" />
            {hasPermission(permessions.blog) ? (
              <Skeleton className="size-8 rounded-full" />
            ) : null}
          </div>
          <p>
            {Array.from({ length: 8 }).map((_, idx) => (
              <Skeleton key={idx} className="h-4 mb-2 max-w-full" />
            ))}
          </p>
        </>
      ) : isEdit && hasPermission(permessions.blog) ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="space-y-4">
              <h2 className="text-xl font-semibold text-content-200">
                Update Blog
              </h2>

              <InputField
                name="title"
                label="Title"
                required
                placeholder="Enter a compelling title for your blog post"
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

              <TextAreaField
                name="description"
                label="Blog Description"
                placeholder="Write a brief and engaging description for your blog post..."
                rows={12}
                required
              />

              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  className="mt-2.5"
                  onClick={handleClose}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="mt-2.5"
                  disabled={isLoading.info}
                  isLoading={isLoading.info}
                >
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        // view section
        <>
          <div className="flex justify-between gap-3 mb-3">
            <h2 className="text-content-200 text-lg md:text-xl lg:text-2xl font-semibold">
              {blog?.title}
            </h2>
            {hasPermission(permessions.blog) ? (
              <Button
                onClick={handleEdit}
                variant="icon"
                className="size-10 relative -top-1"
              >
                <MdEditSquare className="text-2xl" />
              </Button>
            ) : null}
          </div>
          <p className="text-content-300 whitespace-pre-line">
            {blog?.description}
          </p>
        </>
      )}
    </div>
  );
}

export default BlogDetailSection;
