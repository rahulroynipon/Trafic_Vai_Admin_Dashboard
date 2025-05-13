import { useEffect, useState } from "react";
import useManagerStore from "../../store/managerStore";
import { Table } from "../ui/Table";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { Link } from "react-router";

function ManagerTable() {
  const {
    getManagersHandler,
    deleteManagerHandler,
    managers,
    isSuccess,
    isLoading,
    isError,
  } = useManagerStore();
  const [showPasswords, setShowPasswords] = useState({});
  const [isOpen, setIsOpen] = useState({ state: false, selectedData: null });

  const onOpen = (data) => {
    setIsOpen({ state: true, selectedData: data });
  };

  const onClose = () => {
    setIsOpen({ state: false, selectedData: null });
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    getManagersHandler();
  }, []);

  useEffect(() => {
    if (isSuccess.delete) {
      onClose();
    }
  }, [isSuccess]);

  const renderRow = (manager) => {
    const isShow = showPasswords[manager._id];

    return (
      <tr
        className="text-sm border-b border-content-400/15 text-content-300"
        key={manager._id}
      >
        <td className="p-4 text-nowrap">{manager._id}</td>
        <td className="p-4 text-nowrap">{manager.fullname}</td>
        <td className="p-4 text-nowrap">{manager.email}</td>
        <td className="p-4 text-nowrap">
          {isShow ? manager.__row__password : "••••••••"}
        </td>
        <td className="p-4 text-nowrap flex space-x-1">
          <Button
            type="button"
            variant="icon"
            onClick={() => togglePasswordVisibility(manager._id)}
          >
            {isShow ? <FaLockOpen /> : <FaLock />}
          </Button>

          <Link to={`/manager/${manager._id}`}>
            <Button
              type="button"
              variant="icon"
              className="text-lg text-primary"
            >
              <MdEdit />
            </Button>
          </Link>

          <Button
            type="button"
            variant="icon"
            onClick={() => onOpen(manager)}
            className="text-red-500 focus-visible:ring-red-300 hover:bg-red-100 text-lg"
          >
            <MdDelete />
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <>
      <Table
        headers={["Manager ID", "Name", "Email", "Password", "Action"]}
        data={managers}
        isLoading={isLoading.get}
        renderRow={renderRow}
      />
      <Modal title="Delete Manager" isOpen={isOpen.state} onClose={onClose}>
        <div className="text-center my-9">
          <h3 className="text-lg font-semibold text-content-200 break-all">
            {isOpen.selectedData?.fullname}
          </h3>

          <p className="text-sm text-content-400">
            Are you sure you want to delete this manager?
          </p>
        </div>

        <div className="flex justify-center space-x-2.5 w-full">
          <Button onClick={onClose} type="button" variant="outline">
            Cancel
          </Button>

          <Button
            type="button"
            onClick={() => deleteManagerHandler(isOpen.selectedData._id)}
            disabled={isLoading.delete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ManagerTable;
