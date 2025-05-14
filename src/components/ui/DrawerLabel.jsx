import { useLocation, Link } from "react-router";
import { FaHome } from "react-icons/fa";

export default function DrawerLabel() {
  const location = useLocation();
  const pathList = location.pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="w-full overflow-x-auto">
      <ul className="flex flex-wrap items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
        {/* Home */}
        <li className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-1 hover:underline text-gray-700"
          >
            <FaHome className="text-xl" />
          </Link>
          <span>/</span>
        </li>

        {/* Dashboard */}
        <li className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-1 hover:underline text-gray-700"
          >
            <span>Dashboard</span>
          </Link>
          {pathList.length > 0 && <span>/</span>}
        </li>

        {/* Dynamic path segments */}
        {pathList.map((path, index) => {
          const to = "/" + pathList.slice(0, index + 1).join("/");
          const isLast = index === pathList.length - 1;

          return (
            <li key={index} className="flex items-center gap-2 capitalize">
              {!isLast ? (
                <Link to={to} className="hover:underline text-gray-700">
                  {decodeURIComponent(path)}
                </Link>
              ) : (
                <span aria-current="page" className="text-gray-900 font-medium">
                  {decodeURIComponent(path)}
                </span>
              )}
              {!isLast && <span>/</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
