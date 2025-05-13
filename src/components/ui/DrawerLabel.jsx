import { useLocation, Link } from "react-router";
import { FaHome } from "react-icons/fa";

export default function DrawerLabel() {
  const location = useLocation();

  const pathList = location.pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb">
      <ul className="flex items-center gap-2 text-content-300">
        <li className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1 hover:underline">
            <FaHome className="text-xl" />
          </Link>
          <span>/</span>
        </li>

        <li className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1 hover:underline">
            <span>Dashboard</span>
          </Link>
          {pathList.length > 0 && <span>/</span>}
        </li>

        {pathList.map((path, index) => {
          const to = "/" + pathList.slice(0, index + 1).join("/");
          const isLast = index === pathList.length - 1;

          return (
            <li key={index} className="flex items-center gap-2 capitalize">
              {!isLast ? (
                <Link to={to} className="hover:underline">
                  {decodeURIComponent(path)}
                </Link>
              ) : (
                <span aria-current="page">{decodeURIComponent(path)}</span>
              )}
              {!isLast && <span>/</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
