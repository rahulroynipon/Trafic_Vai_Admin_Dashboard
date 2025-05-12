import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<p>Home</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
