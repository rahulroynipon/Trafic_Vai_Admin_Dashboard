import { Outlet, useLocation } from "react-router";
import AppHeader from "./components/global/AppHeader";
import SideNavBar from "./components/global/SideNavBar";
import { Suspense, useEffect, useState } from "react";
import useMobile from "./lib/useMobile";
import { cn } from "./lib/utils";
import Overlay from "./components/ui/Overlay";
import AppLoader from "./components/global/AppLoader";
import DrawerLabel from "./components/ui/DrawerLabel";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();
  const { pathname } = useLocation();

  const toggleFn = () => {
    setIsOpen((prev) => !prev);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [pathname]);

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
        <header className="h-[4.5rem] bg-primary shadow-sm px-6 md:px-8 flex items-center">
          <AppHeader toggleFn={toggleFn} />
        </header>

        {/* Page Content */}
        <div className="flex-1 flex flex-col overflow-y-auto px-6 mb-6 md:px-8">
          <div className="h-[4rem] flex  items-center justify-between">
            <DrawerLabel />
          </div>
          <main className="flex-1">
            <Suspense
              Outlet={
                <AppLoader className="h-full relative -top-24 md:-top-12" />
              }
            >
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
