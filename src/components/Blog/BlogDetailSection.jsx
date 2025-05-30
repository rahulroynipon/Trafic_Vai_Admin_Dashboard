import useBlogStore from "../../store/blogStore";

function BlogDetailSection() {
  const { blog } = useBlogStore();

  return (
    <div className="p-5 bg-base-100 shadow-sm">
      <h2>{blog?.title}</h2>

      <p>{blog?.description }</p>
    </div>
  );
}

export default BlogDetailSection;
