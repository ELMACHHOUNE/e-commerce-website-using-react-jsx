import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="auth" element={<Auth />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
