import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";
import CartDrawer from "./CartDrawer";

export default function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white dark:bg-slate-950 transition-colors">
      {/* Grid background with radial fade mask */}
      <div
        className="pointer-events-none fixed opacity-30 dark:opacity-4 inset-0 z-0 bg-[length:32px_32px] dark:bg-[length:32px_32px]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
        }}
      />
      {/* Dark mode grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden dark:block bg-[length:32px_32px]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
        }}
      />
      <Navbar />
      <CartDrawer />
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4  sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
