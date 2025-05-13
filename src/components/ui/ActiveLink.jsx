import { cn } from "../../lib/utils";
import { NavLink, useLocation } from "react-router";

export default function ActiveLink({
  to,
  children,
  className,
  activeClassName,
}) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <NavLink
      to={to}
      className={() => {
        const isActive = pathname === to || pathname.startsWith(to + "/");
        return cn(className, isActive && activeClassName);
      }}
    >
      {children}
    </NavLink>
  );
}
