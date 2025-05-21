import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import { lazy, useEffect } from "react";
import { Toaster } from "sonner";
import useAuthStore from "./store/authStore";

// 🔁 Dynamically import pages
const Manager = lazy(() => import("./pages/Manager"));
const ManagerProfile = lazy(() => import("./pages/ManagerProfile"));
const Clients = lazy(() => import("./pages/Clients"));
const Orders = lazy(() => import("./pages/Orders"));
const Services = lazy(() => import("./pages/Services"));
const LinkBuilding = lazy(() => import("./pages/LinkBuilding"));
const ProjectRequest = lazy(() => import("./pages/ProjectRequest"));
const Message = lazy(() => import("./pages/Message"));
const Blogs = lazy(() => import("./pages/Blogs"));
const AddBlog = lazy(() => import("./pages/AddBlog"));

function App() {
  const { getUserHandler } = useAuthStore();

  useEffect(() => {
    getUserHandler();
  }, []);

  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<p>Dashboard</p>} />

          <Route path="manager">
            <Route index element={<Manager />} />
            <Route path=":id" element={<ManagerProfile />} />
          </Route>

          <Route path="/clients" element={<Clients />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/services" element={<Services />} />
          <Route path="/link-building" element={<LinkBuilding />} />
          <Route path="/project-request" element={<ProjectRequest />} />
          <Route path="/message" element={<Message />} />

          <Route path="blogs">
            <Route index element={<Blogs />} />
            <Route path="create" element={<AddBlog />} />
            <Route path=":id" element={<p>View Blog</p>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
