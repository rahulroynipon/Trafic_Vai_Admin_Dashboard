import * as Yup from "yup";

const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
const maxFileSize = 5 * 1024 * 1024;

export const subserviceSchema = Yup.object().shape({
  name: Yup.string().required("Subservice name is required"),
  description: Yup.string().required("Subservice description is required"),
  icon: Yup.mixed()
    .required("Icon is required")
    .test("fileType", "Unsupported file type", (value) => {
      if (!value) return false;
      return allowedFileTypes.includes(value.type);
    })
    .test("fileSize", "File size is too large (max 5MB)", (value) => {
      if (!value) return false;
      return value.size <= maxFileSize;
    }),
  service: Yup.string().required("Service ID is required"),
});

export const typeSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(["one-time", "subscription"], "Invalid type")
    .required("Type is required"),
});


export const dynamicPlanSchema = (index) => {
  return Yup.object().shape({
    plans: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Name is required"),
          price: Yup.object().shape({
            BDT: Yup.number()
              .typeError("Price in BDT must be a number")
              .required("Price in BDT is required"),
            USD: Yup.number()
              .typeError("Price in USD must be a number")
              .required("Price in USD is required"),
          }),
          duration: Yup.number()
            .nullable()
            .typeError("Duration must be a number")
            .required("Duration is required"),
          features: Yup.array().of(
            Yup.string().required("Feature cannot be empty")
          ),
          tableRows: Yup.array().of(
            Yup.object().shape({
              label: Yup.string().required("Label is required"),
              value: Yup.string().required("Value is required"),
            })
          ),
        })
      )
      .test("validate-only-current", "Plan is invalid", function (plans) {
        const plan = plans?.[index];
        if (!plan) return false;
        try {
          const planSchema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.object().shape({
              BDT: Yup.number().required(),
              USD: Yup.number().required(),
            }),
            duration: Yup.number().required(),
          });
          planSchema.validateSync(plan, { abortEarly: false });
          return true;
        } catch {
          return false;
        }
      }),
  });
};
