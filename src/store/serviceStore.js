import { create } from "zustand";
import updateState from "./../lib/updateState";
import apiInstance from "./../lib/apiInstance";
import { toast } from "sonner";

const initialState = {
  get: false,
  getSub: false,
  createSub: false,
};

const useServiceStore = create((set) => ({
  services: [],
  subservices: [],
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

  getSubServicesHandler: async (id) => {
    updateState(set, "getSub", { loading: true, error: false, success: false });
    try {
      const res = await apiInstance.get(`/service/${id}`);
      if (res.status === 200) {
        set({ subservices: res.data?.payload });
        updateState(set, "getSub", {
          loading: false,
          error: false,
          success: true,
        });
      }
    } catch (error) {
      updateState(set, "getSub", {
        loading: false,
        error: true,
        success: false,
      });
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },

  createSubServiceHandler: async (data) => {
    updateState(set, "createSub", {
      loading: true,
      error: false,
      success: false,
    });
    try {
      const res = await apiInstance.post("/service", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {
        updateState(set, "createSub", {
          loading: false,
          error: false,
          success: true,
        });
        set((state) => ({
          subservices: [...state.subservices, res.data.payload],
        }));
        toast.success(res.data.message || "Subservice created successfully");
      }
    } catch (error) {
      updateState(set, "createSub", {
        loading: false,
        error: true,
        success: false,
      });
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },
}));

export default useServiceStore;
