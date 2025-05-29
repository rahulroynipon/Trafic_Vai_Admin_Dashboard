import { create } from "zustand";
import updateState from "./../lib/updateState";
import apiInstance from "./../lib/apiInstance";
import { toast } from "sonner";

const initialState = {
  get: false,
};

const useServiceStore = create((set) => ({
  services: [],
  isLoading: { ...initialState },
  isSuccess: { ...initialState },
  isError: { ...initialState },

  getServicesHandler: async () => {
    updateState(set, "get", { loading: true, error: false, success: false });
    try {
      const res = await apiInstance.get("/service");
      if (res.status === 200) {
        set({ services: res.data?.payload });
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
}));

export default useServiceStore;
