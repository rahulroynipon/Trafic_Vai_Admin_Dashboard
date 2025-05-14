import useManagerStore from "../../store/managerStore";
import avatarPlaceholder from "../../assets/avatar-placeholder.jpg";
import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";
import { useState } from "react";
import Modal from "../ui/Modal";
import { Form, Formik } from "formik";
import { managerAvatarSchema as validationSchema } from "../../schema/manager.schema";
import ImageInputField from "./../ui/ImageInputField";

function ManagerAvatarSection() {
  const initialValues = {
    avatar: null,
  };

  const { profile, isLoading } = useManagerStore();
  const [isOpen, setIsopen] = useState(false);

  const onOpen = () => {
    setIsopen(true);
  };

  const onClose = () => {
    setIsopen(false);
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

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
                className="w-full h-full object-cover"
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
        <div>
          {isLoading.profileGet ? (
            <Skeleton className="w-28 h-8" />
          ) : (
            <Button onClick={onOpen} className="text-nowrap">
              Update Avatar
            </Button>
          )}
        </div>
      </div>

      {/* avatar update */}
      <Modal title="Update Avatar" isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4 mt-5">
              <ImageInputField name="avatar" />

              <Button className="w-full">Update</Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default ManagerAvatarSection;
