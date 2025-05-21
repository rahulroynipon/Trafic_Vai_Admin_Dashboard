import AddManager from "../components/Manager/AddManager";
import ManagerTable from "../components/Manager/ManagerTable";
import { useEffect } from "react";
import useManagerStore from "../store/managerStore";

function Manager() {
  const {
    getManagersHandler,
    activeManagers: managers,
    pagination,
  } = useManagerStore();

  useEffect(() => {
    if (managers.length) return;
    getManagersHandler({ page: 1, limit: pagination.limit });
  }, []);

  return (
    <>
      <AddManager />
      <ManagerTable />
    </>
  );
}

export default Manager;
