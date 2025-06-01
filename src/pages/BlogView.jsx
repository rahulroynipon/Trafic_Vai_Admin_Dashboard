import { useParams } from "react-router";
import BlogDetailSection from "../components/Blog/BlogDetailSection";
import BlogThumbnailSection from "../components/Blog/BlogThumbnailSection";
import useBlogStore from "../store/blogStore";
import { useEffect } from "react";
import NotFoundComponent from "../components/ui/NotFoundComponent";
import useOptionStore from "../store/optionStore";

function BlogView() {
  const { id } = useParams();
  const { getBlogHandler, isError } = useBlogStore();
  const { getServicesHandler, services } = useOptionStore();

  useEffect(() => {
    getBlogHandler(id);
  }, [id]);

  useEffect(() => {
    if (services.length) return;
    getServicesHandler();
  }, []);

  return isError.getSingle ? (
    <NotFoundComponent title="Blog Not Found" />
  ) : (
    <div className="space-y-4">
      <BlogThumbnailSection />
      <BlogDetailSection />
    </div>
  );
}

export default BlogView;
