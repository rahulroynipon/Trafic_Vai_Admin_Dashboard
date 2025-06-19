import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import useServiceStore from "../../store/serviceStore";

function SubserviceIconSection() {
  const { subservice, isSuccess } = useServiceStore();
  const { hasPermission } = useAuthStore();

  const initialValues = {
    icon: null,
  };

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleClose = () => {
    setIsEdit(false);
  };

  const handleSubmit = (values) => {
    console.log("Submitting icon update", values);
  };

  useEffect(() => {
    if (isSuccess.singleSub) handleClose();
  }, [isSuccess]);

  return <div className="p-5 bg-base-100 shadow-sm"></div>;
}

export default SubserviceIconSection;
