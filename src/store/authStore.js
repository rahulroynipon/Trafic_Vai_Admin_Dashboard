import { create } from "zustand";

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
  setLogout: (logout) => set({ logout }),
}));

export default useAuthStore;
