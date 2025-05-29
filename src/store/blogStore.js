import { create } from "zustand";
import updateState from "./../lib/updateState";
import apiInstance from "./../lib/apiInstance";
import { toast } from "sonner";

const initialState = {
  create: false,
  get: false,
  delete: false,
  update: false,
  getSingle: false,
};

const CACHE_KEY_ALL = "__all__blogs__";

const useBlogStore = create((set, get) => ({
  blogsCache: {},
  paginationCache: {},
  activeBlogs: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
  searchQuery: "",
  blog: {},

  isLoading: { ...initialState },
  isSuccess: { ...initialState },
  isError: { ...initialState },

  createBlogHandler: async (data) => {
    updateState(set, "create", { loading: true, error: false, success: false });

    try {
      const res = await apiInstance.post("/blog", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        const newBlog = res.data.payload;

        set((state) => {
          const cacheKey =
            state.searchQuery.trim().toLowerCase() || "__all__blogs__";
          const page = state.pagination.page;

          const isFromCache =
            !!state.blogsCache?.[cacheKey]?.[page] &&
            !!state.paginationCache?.[cacheKey]?.[page];

          const exists = state.activeBlogs.some(
            (blog) => blog._id === newBlog._id
          );

          return isFromCache && !exists
            ? {
                activeBlogs: [newBlog, ...state.activeBlogs],
              }
            : {};
        });

        updateState(set, "create", {
          loading: false,
          error: false,
          success: true,
        });

        toast.success(res.data.message || "Blog created successfully");
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

  getBlogsHandler: async ({ page = 1, limit = 10, search = "" } = {}) => {
    const cacheKey = search.trim().toLowerCase() || CACHE_KEY_ALL;
    const blogsCache = get().blogsCache;
    const paginationCache = get().paginationCache;

    const cachedBlogs = blogsCache?.[cacheKey]?.[page] || null;
    const cachedPagination = paginationCache?.[cacheKey]?.[page] || null;

    if (cachedBlogs && cachedPagination) {
      set({
        activeBlogs: cachedBlogs,
        pagination: cachedPagination,
        searchQuery: search,
      });
      updateState(set, "get", { loading: false, error: false, success: true });
      return;
    }

    updateState(set, "get", { loading: true, error: false, success: false });

    try {
      const res = await apiInstance.get(
        `/blog?limit=${limit}&page=${page}&search=${encodeURIComponent(search)}`
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
          blogsCache: {
            ...state.blogsCache,
            [cacheKey]: {
              ...(state.blogsCache[cacheKey] || {}),
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
          activeBlogs: payload,
          pagination,
          searchQuery: search,
        }));

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

  deleteBlogHandler: async (id) => {
    updateState(set, "delete", { loading: true, error: false, success: false });
    try {
      const res = await apiInstance.delete(`/blog/${id}`);
      if (res.status === 200) {
        set((state) => {
          const newBlogsCache = {};
          for (const [searchKey, pages] of Object.entries(state.blogsCache)) {
            newBlogsCache[searchKey] = {};
            for (const [pageNum, blogs] of Object.entries(pages)) {
              newBlogsCache[searchKey][pageNum] = blogs.filter(
                (blog) => blog._id !== id
              );
            }
          }

          return {
            blogsCache: newBlogsCache,
            activeBlogs: state.activeBlogs.filter((b) => b._id !== id),
          };
        });

        updateState(set, "delete", {
          loading: false,
          error: false,
          success: true,
        });
        toast.success(res.data.message || "Blog deleted successfully");
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

  getBlogHandler: async (id) => {
    updateState(set, "getSingle", {
      loading: true,
      error: false,
      success: false,
    });
    try {
      const res = await apiInstance.get(`/blog/${id}`);
      if (res.status === 200) {
        set({ blog: res.data.payload });
        updateState(set, "getSingle", {
          loading: false,
          error: false,
          success: true,
        });
      }
    } catch (error) {
      updateState(set, "getSingle", {
        loading: false,
        error: true,
        success: false,
      });
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },

  updateBlogHandler: async (id, data) => {
    updateState(set, "update", { loading: true, error: false, success: false });
    try {
      const res = await apiInstance.patch(`/blog/${id}`, data);
      const updatedBlog = res?.data?.payload;

      if (res.status === 200 && updatedBlog) {
        set((state) => ({
          blog: updatedBlog,
          blogsCache: Object.fromEntries(
            Object.entries(state.blogsCache).map(([searchKey, pages]) => [
              searchKey,
              Object.fromEntries(
                Object.entries(pages).map(([pageNum, blogs]) => [
                  pageNum,
                  blogs.map((b) => (b._id === id ? updatedBlog : b)),
                ])
              ),
            ])
          ),
          activeBlogs: state.activeBlogs.map((b) =>
            b._id === id ? updatedBlog : b
          ),
        }));

        updateState(set, "update", {
          loading: false,
          error: false,
          success: true,
        });
        toast.success(res.data.message || "Blog updated successfully");
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error) {
      updateState(set, "update", {
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

export default useBlogStore;
