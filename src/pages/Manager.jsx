import AddManager from "../components/Manager/AddManager";
import { Table, TableHeader } from "../components/ui/Table";

function Manager() {
  return (
    <>
      <AddManager />
      <Table headers={["Manager ID", "Name", "Email", "Password", "Action"]} />
    </>
  );
}

export default Manager;
