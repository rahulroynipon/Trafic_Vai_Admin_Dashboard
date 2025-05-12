import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import { Suspense, lazy } from "react";
import AppLoader from "./components/global/AppLoader";

// 🔁 Dynamically import pages
const Manager = lazy(() => import("./pages/Manager"));
const Clients = lazy(() => import("./pages/Clients"));
const Orders = lazy(() => import("./pages/Orders"));
const Services = lazy(() => import("./pages/Services"));
const LinkBuilding = lazy(() => import("./pages/LinkBuilding"));
const ProjectRequest = lazy(() => import("./pages/ProjectRequest"));
const Message = lazy(() => import("./pages/Message"));
const Blogs = lazy(() => import("./pages/Blogs"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<p>Dashboard</p>} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/services" element={<Services />} />
          <Route path="/link-building" element={<LinkBuilding />} />
          <Route path="/project-request" element={<ProjectRequest />} />
          <Route path="/message" element={<Message />} />
          <Route path="/blogs" element={<Blogs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
