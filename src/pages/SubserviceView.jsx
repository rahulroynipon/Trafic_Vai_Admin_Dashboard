import { useEffect } from "react";
import SubserviceDescription from "../components/Services/SubserviceDescription";
import SubserviceIconSection from "../components/Services/SubserviceIconSection";
import SubservicePlanSection from "../components/Services/SubservicePlanSection";
import useServiceStore from "../store/serviceStore";
import { useParams } from "react-router";
import NotFoundComponent from "../components/ui/NotFoundComponent";

function SubserviceView() {
  const { id: serviceId, subId: id } = useParams();
  const { getSingleSubServiceHandler, isError } = useServiceStore();

  useEffect(() => {
    getSingleSubServiceHandler(serviceId, id);
  }, [serviceId, id]);

  return isError.singleSub ? (
    <NotFoundComponent title="Subservice Not Found" />
  ) : (
    <>
      <SubserviceIconSection />
      <SubserviceDescription />
      <SubservicePlanSection />
    </>
  );
}

export default SubserviceView;
