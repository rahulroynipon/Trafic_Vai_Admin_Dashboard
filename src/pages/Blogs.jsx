import BlogTable from "./../components/Blog/BlogTable";
import AddBlog from "../components/Blog/AddBlog";
import useBlogStore from "../store/blogStore";
import { useEffect } from "react";

function Blogs() {
  const { activeBlogs: blogs, pagination, getBlogsHandler } = useBlogStore();

  useEffect(() => {
    if (blogs.length) return;
    getBlogsHandler({ page: 1, limit: pagination.limit });
  }, []);

  return (
    <>
      <AddBlog />
      <BlogTable />
    </>
  );
}

export default Blogs;
