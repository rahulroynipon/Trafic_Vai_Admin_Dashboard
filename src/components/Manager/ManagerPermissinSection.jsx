import useManagerStore from "../../store/managerStore";
import Skeleton from "../ui/Skeleton";

function ManagerPermissinSection() {
  const { profile, isLoading } = useManagerStore();

  return (
    <div className="p-5 bg-base-100 shadow-sm">
      {isLoading.profileGet ? (
        <Skeleton className="h-8 max-w-48" />
      ) : (
        <h1 className="text-xl font-semibold text-content-200">Permissions</h1>
      )}

      <div className="px-4 mt-4">
        <div>
          {isLoading.profileGet ? (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {[...Array(6)].map((_, index) => (
                <li key={index} className="flex gap-2 flex-wrap items-center">
                  <Skeleton />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid md:grid-cols-2 gap-x-4 space-y-2.5  text-sm">
              {profile?.permissions?.map((permission, index) => (
                <li key={index} className="flex items-center  gap-2 flex-wrap">
                  <span className="font-medium text-content-200">
                    <input
                      type="radio"
                      checked
                      className="size-3 relative top-[1.5px]"
                    />
                  </span>
                  <span className="text-content-300 capitalize">
                    {permission}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagerPermissinSection;
