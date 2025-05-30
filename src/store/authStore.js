import { create } from "zustand";
import updateState from "./../lib/updateState";
import apiInstance from "./../lib/apiInstance";
import { toast } from "sonner";

const initialState = {
  get: false,
  logout: false,
};

const useAuthStore = create((set, get) => ({
  user: {},
  isLoading: { ...initialState },
  isSuccess: { ...initialState },
  isError: { ...initialState },

  hasPermission: (permission) => {
    const user = get().user;
    if (!user) return false;
    const { role, permissions = [] } = user;
    if (role === "admin") return true;
    if (role === "manager" && permissions.includes(permission)) return true;
    return false;
  },

  getUserHandler: async () => {
    updateState(set, "get", { loading: true, error: false, success: false });
    try {
      const res = await apiInstance.get("/auth/me");
      if (res.status === 200) {
        set({ user: res.data?.payload });
        updateState(set, "get", {
          loading: false,
          error: false,
          success: true,
        });
      }
    } catch (error) {
      updateState(set, "get", {
        loading: false,
        error: true,
        success: false,
      });
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },
  logoutHandler: () => {
    updateState(set, "logout", { loading: true, error: false, success: false });
    localStorage.removeItem("token");
    set({ user: {} });
    updateState(set, "logout", { loading: false, error: false, success: true });
  },
}));

export default useAuthStore;
