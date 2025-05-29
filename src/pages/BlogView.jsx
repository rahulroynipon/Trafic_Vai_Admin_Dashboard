import { useParams } from "react-router";
import BlogDetailSection from "../components/Blog/BlogDetailSection";
import BlogThumbnailSection from "../components/Blog/BlogThumbnailSection";
import useBlogStore from "../store/blogStore";
import { useEffect } from "react";

function BlogView() {
  const { id } = useParams();
  const { getBlogHandler } = useBlogStore();

  useEffect(() => {
    getBlogHandler(id);
  }, [id]);

  return (
    <div className="space-y-4">
      <BlogThumbnailSection />
      <BlogDetailSection />
    </div>
  );
}

export default BlogView;
