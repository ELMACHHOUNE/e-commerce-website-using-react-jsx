import { Menu, ShoppingBag, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

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
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-950/15">
            M3
          </span>
          <div>
            <p className="text-sm font-semibold tracking-wide text-slate-950">
              MSC Store
            </p>
            <p className="text-xs text-slate-500">Clean commerce layout</p>
          </div>
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
            className="hidden sm:inline-flex"
            onClick={() => toggle(true)}
          >
            <ShoppingBag className="mr-2 size-4" />
            Cart
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
            as={Link}
            to="/auth"
          >
            <User className="mr-2 size-4" />
            Account
          </Button>
          <Button variant="ghost" size="icon-sm" className="md:hidden">
            <Menu className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
