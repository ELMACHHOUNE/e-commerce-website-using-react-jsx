import { useState, useRef, useEffect } from "react";
import { Menu, ShoppingBag, LogOut, LayoutDashboard, Settings, Shield, UserPlus } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
];

export default function Navbar() {
  const { toggle } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const { itemCount } = useCart();

  const initial = (user?.fullName || user?.name || user?.email || "U").charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="MSC Store" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex relative"
            onClick={() => toggle(true)}
          >
            <ShoppingBag className="mr-2 size-4" />
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-medium text-white">
                {itemCount}
              </span>
            )}
          </Button>

          {user ? (
            <div className="hidden sm:relative sm:flex" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex size-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors overflow-hidden"
                title="Account menu"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt="" className="h-full w-full object-cover" />
                ) : (
                  initial
                )}
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 w-48 rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                  <div className="border-b border-slate-100 px-4 py-2">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {user.fullName || user.name || user.email}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { setMenuOpen(false); navigate("/dashboard"); }}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </button>
                  {user.role === "admin" && (
                    <button
                      onClick={() => { setMenuOpen(false); navigate("/admin"); }}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Shield className="size-4" />
                      Dashboard Admin
                    </button>
                  )}
                  <button
                    onClick={() => { setMenuOpen(false); navigate("/settings"); }}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Settings className="size-4" />
                    Settings
                  </button>
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => { setMenuOpen(false); logout(); navigate("/"); }}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => navigate("/auth", { state: { mode: "register" } })}
            >
              <UserPlus className="mr-2 size-4" />
              Register
            </Button>
          )}

          <Button variant="ghost" size="icon-sm" className="md:hidden">
            <Menu className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
