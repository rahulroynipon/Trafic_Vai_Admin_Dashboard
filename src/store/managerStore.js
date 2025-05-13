import { create } from "zustand";
import updateState from "./../lib/updateState";
import apiInstance from "./../lib/apiInstance";
import { toast } from "sonner";

const initialState = {
  create: false,
  get: false,
  update: false,
  delete: false,
};

const useManagerStore = create((set) => ({
  managers: [],
  isLoading: { ...initialState },
  isSuccess: { ...initialState },
  isError: { ...initialState },
  createManagerHandler: async (data) => {
    updateState(set, "create", { loading: true, error: false, success: false });
    try {
      const res = await apiInstance.post("/user/manager", data);
      if (res.status === 201) {
        set((state) => ({
          managers: [res.data?.payload, ...state.managers],
        }));
        updateState(set, "create", {
          loading: false,
          error: false,
          success: true,
        });
        toast.success(res?.data?.message || "Manager created successfully");
      }
    } catch (error) {
      updateState(set, "create", {
        loading: false,
        error: true,
        success: false,
      });

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },
  getManagersHandler: async () => {
    updateState(set, "get", { loading: true, error: false, success: false });
    try {
      const res = await apiInstance.get("/user/manager");
      if (res.status === 200) {
        set({ managers: res.data?.payload });
        updateState(set, "get", {
          loading: false,
          error: false,
          success: true,
        });
      }
    } catch (error) {
      updateState(set, "get", { loading: false, error: true, success: false });
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },
  deleteManagerHandler: async (id) => {
    updateState(set, "delete", { loading: true, error: false, success: false });
    try {
      const res = await apiInstance.delete(`/user/manager/${id}`);
      if (res.status === 200) {
        set((state) => ({
          managers: state.managers.filter((manager) => manager?._id !== id),
        }));
        updateState(set, "delete", {
          loading: false,
          error: false,
          success: true,
        });
        toast.success(res?.data?.message || "Manager deleted successfully");
      }
    } catch (error) {
      updateState(set, "delete", {
        loading: false,
        error: true,
        success: false,
      });
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },
}));
export default useManagerStore;
