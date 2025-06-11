import useManagerStore from "../../store/managerStore";
import avatarPlaceholder from "../../assets/avatar-placeholder.jpg";
import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { Form, Formik } from "formik";
import { managerAvatarSchema as validationSchema } from "../../schema/manager.schema";
import ImageInputField from "./../ui/ImageInputField";
import { useParams } from "react-router";
import { permessions } from "../../data/Permissions";
import useAuthStore from "../../store/authStore";

function ManagerAvatarSection() {
  const { id } = useParams();
  const initialValues = {
    avatar: null,
  };

  const { hasPermission } = useAuthStore();
  const { updateManagerProfileHandler, profile, isLoading, isSuccess } =
    useManagerStore();
  const [isOpen, setIsopen] = useState(false);

  const onOpen = () => {
    setIsopen(true);
  };

  const onClose = () => {
    setIsopen(false);
  };

  const handleSubmit = (values) => {
    if (isLoading.avatar) return;
    updateManagerProfileHandler("avatar", id, values);
  };

  useEffect(() => {
    if (isSuccess.avatar) onClose();
  }, [isSuccess]);

  return (
    <>
      <div className="p-5 bg-base-100 shadow-sm flex flex-wrap items-center justify-between space-x-4 gap-4">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="size-14 md:size-18 rounded-full overflow-hidden bg-gray-200">
            {isLoading.profileGet ? (
              <Skeleton className="h-full" />
            ) : (
              <img
                src={profile?.avatar?.url || avatarPlaceholder}
                alt="Avatar"
                className="w-full h-full object-cover "
              />
            )}
          </div>

          {/* Name & Email */}
          <div className="flex flex-col">
            {isLoading.profileGet ? (
              <>
                <Skeleton className="w-32 h-4 md:h-5 mb-1" />
                <Skeleton className="w-24 h-3 md:h-4" />
              </>
            ) : (
              <>
                <h2 className="md:text-lg font-semibold text-content-200 break-all">
                  {profile?.fullname}
                </h2>
                <p className="text-xs md:text-sm text-content-400">
                  {profile?.email}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Button */}
        {hasPermission(permessions.manager) ? (
          <div>
            {isLoading.profileGet ? (
              <Skeleton className="w-28 h-8" />
            ) : (
              <Button onClick={onOpen} className="text-nowrap">
                Update Avatar
              </Button>
            )}
          </div>
        ) : null}
      </div>

      {hasPermission(permessions.manager) ? (
        <Modal title="Update Avatar" isOpen={isOpen} onClose={onClose}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4 mt-5">
                <ImageInputField name="avatar" />

                <Button
                  type="submit"
                  className="w-full"
                  isLoading={isLoading.avatar}
                  disabled={isLoading.avatar}
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      ) : null}
    </>
  );
}

export default ManagerAvatarSection;
