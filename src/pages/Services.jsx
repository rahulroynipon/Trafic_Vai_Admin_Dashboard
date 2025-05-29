import { useEffect } from "react";
import ServiceList from "../components/Services/ServiceList";
import useServiceStore from "../store/serviceStore";

function Services() {
  const { services, getServicesHandler } = useServiceStore();

  useEffect(() => {
    if (services.length) return;
    getServicesHandler();
  }, []);

  return (
    <>
      <ServiceList />
    </>
  );
}

export default Services;
