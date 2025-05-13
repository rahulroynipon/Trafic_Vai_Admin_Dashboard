import { create } from "zustand";
import updateState from "./../lib/updateState";

const initialState = {
  user: false,
  logout: false,
};

const useAuthStore = create((set) => ({
  user: {},
  isLoading: { ...initialState },
  isSuccess: { ...initialState },
  isError: { ...initialState },

  setUser: (user) => set({ user }),
  logoutHandler: () => {
    updateState(set, "logout", { loading: true, error: false, success: false });
    localStorage.removeItem("token");
    set({ user: {} });
    updateState(set, "logout", { loading: false, error: false, success: true });
  },
}));

export default useAuthStore;
