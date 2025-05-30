import useManagerStore from "../../store/managerStore";
import Skeleton from "../ui/Skeleton";
import { permessionOptions } from "../../data/Permissions";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { managerPermissionsSchema as validationSchema } from "../../schema/manager.schema";
import { MdEditSquare } from "react-icons/md";
import Button from "../ui/Button";
import CheckboxGroupField from "../ui/CheckboxGroupField";
import { useParams } from "react-router";

function ManagerPermissinSection() {
  const { id } = useParams();
  const { updateManagerProfileHandler, profile, isLoading, isSuccess } =
    useManagerStore();
  const [isEdit, setIsEdit] = useState(false);

  const initialValues = {
    permissions: profile?.permissions || [],
  };

  const onEdit = () => {
    setIsEdit(true);
  };

  const onClose = () => {
    setIsEdit(false);
  };

  const handleSubmit = (values) => {
    console.log(values);
    if (isLoading.permissions) return;
    updateManagerProfileHandler("permissions", id, values);
  };

  useEffect(() => {
    if (isSuccess.permissions) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <div className="p-5 bg-base-100 shadow-sm">
      <div className="flex gap-4 items-center justify-between mb-4">
        {isLoading.profileGet ? (
          <Skeleton className="h-8 max-w-48" />
        ) : (
          <h1 className="text-xl font-semibold text-content-200">
            Permissions
          </h1>
        )}

        {isLoading.profileGet ? (
          <Skeleton className="size-8 rounded-full" />
        ) : !isEdit ? (
          <Button onClick={onEdit} variant="icon" className="size-10">
            <MdEditSquare className="text-2xl" />
          </Button>
        ) : null}
      </div>

      <div className="px-4">
        <div>
          {isLoading.profileGet ? (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {[...Array(6)].map((_, index) => (
                <li key={index} className="flex gap-2 flex-wrap items-center">
                  <Skeleton />
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
                <Form>
                  <CheckboxGroupField
                    name="permissions"
                    options={permessionOptions}
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
                      disabled={isLoading.permissions}
                      isLoading={isLoading.permissions}
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <ul className="grid md:grid-cols-2 gap-x-4 space-y-2.5  text-sm">
              {profile?.permissions?.length === 0 ? (
                <li className="flex gap-2 flex-wrap items-center text-content-300">
                  No permissions assigned
                </li>
              ) : (
                profile?.permissions?.map((permission, index) => (
                  <li
                    key={index}
                    className="flex items-center  gap-2 flex-wrap"
                  >
                    <span className="font-medium text-content-200">
                      <input
                        type="radio"
                        checked
                        readOnly
                        className="size-3 relative top-[1.5px]"
                      />
                    </span>
                    <span className="text-content-300 capitalize">
                      {permission}
                    </span>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagerPermissinSection;
