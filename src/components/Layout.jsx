import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";
import CartDrawer from "./CartDrawer";
import GridBackground from "./GridBackground";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950 transition-colors">
      <Navbar />
      <CartDrawer />
      <main className="relative mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
        <GridBackground />
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
