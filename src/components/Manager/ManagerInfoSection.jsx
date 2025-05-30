import useManagerStore from "../../store/managerStore";
import Button from "../ui/Button";
import { FaUserPen } from "react-icons/fa6";
import Skeleton from "../ui/Skeleton";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { managerInfoSchema as validationSchema } from "../../schema/manager.schema";
import InputField from "./../ui/InputField";
import { useParams } from "react-router";
import useAuthStore from "../../store/authStore";
import { permessions } from "../../data/Permissions";

function ManagerInfoSection() {
  const { id } = useParams();
  const { hasPermission } = useAuthStore();
  const { updateManagerProfileHandler, profile, isLoading, isSuccess } =
    useManagerStore();
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => {
    setIsEdit(true);
  };

  const onClose = () => {
    setIsEdit(false);
  };

  const initialValues = {
    fullname: profile?.fullname || "",
    email: profile?.email || "",
    password: profile?.__raw__password || "",
  };

  const handleSubmit = (values) => {
    if (isLoading.info) return;
    updateManagerProfileHandler("info", id, values);
  };

  useEffect(() => {
    if (isSuccess.info) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <>
      <div className="p-5 bg-base-100 shadow-sm">
        <div className="flex gap-4 items-center justify-between mb-4">
          {isLoading.profileGet ? (
            <Skeleton className="h-8 max-w-48" />
          ) : (
            <h1 className="text-xl font-semibold text-content-200">
              Basic Information
            </h1>
          )}

          {hasPermission(permessions.manager) ? (
            isLoading.profileGet ? (
              <Skeleton className="size-8 rounded-full" />
            ) : !isEdit ? (
              <Button onClick={onEdit} variant="icon" className="size-10">
                <FaUserPen className="text-2xl" />
              </Button>
            ) : null
          ) : null}
        </div>

        <div className="px-4">
          <div>
            {isLoading.profileGet ? (
              <ul className="space-y-2.5">
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="flex gap-2 flex-wrap items-center">
                    <Skeleton className="max-w-24" />
                    <Skeleton className="max-w-48" />
                  </li>
                ))}
              </ul>
            ) : isEdit ? (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form className="space-y-3 py-2">
                    <InputField
                      name="fullname"
                      label="Fullname"
                      placeholder="Enter your full name"
                    />
                    <InputField
                      name="email"
                      label="Email"
                      placeholder="Enter your email"
                    />
                    <InputField
                      name="password"
                      label="Password"
                      placeholder="Enter your password"
                    />

                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        className="mt-2.5"
                        onClick={onClose}
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
              <ul className="space-y-2.5 text-sm">
                <li className="flex gap-2 flex-wrap">
                  <span className="font-medium text-content-200">
                    Manager ID:
                  </span>
                  <span className="break-all text-content-300">
                    {profile?._id}
                  </span>
                </li>
                <li className="flex gap-2 flex-wrap">
                  <span className="font-medium text-content-200">
                    Fullname:
                  </span>
                  <span className="text-content-300">{profile?.fullname}</span>
                </li>
                <li className="flex gap-2 flex-wrap">
                  <span className="font-medium text-content-200">Email:</span>
                  <span className="break-all text-content-300">
                    {profile?.email}
                  </span>
                </li>
                <li className="flex gap-2 flex-wrap">
                  <span className="font-medium text-content-200">Role:</span>
                  <span className="text-content-300 capitalize">
                    {profile?.role}
                  </span>
                </li>
                {profile?.__raw__password ? (
                  <li className="flex gap-2 flex-wrap">
                    <span className="font-medium text-content-200">
                      Password:
                    </span>
                    <span className="italic  text-content-300">
                      {profile?.__raw__password}
                    </span>
                  </li>
                ) : null}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerInfoSection;
