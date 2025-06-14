import * as Yup from "yup";

export const subserviceSchema = Yup.object().shape({
  name: Yup.string().required("Subservice name is required"),
  description: Yup.string().required("Subservice description is required"),
  icon: Yup.mixed()
    .required("Icon is required")
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
  service: Yup.string().required("Service ID is required"),
  type: Yup.string().oneOf(["one-time", "subscription"]),
});

export const plansSchema = Yup.object().shape({
  plans: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().oneOf(["Basic", "Pro", "Enterprise"]).required(),
      price: Yup.object().shape({
        BDT: Yup.number().required("Price in BDT is required"),
        USD: Yup.number().required("Price in USD is required"),
      }),
      duration: Yup.number(),
      features: Yup.array().of(Yup.string().required()),
      tableRows: Yup.array().of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
      ),
    })
  ),
});
