import { create } from "zustand";
import updateState from "./../lib/updateState";
import apiInstance from "./../lib/apiInstance";
import { toast } from "sonner";

const initialState = {
  create: false,
  get: false,
  delete: false,
  profileGet: false,

  avatar: false,
  info: false,
  permissions: false,
};

const useManagerStore = create((set, get) => ({
  managers: [],
  profile: {},
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

  getManagerProfileHandler: async (id) => {
    updateState(set, "profileGet", {
      loading: true,
      error: false,
      success: false,
    });
    try {
      const res = await apiInstance.get(`/user/manager/${id}`);
      if (res.status === 200) {
        set({ profile: res.data?.payload });
        updateState(set, "profileGet", {
          loading: false,
          error: false,
          success: true,
        });
      }
    } catch (error) {
      updateState(set, "profileGet", {
        loading: false,
        error: true,
        success: false,
      });
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },

  updateManagerProfileHandler: async (update, id, data) => {
    updateState(set, update, {
      loading: true,
      error: false,
      success: false,
    });

    try {
      const res = await apiInstance.patch(
        `/user/manager/${id}?update=${update}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedProfile = res?.data?.payload;

      if (res.status === 200 && updatedProfile) {
        set({ profile: updatedProfile });

        updateState(set, update, {
          loading: false,
          error: false,
          success: true,
        });

        if (update === "info") {
          const managers = get().managers || [];
          if (managers.length) {
            set((state) => ({
              managers: state.managers.map((m) =>
                m._id === id ? updatedProfile : m
              ),
            }));
          }
        }

        toast.success(res?.data?.message || "Manager updated successfully");
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error) {
      updateState(set, update, {
        loading: false,
        error: true,
        success: false,
      });

      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    }
  },
}));
export default useManagerStore;
