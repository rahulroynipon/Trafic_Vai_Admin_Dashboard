import { useParams } from "react-router";
import BlogDetailSection from "../components/Blog/BlogDetailSection";
import BlogThumbnailSection from "../components/Blog/BlogThumbnailSection";

function BlogView() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <BlogThumbnailSection />
      <BlogDetailSection />
    </div>
  );
}

export default BlogView;
