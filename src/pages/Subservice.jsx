import { useParams } from "react-router";
import SubserviceList from "../components/Services/SubserviceList";
import useServiceStore from "../store/serviceStore";
import { useEffect } from "react";

function Subservice() {
  const { slug } = useParams();

  const { getSubServicesHandler } = useServiceStore();

  useEffect(() => {
    getSubServicesHandler(slug);
  }, [slug]);

  return (
    <div>
      <SubserviceList />
    </div>
  );
}

export default Subservice;
