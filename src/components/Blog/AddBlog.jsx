import { useNavigate } from "react-router";
import Button from "../ui/Button";
import { TableHeader } from "../ui/Table";
import { FiPlus } from "react-icons/fi";
import useBlogStore from "../../store/blogStore";

function AddBlog() {
  const navigate = useNavigate();

  const { getBlogsHandler } = useBlogStore();

  const createBlog = () => {
    navigate("/blogs/create");
  };

  return (
    <TableHeader title="Blogs" className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Search by title"
        className="px-3 py-1.5 border border-content-400/30 rounded hover:border-content-400/50 focus:border-primary
        focus:outline-none w-full transition-all placeholder:text-sm"
        onChange={(e) => {
          getBlogsHandler({ search: e.target.value });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            getBlogsHandler({ search: e.target.value });
          }
        }}
      />

      <Button onClick={createBlog} className="flex items-center space-x-1.5">
        <FiPlus />
        <span>Add</span>
      </Button>
    </TableHeader>
  );
}

export default AddBlog;
