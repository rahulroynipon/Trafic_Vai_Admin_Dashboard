import { useParams } from "react-router";
import SubserviceList from "../components/Services/SubserviceList";
import useServiceStore from "../store/serviceStore";
import { useEffect } from "react";
import Button from "../components/ui/Button";
import { FiPlus } from "react-icons/fi";
import useAuthStore from "../store/authStore";
import { permessions } from "../data/Permissions";

function Subservice() {
  const { slug } = useParams();

  const { hasPermission } = useAuthStore();
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
        <div className="flex gap-4 justify-between items-center">
          <h1 className="text-2xl font-semibold text-content-200 capitalize">
            {slugToSentence(slug)} Service ({subservices.length})
          </h1>

          {hasPermission(permessions.subservice) ? (
            <div>
              <Button className="flex items-center space-x-1.5">
                <FiPlus />
                <span>Add Sub-Service</span>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <SubserviceList />
    </>
  );
}

export default Subservice;
