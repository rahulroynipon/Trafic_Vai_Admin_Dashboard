import * as Yup from "yup";

export const managerSchema = Yup.object().shape({
  fullname: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  permissions: Yup.array()
    .of(Yup.string().required("Permission value cannot be empty"))
    .min(1, "At least one permission is required")
    .required("Permission is required"),
});
