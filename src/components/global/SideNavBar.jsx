import { Link, NavLink } from "react-router";
import navItems from "../../data/navItems";
import { cn } from "../../lib/utils";
import logo from "../../assets/logo.svg";
import { RiLogoutBoxFill } from "react-icons/ri";

function SideNavBar() {
  return (
    <div className="h-full flex flex-col py-6 px-4 bg-base-100">
      {/* Logo */}
      <div className="flex items-center justify-center mb-8">
        <Link to="/">
          <img src={logo} alt="Traffic Vai" className="h-16" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map(({ name, link, icon }) => (
            <li key={name}>
              <NavLink
                to={link}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-3.5 rounded-md px-4 py-3 transition-colors focus:outline-none focus-visible:border focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/30",
                    isActive
                      ? "bg-primary text-white"
                      : "text-content-300 hover:bg-base-200"
                  )
                }
              >
                <span>{icon}</span>
                <span className="text-nowrap">{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <button
        className="mt-6 mx-2 cursor-pointer flex items-center space-x-3.5 rounded-md px-4 py-3 transition-colors focus:outline-none focus-visible:border focus-visible:border-primary/50 
      focus-visible:ring-2 focus-visible:ring-primary/30 text-content-300 bg-base-300 hover:bg-red-100 hover:text-red-600"
      >
        <RiLogoutBoxFill className="text-xl" />
        <span> Logout</span>
      </button>
    </div>
  );
}

export default SideNavBar;
