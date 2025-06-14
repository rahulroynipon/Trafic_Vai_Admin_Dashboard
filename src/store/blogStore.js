import { create } from "zustand";
import updateState from "./../lib/updateState";
import apiInstance from "./../lib/apiInstance";
import { toast } from "sonner";

const initialState = {
  create: false,
  get: false,
  delete: false,
  getSingle: false,
  thumbnail: false,
  details: false,
};

const CACHE_KEY_ALL = "__all__blogs__";

const useBlogStore = create((set, get) => ({
  blogsCache: {}, // { searchKey: { page: [blogs] } }
  paginationCache: {}, // { searchKey: { page: paginationObj } }
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

  // Helper to update caches and active blogs when adding a new blog
  _addBlogToCacheAndActive: (newBlog) => {
    const {
      searchQuery,
      pagination,
      blogsCache,
      paginationCache,
      activeBlogs,
    } = get();
    const cacheKey = searchQuery.trim().toLowerCase() || CACHE_KEY_ALL;
    const page = pagination.page;

    const isCachedPage =
      !!blogsCache?.[cacheKey]?.[page] && !!paginationCache?.[cacheKey]?.[page];

    const exists = activeBlogs.some((blog) => blog._id === newBlog._id);

    if (isCachedPage && !exists) {
      // Add new blog to the beginning of activeBlogs
      const updatedActiveBlogs = [newBlog, ...activeBlogs];

      // Also update the cache for the current page
      const updatedPageBlogs = [newBlog, ...(blogsCache[cacheKey][page] || [])];

      // Update pagination total count
      const updatedTotal = pagination.total + 1;
      const updatedTotalPages = Math.ceil(updatedTotal / pagination.limit);

      set((state) => ({
        activeBlogs: updatedActiveBlogs,
        blogsCache: {
          ...state.blogsCache,
          [cacheKey]: {
            ...state.blogsCache[cacheKey],
            [page]: updatedPageBlogs,
          },
        },
        paginationCache: {
          ...state.paginationCache,
          [cacheKey]: {
            ...state.paginationCache[cacheKey],
            [page]: {
              ...state.paginationCache[cacheKey][page],
              total: updatedTotal,
              totalPages: updatedTotalPages,
            },
          },
        },
        pagination: {
          ...pagination,
          total: updatedTotal,
          totalPages: updatedTotalPages,
        },
      }));
    }
  },

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
        get()._addBlogToCacheAndActive(newBlog);

        updateState(set, "create", {
          loading: false,
          error: false,
          success: true,
        });

        set({ blog: newBlog });

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
    const { blogsCache, paginationCache } = get();

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
        const {
          pagination,
          activeBlogs,
          blogsCache,
          paginationCache,
          searchQuery,
        } = get();

        // 1. Remove deleted blog from all cached pages in blogsCache
        const newBlogsCache = {};
        for (const [searchKey, pages] of Object.entries(blogsCache)) {
          newBlogsCache[searchKey] = {};
          for (const [pageNum, blogs] of Object.entries(pages)) {
            newBlogsCache[searchKey][pageNum] = blogs.filter(
              (blog) => blog._id !== id
            );
          }
        }

        // 2. Remove the blog from current activeBlogs page
        const updatedActiveBlogs = activeBlogs.filter((b) => b._id !== id);

        // 3. Calculate new total and totalPages
        const newTotal = Math.max(0, pagination.total - 1);
        const newTotalPages = Math.max(
          1,
          Math.ceil(newTotal / pagination.limit)
        );

        // 4. Adjust current page if updatedActiveBlogs is empty and page > 1
        let newPage = pagination.page;
        if (updatedActiveBlogs.length === 0 && newPage > 1) {
          newPage = newPage - 1;
        }

        // 5. Update paginationCache for current searchQuery and newPage
        const newPaginationCache = { ...paginationCache };

        if (!newPaginationCache[searchQuery]) {
          newPaginationCache[searchQuery] = {};
        }

        // Update pagination info for the newPage, which might be different if page changed
        newPaginationCache[searchQuery][newPage] = {
          ...pagination,
          total: newTotal,
          totalPages: newTotalPages,
          page: newPage,
        };

        // 6. Update activeBlogs for the possibly new page from blogsCache (if exists)
        // Because if page changed, activeBlogs must reflect that page's data
        // Otherwise, keep updatedActiveBlogs if page didn't change

        // Try to get cached blogs for newPage & current searchQuery
        const newPageBlogs =
          newBlogsCache[searchQuery]?.[newPage] || updatedActiveBlogs;

        // 7. Finally, update the state with new caches and pagination & activeBlogs
        set({
          blogsCache: newBlogsCache,
          paginationCache: newPaginationCache,
          pagination: {
            ...pagination,
            total: newTotal,
            totalPages: newTotalPages,
            page: newPage,
          },
          activeBlogs: newPageBlogs,
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

  updateBlogHandler: async (update, id, data) => {
    updateState(set, update, { loading: true, error: false, success: false });
    try {
      const res = await apiInstance.patch(
        `/blog/${id}?update=${update}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
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

        updateState(set, update, {
          loading: false,
          error: false,
          success: true,
        });
        toast.success(res.data.message || "Blog updated successfully");
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

export default useBlogStore;
