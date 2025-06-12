import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { Table } from "../ui/Table";
import useBlogStore from "./../../store/blogStore";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import Modal from "../ui/Modal";
import { useNavigate } from "react-router";
import useAuthStore from "../../store/authStore";
import { permessions } from "../../data/Permissions";

function BlogTable() {
  const { hasPermission } = useAuthStore();
  const {
    getBlogsHandler,
    activeBlogs: blogs,
    pagination,
    isLoading,
    isSuccess,
    deleteBlogHandler,
  } = useBlogStore();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState({ state: false, selectedData: null });

  const onOpen = (data) => {
    setIsOpen({ state: true, selectedData: data });
  };

  const onClose = () => {
    setIsOpen({ state: false, selectedData: null });
  };

  const redirectToView = (id) => {
    navigate(`/blogs/${id}`);
  };

  useEffect(() => {
    if (isSuccess.delete) {
      onClose();
    }
  }, [isSuccess]);

  const onPageChange = (newPage) => {
    if (
      newPage !== pagination.page &&
      newPage >= 1 &&
      newPage <= pagination.totalPages
    ) {
      getBlogsHandler({ page: newPage, limit: pagination.limit });
    }
  };

  const renderRow = (blog) => (
    <tr
      key={blog._id}
      className="text-sm border-b border-content-400/15 text-content-300"
    >
      <td className="p-4 text-nowrap">{blog._id}</td>
      <td className="p-4 text-nowrap max-w-[15rem] truncate">{blog.title}</td>
      <td className="p-4 text-nowrap max-w-[15rem] truncate">
        {blog.service?.name}
      </td>
      <td className="p-4 text-nowrap max-w-[15rem] truncate">
        {blog.description}
      </td>
      <td className="p-4 text-nowrap">
        {blog.createdAt
          ? new Intl.DateTimeFormat("en-GB").format(new Date(blog.createdAt))
          : "N/A"}
      </td>

      <td className="p-4 text-nowrap flex space-x-1">
        <Button
          type="button"
          variant="icon"
          onClick={() => redirectToView(blog._id)}
          className="text-lg text-primary"
        >
          <FaEye />
        </Button>

        {hasPermission(permessions.blog) ? (
          <Button
            type="button"
            variant="icon"
            onClick={() => onOpen(blog)}
            className="text-red-500 focus-visible:ring-red-300 hover:bg-red-100 text-lg"
          >
            <MdDelete />
          </Button>
        ) : null}
      </td>
    </tr>
  );

  return (
    <>
      <Table
        headers={[
          "Blog ID",
          "Title",
          "Service",
          "Description",
          "Date",
          "Action",
        ]}
        data={blogs}
        renderRow={renderRow}
        pagination={pagination}
        isLoading={isLoading.get}
        onPageChange={onPageChange}
        currentItemsCount={blogs.length}
      />

      <Modal title="Delete Blog" isOpen={isOpen.state} onClose={onClose}>
        <div className="text-center my-9">
          <h3 className="text-lg font-semibold text-content-200 break-all line-clamp-2">
            {isOpen.selectedData?.title}
          </h3>

          <p className="text-sm text-content-400">
            Are you sure you want to delete this Blog?
          </p>
        </div>

        <div className="flex justify-center space-x-2.5 w-full">
          <Button onClick={onClose} type="button" variant="outline">
            Cancel
          </Button>

          <Button
            type="button"
            onClick={() => deleteBlogHandler(isOpen.selectedData._id)}
            disabled={isLoading.delete}
            isLoading={isLoading.delete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default BlogTable;
