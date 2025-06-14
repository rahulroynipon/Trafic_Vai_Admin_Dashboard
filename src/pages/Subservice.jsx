import { useParams, Link } from "react-router";
import SubserviceList from "../components/Services/SubserviceList";
import useServiceStore from "../store/serviceStore";
import { useEffect } from "react";
import Button from "../components/ui/Button";
import { FiPlus } from "react-icons/fi";
import useAuthStore from "../store/authStore";
import { permessions } from "../data/Permissions";
import { TableHeader } from "../components/ui/Table";

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
      <TableHeader
        bgColor="bg-base-200 shadow-none p-2 sticky top-0 z-10"
        title={`${slugToSentence(slug)} Service (${subservices.length})`}
        children={
          hasPermission(permessions.subservice) ? (
            <div>
              <Link to={`/services/${slug}/create`}>
                <Button className="flex items-center space-x-1.5">
                  <FiPlus />
                  <span>Add Sub-Service</span>
                </Button>
              </Link>
            </div>
          ) : null
        }
      />

      <SubserviceList />
    </>
  );
}

export default Subservice;
