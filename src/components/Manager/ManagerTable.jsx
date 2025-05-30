import { useEffect, useState } from "react";
import useManagerStore from "../../store/managerStore";
import { Table } from "../ui/Table";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { Link } from "react-router";

function ManagerTable() {
  const {
    getManagersHandler,
    deleteManagerHandler,
    activeManagers: managers,
    pagination,
    isSuccess,
    isLoading,
  } = useManagerStore();

  const [isOpen, setIsOpen] = useState({ state: false, selectedData: null });

  const onOpen = (data) => {
    setIsOpen({ state: true, selectedData: data });
  };

  const onClose = () => {
    setIsOpen({ state: false, selectedData: null });
  };

  useEffect(() => {
    if (isSuccess.delete) {
      onClose();
    }
  }, [isSuccess]);

  const onPageChange = (newPage) => {
    if (
      newPage !== pagination.page &&
      newPage >= 1 &&
      newPage <= pagination.totalPages
    ) {
      getManagersHandler({ page: newPage, limit: pagination.limit });
    }
  };

  const renderRow = (manager) => {
    return (
      <tr
        className="text-sm border-b border-content-400/15 text-content-300"
        key={manager._id}
      >
        <td className="p-4 text-nowrap">{manager._id}</td>
        <td className="p-4 text-nowrap">{manager.fullname}</td>
        <td className="p-4 text-nowrap">{manager.email}</td>
        <td className="p-4 text-nowrap flex space-x-1">
          <Link to={`/manager/${manager._id}`}>
            <Button
              type="button"
              variant="icon"
              className="text-lg text-primary"
            >
              <FaEye />
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
        headers={["Manager ID", "Name", "Email", "Action"]}
        data={managers}
        isLoading={isLoading.get}
        renderRow={renderRow}
        pagination={pagination}
        onPageChange={onPageChange}
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
            isLoading={isLoading.delete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ManagerTable;
