import * as Yup from "yup";

export const createBlogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  thumbnail: Yup.mixed()
    .required("Thumbnail is required")
    .test("fileType", "Unsupported file type", (value) => {
      if (!value) return false;
      return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        value.type
      );
    })
    .test("fileSize", "File size is too large (max 5MB)", (value) => {
      if (!value) return false;
      return value.size <= 5 * 1024 * 1024;
    }),
});
