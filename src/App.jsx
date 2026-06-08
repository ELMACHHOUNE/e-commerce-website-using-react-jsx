import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import Products from "./pages/Products";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
