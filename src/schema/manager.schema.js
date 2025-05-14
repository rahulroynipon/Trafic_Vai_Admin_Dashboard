import * as Yup from "yup";

export const managerSchema = Yup.object().shape({
  fullname: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  permissions: Yup.array().of(
    Yup.string().required("Permission value cannot be empty")
  ),
});

export const managerAvatarSchema = Yup.object().shape({
  avatar: Yup.mixed()
    .required("Avatar is required")
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

export const managerInfoSchema = Yup.object().shape({
  fullname: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const managerDeleteSchema = Yup.object().shape({
  permissions: Yup.array().of(
    Yup.string().required("Permission value cannot be empty")
  ),
});
