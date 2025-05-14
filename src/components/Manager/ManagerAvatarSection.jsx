import useManagerStore from "../../store/managerStore";
import avatarPlaceholder from "../../assets/avatar-placeholder.jpg";
import Button from "../ui/Button";

function ManagerAvatarSection() {
  const { profile, isLoading } = useManagerStore();

  return (
    <div className="p-5 bg-base-100 shadow-sm flex flex-wrap items-center justify-between space-x-4 gap-4">
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="size-14 md:size-18 rounded-full overflow-hidden bg-gray-200">
          {isLoading.profileGet ? (
            <div className="w-full h-full animate-pulse bg-content-400/30" />
          ) : (
            <img
              src={profile?.avatar?.url || avatarPlaceholder}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Name & Email */}
        <div className="flex flex-col">
          {isLoading.profileGet ? (
            <>
              <div className="w-32 h-4 md:h-5 bg-content-400/30 rounded animate-pulse mb-1" />
              <div className="w-24 h-3 md:h-4 bg-content-400/30 rounded animate-pulse" />
            </>
          ) : (
            <>
              <h2 className="md:text-lg font-semibold text-content-200 break-all">
                {profile?.fullname}
              </h2>
              <p className="text-xs md:text-sm text-content-400">
                {profile?.email}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Button */}
      <div>
        {isLoading.profileGet ? (
          <div className="w-28 h-8 bg-content-400/30 rounded animate-pulse" />
        ) : (
          <Button className="text-nowrap">Update Avatar</Button>
        )}
      </div>
    </div>
  );
}

export default ManagerAvatarSection;
