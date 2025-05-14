import useManagerStore from "../../store/managerStore";
import Button from "../ui/Button";
import { FaUserPen } from "react-icons/fa6";

function ManagerInfoSection() {
  const { profile, isLoading } = useManagerStore();

  return (
    <div className="p-5 bg-base-100 shadow-sm">
      <div className="flex gap-4 items-center justify-between mb-4">
        {isLoading.profileGet ? (
          <div className="h-8 max-w-48 w-full bg-content-400/30 rounded animate-pulse"></div>
        ) : (
          <h1 className="text-xl font-semibold text-content-200">
            Basic Information
          </h1>
        )}
        {isLoading.profileGet ? (
          <div className="size-8 rounded-full bg-content-400/30 animate-pulse" />
        ) : (
          <Button variant="icon" className="size-10">
            <FaUserPen className="text-2xl" />
          </Button>
        )}
      </div>

      <div className="px-4">
        <div>
          {isLoading.profileGet ? (
            <ul className="space-y-2.5">
              {[...Array(5)].map((_, index) => (
                <li key={index} className="flex gap-2 flex-wrap items-center">
                  <div className="w-24 h-4 bg-content-400/30 rounded animate-pulse" />
                  <div className="max-w-48 w-full h-4 bg-content-400/30 rounded animate-pulse" />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-2.5 text-sm">
              <li className="flex gap-2 flex-wrap">
                <span className="font-medium text-content-200">
                  Manager ID:
                </span>
                <span className="break-all text-content-300">
                  {profile?._id}
                </span>
              </li>
              <li className="flex gap-2 flex-wrap">
                <span className="font-medium text-content-200">Fullname:</span>
                <span className="text-content-300">{profile?.fullname}</span>
              </li>
              <li className="flex gap-2 flex-wrap">
                <span className="font-medium text-content-200">Email:</span>
                <span className="break-all text-content-300">
                  {profile?.email}
                </span>
              </li>
              <li className="flex gap-2 flex-wrap">
                <span className="font-medium text-content-200">Role:</span>
                <span className="text-content-300 capitalize">
                  {profile?.role}
                </span>
              </li>
              <li className="flex gap-2 flex-wrap">
                <span className="font-medium text-content-200">Password:</span>
                <span className="italic  text-content-300">
                  {profile?.__row__password}
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagerInfoSection;
