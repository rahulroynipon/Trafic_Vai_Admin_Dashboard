import { FiMenu } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import useMobile from "../../lib/useMobile";
import emoji from "../../assets/emoji.svg";
import useAuthStore from "../../store/authStore";
import avatarPlaceholder from "../../assets/avatar-placeholder.png";

function AppHeader({ toggleFn }) {
  const isMobile = useMobile();
  const { user } = useAuthStore();

  return (
    <div className="text-primary-content w-full flex items-center justify-between space-x-2">
      {isMobile ? (
        <buttom onClick={toggleFn} className="text-2xl cursor-pointer">
          <FiMenu />
        </buttom>
      ) : (
        <div>
          <h1 className="flex items-center text-lg font-semibold space-x-2">
            <span> Welcome Back {user?.fullname} </span>
            <span>
              <img src={emoji} alt="avatar-emoji" className="h-7" />
            </span>
          </h1>
          <p className="text-sm text-primary-content/80">
            Please validate your action to proceed and unlock your reward
          </p>
        </div>
      )}

      <div className="flex space-x-3">
        <button
          className="size-8 cursor-pointer rounded-full bg-base-100 text-primary
        text-xl flex items-center justify-center"
        >
          <IoMdNotifications />
        </button>
        <div className="size-8 rounded-full ring-2 ring-content-400/70 overflow-hidden bg-base-100">
          <img
            src={user?.avatar?.url || avatarPlaceholder}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
