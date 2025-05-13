import { useState } from "react";
import Button from "../ui/Button";
import { TableHeader } from "../ui/Table";
import { FiPlus } from "react-icons/fi";
import Modal from "../ui/Modal";

function AddManager() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <TableHeader title="Manager">
      <Button onClick={onOpen} className="flex items-center space-x-1.5">
        <FiPlus />
        <span>Add</span>
      </Button>
      <Modal title="Add Manager" isOpen={isOpen} onClose={onClose}></Modal>
    </TableHeader>
  );
}

export default AddManager;
