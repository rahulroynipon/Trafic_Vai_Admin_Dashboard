import AddManager from "../components/Manager/AddManager";
import ManagerTable from "../components/Manager/ManagerTable";
import { TablePagination } from "../components/ui/Table";

function Manager() {
  return (
    <>
      <AddManager />
      <ManagerTable />
      <TablePagination />
    </>
  );
}

export default Manager;
