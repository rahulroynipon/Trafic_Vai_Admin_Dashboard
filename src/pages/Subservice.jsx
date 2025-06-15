import { useParams } from "react-router";
import SubserviceList from "../components/Services/SubserviceList";
import useServiceStore from "../store/serviceStore";
import { useEffect } from "react";
import Button from "../components/ui/Button";
import { FiPlus } from "react-icons/fi";
import useAuthStore from "../store/authStore";
import { permessions } from "../data/Permissions";
import { TableHeader } from "../components/ui/Table";
import Skeleton from "../components/ui/Skeleton";
import CreateSubservice from "../components/Services/CreateSubservice";

function Subservice() {
  const { id } = useParams();

  const { hasPermission } = useAuthStore();
  const { getSubServicesHandler, subservices, isLoading } = useServiceStore();

  useEffect(() => {
    getSubServicesHandler(id);
  }, [id]);

  return (
    <>
      {isLoading.getSub ? (
        <div className="p-2 w-full flex flex-wrap items-center justify-between gap-3">
          <Skeleton className="h-8 max-w-96" />
          {hasPermission(permessions.subservice) ? (
            <Skeleton className="h-8" />
          ) : null}
        </div>
      ) : (
        <div className="p-2 w-full flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold text-content-200">
            <span>{subservices?.service?.name}</span> Service{" "}
            <span>({subservices?.subservices?.length})</span>
          </h1>

          {hasPermission(permessions.subservice) ? <CreateSubservice /> : null}
        </div>
      )}

      <SubserviceList />
    </>
  );
}

export default Subservice;
