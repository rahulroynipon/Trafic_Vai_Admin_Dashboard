import { useEffect } from "react";
import useManagerStore from "../../store/managerStore";
import { Table } from "../ui/Table";

function ManagerTable() {
  const { getManagersHandler, managers, isSuccess, isLoading, isError } =
    useManagerStore();

  useEffect(() => {
    getManagersHandler();
  }, []);

  const renderRow = (manager, index) => (
    <tr className="text-sm border-b text-content-300" key={manager._id}>
      <td className="p-4 text-nowrap">{manager._id}</td>
      <td className="p-4 text-nowrap">{manager.fullname}</td>
      <td className="p-4 text-nowrap">{manager.email}</td>
      <td className="p-4 text-nowrap">{manager.__row__password}</td>
    </tr>
  );

  return (
    <div>
      <Table
        headers={["Manager ID", "Name", "Email", "Password", "Action"]}
        data={managers}
        isLoading={isLoading.get}
        renderRow={renderRow}
      />
    </div>
  );
}

export default ManagerTable;
