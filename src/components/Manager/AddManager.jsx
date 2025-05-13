import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { TableHeader } from "../ui/Table";
import { FiPlus } from "react-icons/fi";
import Modal from "../ui/Modal";
import { Formik, Form } from "formik";
import InputField from "../ui/InputField";
import { managerSchema as validationSchema } from "../../schema/manager.schema";
import CheckboxGroupField from "../ui/CheckboxGroupField";
import permessionOptions from "../../data/Permissions";
import useManagerStore from "../../store/managerStore";

function AddManager() {
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    permissions: [],
  };
  const { createManagerHandler, isLoading, isError, isSuccess } =
    useManagerStore();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (values) => {
    console.log(values);
    if (isLoading.create) return;
    createManagerHandler(values);
  };

  useEffect(() => {
    if (isSuccess.create) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <TableHeader title="Manager">
      <Button onClick={onOpen} className="flex items-center space-x-1.5">
        <FiPlus />
        <span>Add</span>
      </Button>
      <Modal title="Add Manager" isOpen={isOpen} onClose={onClose}>
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
                required
              />
              <InputField
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                required
              />
              <InputField
                name="password"
                label="Password"
                placeholder="Enter your password "
                required
              />

              <CheckboxGroupField
                name="permissions"
                label="Permissions"
                options={permessionOptions}
                required
              />

              <div>
                <Button
                  type="submit"
                  disabled={isLoading.create}
                  className="w-full mt-2.5"
                >
                  Add New Manager
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </TableHeader>
  );
}

export default AddManager;
