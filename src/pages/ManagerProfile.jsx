import { useParams } from "react-router";
import useManagerStore from "../store/managerStore";
import { useEffect } from "react";
import ManagerAvatarSection from "../components/Manager/ManagerAvatarSection";
import ManagerInfoSection from "../components/Manager/ManagerInfoSection";
import ManagerPermissinSection from "../components/Manager/ManagerPermissinSection";
import Button from "../components/ui/Button";

function ManagerProfile() {
  const { id } = useParams();

  const { getManagerProfileHandler } = useManagerStore();

  useEffect(() => {
    if (id) {
      getManagerProfileHandler(id);
    }
  }, [id]);

  return (
    <div className="space-y-4">
      <ManagerAvatarSection />
      <ManagerInfoSection />
      <ManagerPermissinSection />
    </div>
  );
}

export default ManagerProfile;
