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

const CACHE_KEY_ALL = "__all__managers__";

const useManagerStore = create((set, get) => ({
  managersCache: {},
  paginationCache: {},
  activeManagers: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
  searchQuery: "",

  isLoading: { ...initialState },
  isSuccess: { ...initialState },
  isError: { ...initialState },

  createManagerHandler: async (data) => {
    updateState(set, "create", { loading: true, error: false, success: false });
    try {
      const res = await apiInstance.post("/user/manager", data);
      if (res.status === 201) {
        set((state) => ({
          // Clear caches to force refetch, because new manager added
          managersCache: {},
          paginationCache: {},
          activeManagers: [res.data.payload, ...state.activeManagers],
          isLoading: { ...state.isLoading, create: false },
          isSuccess: { ...state.isSuccess, create: true },
          isError: { ...state.isError, create: false },
        }));
        toast.success(res.data.message || "Manager created successfully");
      } else {
        throw new Error("Unexpected server response");
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

  getManagersHandler: async ({ page = 1, limit = 10, search = "" } = {}) => {
    const cacheKey = search.trim().toLowerCase() || CACHE_KEY_ALL;
    const managersCache = get().managersCache;
    const paginationCache = get().paginationCache;

    const cachedManagers = managersCache?.[cacheKey]?.[page] || null;
    const cachedPagination = paginationCache?.[cacheKey]?.[page] || null;

    if (cachedManagers && cachedPagination) {
      set({
        activeManagers: cachedManagers,
        pagination: cachedPagination,
        searchQuery: search,
      });
      updateState(set, "get", { loading: false, error: false, success: true });
      return;
    }

    updateState(set, "get", { loading: true, error: false, success: false });

    try {
      const res = await apiInstance.get(
        `/user/manager?limit=${limit}&page=${page}&search=${encodeURIComponent(
          search
        )}`
      );

      if (res.status === 200) {
        const payload = res.data.payload || [];
        const pagination = res.data.pagination || {
          total: 0,
          page,
          limit,
          totalPages: 1,
        };

        set((state) => ({
          managersCache: {
            ...state.managersCache,
            [cacheKey]: {
              ...(state.managersCache[cacheKey] || {}),
              [page]: payload,
            },
          },
          paginationCache: {
            ...state.paginationCache,
            [cacheKey]: {
              ...(state.paginationCache[cacheKey] || {}),
              [page]: pagination,
            },
          },
          activeManagers: payload,
          pagination,
          searchQuery: search,
        }));

        updateState(set, "get", {
          loading: false,
          error: false,
          success: true,
        });
      } else {
        throw new Error("Unexpected server response");
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
        set((state) => {
          // Remove deleted manager from all cache pages and activeManagers
          const newManagersCache = {};
          for (const [searchKey, pages] of Object.entries(
            state.managersCache
          )) {
            newManagersCache[searchKey] = {};
            for (const [pageNum, managers] of Object.entries(pages)) {
              newManagersCache[searchKey][pageNum] = managers.filter(
                (manager) => manager._id !== id
              );
            }
          }

          return {
            managersCache: newManagersCache,
            activeManagers: state.activeManagers.filter((m) => m._id !== id),
          };
        });

        updateState(set, "delete", {
          loading: false,
          error: false,
          success: true,
        });
        toast.success(res.data.message || "Manager deleted successfully");
      } else {
        throw new Error("Unexpected server response");
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
        set({ profile: res.data.payload });
        updateState(set, "profileGet", {
          loading: false,
          error: false,
          success: true,
        });
      } else {
        throw new Error("Unexpected server response");
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
    updateState(set, update, { loading: true, error: false, success: false });

    try {
      const res = await apiInstance.patch(
        `/user/manager/${id}?update=${update}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const updatedProfile = res?.data?.payload;

      if (res.status === 200 && updatedProfile) {
        set({ profile: updatedProfile });

        if (update === "info") {
          set((state) => ({
            managersCache: Object.fromEntries(
              Object.entries(state.managersCache).map(([searchKey, pages]) => [
                searchKey,
                Object.fromEntries(
                  Object.entries(pages).map(([pageNum, managers]) => [
                    pageNum,
                    managers.map((m) => (m._id === id ? updatedProfile : m)),
                  ])
                ),
              ])
            ),
            activeManagers: state.activeManagers.map((m) =>
              m._id === id ? updatedProfile : m
            ),
          }));
        }

        updateState(set, update, {
          loading: false,
          error: false,
          success: true,
        });
        toast.success(res.data.message || "Manager updated successfully");
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error) {
      updateState(set, update, { loading: false, error: true, success: false });
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    }
  },
}));

export default useManagerStore;
