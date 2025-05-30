import { useParams } from "react-router";
import useManagerStore from "../store/managerStore";
import { useEffect } from "react";
import ManagerAvatarSection from "../components/Manager/ManagerAvatarSection";
import ManagerInfoSection from "../components/Manager/ManagerInfoSection";
import ManagerPermissinSection from "../components/Manager/ManagerPermissinSection";
import NotFoundComponent from "../components/ui/NotFoundComponent";

function ManagerProfile() {
  const { id } = useParams();

  const { getManagerProfileHandler, isError } = useManagerStore();

  useEffect(() => {
    if (id) {
      getManagerProfileHandler(id);
    }
  }, [id]);

  return isError.profileGet ? (
    <NotFoundComponent title="Manager Not Found" />
  ) : (
    <div className="space-y-4">
      <ManagerAvatarSection />
      <ManagerInfoSection />
      <ManagerPermissinSection />
    </div>
  );
}

export default ManagerProfile;
