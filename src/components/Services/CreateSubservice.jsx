import { useState } from "react";
import { useParams } from "react-router";
import { Formik, Form, Field, FieldArray, getIn } from "formik";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";
import ImageDropzone from "../ui/ImageDropzone";
import { IoCloseOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import {
  subserviceSchema,
  typeSchema,
  dynamicPlanSchema,
} from "../../schema/subservice.schema";

const plansList = ["Basic", "Pro", "Enterprise"];

function CreateSubservice() {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);

  const initialValues = {
    name: "",
    description: "",
    icon: null,
    service: id,
    type: "one-time",
    plans: plansList.map((name) => ({
      name,
      price: { BDT: "", USD: "" },
      duration: "",
      features: [],
      tableRows: [],
    })),
  };

  const openHandler = () => {
    setStep(1);
    setCurrentPlanIndex(0);
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
    setStep(1);
    setCurrentPlanIndex(0);
  };

  const prevStepHandler = () => {
    if (step === 4) {
      setStep(3);
      setCurrentPlanIndex(2);
    } else if (step === 3) {
      if (currentPlanIndex > 0) {
        setCurrentPlanIndex((prev) => prev - 1);
      } else {
        setStep(2);
      }
    } else if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const submitHandler = (values) => {
    console.log("✅ Final Form Values:", values);
  };

  return (
    <>
      <Button onClick={openHandler} className="flex items-center space-x-1.5">
        <FiPlus />
        <span>Add New Sub-Service</span>
      </Button>

      <Modal isOpen={isOpen} onClose={closeHandler} title="Add New Sub-Service">
        <Formik
          initialValues={initialValues}
          validationSchema={
            step === 1
              ? subserviceSchema
              : step === 2
              ? typeSchema
              : dynamicPlanSchema(currentPlanIndex)
          }
          onSubmit={submitHandler}
        >
          {({ values, validateForm, setTouched }) => {
            const getFieldsForCurrentStep = (step, planIndex) => {
              switch (step) {
                case 1:
                  return ["name", "description", "icon"];
                case 2:
                  return ["type"];
                case 3:
                  return [
                    `plans.${planIndex}.price.BDT`,
                    `plans.${planIndex}.price.USD`,
                    `plans.${planIndex}.duration`,
                  ];
                default:
                  return [];
              }
            };

            const nextStepHandler = async (e) => {
              if (e) e.preventDefault();

              const fieldsToTouch = getFieldsForCurrentStep(
                step,
                currentPlanIndex
              );

              // Mark fields as touched
              const touched = {};
              fieldsToTouch.forEach((path) => {
                const keys = path.split(".");
                let ref = touched;
                keys.forEach((key, i) => {
                  if (i === keys.length - 1) ref[key] = true;
                  else {
                    ref[key] = ref[key] || {};
                    ref = ref[key];
                  }
                });
              });

              setTouched(touched);

              const err = await validateForm();
              const hasErrors = fieldsToTouch.some((path) => getIn(err, path));

              if (hasErrors) return;

              if (step === 3) {
                if (currentPlanIndex < 2) {
                  setCurrentPlanIndex((prev) => prev + 1);
                } else {
                  setStep(4);
                }
              } else {
                setStep((prev) => prev + 1);
              }
            };

            return (
              <Form className="space-y-4">
                {/* Step 1: Basic Info */}
                {step === 1 && (
                  <div className="space-y-3">
                    <ImageDropzone
                      name="icon"
                      label="Sub-Service Icon"
                      required
                      className="h-[10rem]"
                    />
                    <InputField name="name" label="Sub-Service Name" required />
                    <TextAreaField
                      name="description"
                      label="Description"
                      required
                    />
                  </div>
                )}

                {/* Step 2: Type */}
                {step === 2 && (
                  <div className="mt-5 flex flex-col items-center justify-center gap-3">
                    <label className="max-w-sm text-center italic text-sm font-semibold text-content-300">
                      What type of payment model do you want to offer for this
                      sub-service?
                    </label>
                    <div className="flex gap-4 font-semibold text-content-200">
                      <label className="flex items-center gap-2">
                        <Field
                          type="radio"
                          name="type"
                          value="one-time"
                          className="size-3.5"
                        />
                        One-time
                      </label>
                      <label className="flex items-center gap-2">
                        <Field
                          type="radio"
                          name="type"
                          value="subscription"
                          className="size-3.5"
                        />
                        Subscription
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 3: Plans */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-center mt-3">
                      {plansList[currentPlanIndex]} Plan
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <InputField
                        name={`plans.${currentPlanIndex}.price.BDT`}
                        label="Price (BDT)"
                        required
                      />
                      <InputField
                        name={`plans.${currentPlanIndex}.price.USD`}
                        label="Price (USD)"
                        required
                      />
                    </div>
                    <InputField
                      name={`plans.${currentPlanIndex}.duration`}
                      label="Duration"
                      required
                    />

                    {/* One-time features */}
                    {values.type === "one-time" && (
                      <FieldArray name={`plans.${currentPlanIndex}.features`}>
                        {({ remove, push }) => (
                          <div className="space-y-2">
                            <label className="block font-medium text-sm">
                              Features
                            </label>
                            <ul className="space-y-2">
                              {values.plans[currentPlanIndex].features.map(
                                (_, i) => (
                                  <li key={i} className="flex gap-2">
                                    <InputField
                                      name={`plans.${currentPlanIndex}.features.${i}`}
                                      placeholder={`Feature ${i + 1}`}
                                    />
                                    <Button
                                      type="button"
                                      variant="outline"
                                      className="self-start h-10 border-red-500/40 text-red-500"
                                      onClick={() => remove(i)}
                                    >
                                      <IoCloseOutline />
                                    </Button>
                                  </li>
                                )
                              )}
                            </ul>
                            <Button
                              type="button"
                              className="flex items-center gap-2"
                              onClick={() => push("")}
                            >
                              <FiPlus />
                              <span>Add Feature</span>
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                    )}

                    {/* Subscription tableRows */}
                    {values.type === "subscription" && (
                      <FieldArray name={`plans.${currentPlanIndex}.tableRows`}>
                        {({ remove, push }) => (
                          <div className="space-y-2">
                            <label className="block font-medium text-sm">
                              Table Rows
                            </label>
                            <ul className="space-y-2">
                              {values.plans[currentPlanIndex].tableRows.map(
                                (_, i) => (
                                  <li key={i} className="flex gap-2">
                                    <InputField
                                      name={`plans.${currentPlanIndex}.tableRows.${i}.label`}
                                      placeholder="Label"
                                    />
                                    <InputField
                                      name={`plans.${currentPlanIndex}.tableRows.${i}.value`}
                                      placeholder="Value"
                                    />
                                    <Button
                                      type="button"
                                      variant="outline"
                                      className="self-start h-10 border-red-500/40 text-red-500"
                                      onClick={() => remove(i)}
                                    >
                                      <IoCloseOutline />
                                    </Button>
                                  </li>
                                )
                              )}
                            </ul>
                            <Button
                              type="button"
                              className="flex items-center gap-2"
                              onClick={() => push({ label: "", value: "" })}
                            >
                              <FiPlus />
                              <span>Add Row</span>
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                    )}
                  </div>
                )}

                {/* Step 4: Summary */}
                {step === 4 && (
                  <div className="text-left">
                    <div className="text-left">
                      <h2 className="text-xl font-bold pb-1 text-center">
                        Summary
                      </h2>

                      <div className="flex items-start gap-2">
                        <span className="w-24 font-medium text-gray-600">
                          Name:
                        </span>
                        <span className="text-gray-900">{values.name}</span>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="w-24 font-medium text-gray-600">
                          Type:
                        </span>
                        <span className="text-gray-900 capitalize">
                          {values.type}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 mt-4">
                      {plansList.map((plan, i) => (
                        <div
                          key={plan}
                          className="pl-4 border-l border-gray-300"
                        >
                          <p className="font-semibold">{plan} Plan:</p>
                          <ul className="pl-3.5 list-disc list-inside text-sm">
                            <li>
                              <span className="font-medium">Price (BDT):</span>{" "}
                              {values.plans[i].price.BDT}
                            </li>
                            <li>
                              <span className="font-medium">Price (USD):</span>{" "}
                              {values.plans[i].price.USD}
                            </li>
                            <li>
                              <span className="font-medium">Duration:</span>{" "}
                              {values.plans[i].duration}
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-5 gap-2">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStepHandler}
                      className="flex-1"
                    >
                      Previous
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button
                      type="button"
                      className="flex-1"
                      onClick={(e) => nextStepHandler(e)}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" className="flex-1">
                      Submit
                    </Button>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
}

export default CreateSubservice;
