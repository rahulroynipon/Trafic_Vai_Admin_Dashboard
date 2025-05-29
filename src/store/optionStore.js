import { create } from "zustand";

import updateState from "./../lib/updateState";
import apiInstance from "./../lib/apiInstance";
import { toast } from "sonner";

const initialState = {
  service: false,
};

const useOptionStore = create((set) => ({
  services: [],
  isLoading: { ...initialState },
  isSuccess: { ...initialState },
  isError: { ...initialState },

  getServicesHandler: async () => {
    updateState(set, "service", {
      loading: true,
      error: false,
      success: false,
    });
    try {
      const res = await apiInstance.get("/service/options");
      if (res.status === 200) {
        set({ services: res.data?.payload });
        updateState(set, "service", {
          loading: false,
          error: false,
          success: true,
        });
      }
    } catch (error) {
      updateState(set, "service", {
        loading: false,
        error: true,
        success: false,
      });
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },
}));

export default useOptionStore;
