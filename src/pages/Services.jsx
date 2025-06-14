import { useEffect } from "react";
import ServiceList from "../components/Services/ServiceList";
import useServiceStore from "../store/serviceStore";
import { TableHeader } from "../components/ui/Table";

function Services() {
  const { services, getServicesHandler } = useServiceStore();

  useEffect(() => {
    if (services.length) return;
    getServicesHandler();
  }, []);

  return (
    <>
      {/* <div className="pb-4 z-10 bg-base-200 sticky top-0">
        <h1 className="text-2xl font-semibold text-content-200">
          Service List
        </h1>
      </div> */}

      <TableHeader
        bgColor="bg-base-200 shadow-none p-2 sticky top-0 z-10"
        title="Service List"
      />
      <ServiceList />
    </>
  );
}

export default Services;
