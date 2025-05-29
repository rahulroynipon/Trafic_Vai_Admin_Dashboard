import { useEffect } from "react";
import CreateBlog from "../components/Blog/CreateBlog";
import useOptionStore from "../store/optionStore";

function AddBlog() {
  const { getServicesHandler, services } = useOptionStore();

  useEffect(() => {
    if (services.length) return;
    getServicesHandler();
  }, []);

  return <CreateBlog />;
}

export default AddBlog;
