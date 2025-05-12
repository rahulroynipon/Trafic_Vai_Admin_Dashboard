import { Outlet } from "react-router";
import AppHeader from "./components/global/AppHeader";
import SideNavBar from "./components/global/SideNavBar";
import { useState } from "react";
import useMobile from "./lib/useMobile";
import { cn } from "./lib/utils";
import Overlay from "./components/ui/Overlay";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();

  const toggleFn = () => {
    setIsOpen((prev) => !prev);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {isMobile ? <Overlay isOpen={isOpen} onClose={onClose} /> : null}
      {/* Sidebar */}
      <aside
        className={cn(
          " bg-base-100 shadow-sm",
          isMobile
            ? "fixed h-svh z-30 transition-all transform duration-300 w-[15rem]"
            : "w-[15rem]",
          isMobile && (isOpen ? "translate-x-0" : "-translate-x-full")
        )}
      >
        <SideNavBar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-[4.5rem] bg-primary shadow-sm px-6 flex items-center">
          <AppHeader toggleFn={toggleFn} />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
