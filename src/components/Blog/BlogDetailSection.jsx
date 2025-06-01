import { useState, useEffect } from "react";
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

function BlogDetailSection() {
  const { blog, isLoading } = useBlogStore();
  const { hasPermission } = useAuthStore();
  const { services } = useAuthStore();

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
        <>Edit section</>
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

// {!isEdit && hasPermission(permessions.blog) ? (
//       <div>
//         <h2 className="text-xl font-semibold text-content-200">
//           Update Blog
//         </h2>

//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ resetForm, values, setFieldValue, errors, touched }) => (
//             <Form className="space-y-4">
//               <InputField
//                 name="title"
//                 label="Title"
//                 required
//                 placeholder="Enter a compelling title for your blog post"
//               />
//               <TextAreaField
//                 name="description"
//                 label="Blog Description"
//                 placeholder="Write a brief and engaging description for your blog post..."
//                 rows={12}
//                 required
//               />
//             </Form>
//           )}
//         </Formik>
//       </div>
//     ) : (
//       <div>
//         <div className="flex justify-between items-start gap-3">
//           {isLoading.getSingle ? (
//             <Skeleton className="h-8 w-full max-w-md mb-3.5" />
//           ) : (
//             <h2 className="text-content-200 text-lg md:text-xl lg:text-2xl font-semibold mb-3.5">
//               {blog?.title}
//             </h2>
//           )}

//           {hasPermission(permessions.blog) &&
//             (isLoading.getSingle ? (
//               <Skeleton className="size-8 rounded-full" />
//             ) : (
//               <Button
//                 onClick={handleEdit}
//                 variant="icon"
//                 className="size-10 relative -top-1"
//               >
//                 <MdEditSquare className="text-2xl" />
//               </Button>
//             ))}
//         </div>

//         {isLoading.getSingle ? (
//           Array.from({ length: 8 }).map((_, idx) => (
//             <Skeleton key={idx} className="h-4 mb-2 w-full" />
//           ))
//         ) : (
//           <p className="text-content-300 whitespace-pre-line">
//             {blog?.description}
//           </p>
//         )}
//       </div>
//     )}
