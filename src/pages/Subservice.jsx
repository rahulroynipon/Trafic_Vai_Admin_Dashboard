import { useParams } from "react-router";
import SubserviceList from "../components/Services/SubserviceList";
import useServiceStore from "../store/serviceStore";
import { useEffect } from "react";

function Subservice() {
  const { slug } = useParams();

  const { getSubServicesHandler, subservices } = useServiceStore();

  useEffect(() => {
    getSubServicesHandler(slug);
  }, [slug]);

  const slugToSentence = (slug) => {
    const sentence = slug.replace(/-/g, " ");
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };

  return (
    <>
      <div className="pb-4 z-10 bg-base-200 sticky top-0">
        <h1 className="text-2xl font-semibold text-content-200 capitalize">
          {slugToSentence(slug)} Service ({subservices.length})
        </h1>
      </div>
      <SubserviceList />
    </>
  );
}

export default Subservice;
