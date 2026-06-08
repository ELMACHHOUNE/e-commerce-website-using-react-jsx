import { Link } from "react-router-dom";

const footerLinks = [
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/90">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-base font-semibold text-slate-950">MSC Store</p>
          <p className="mt-1 max-w-md text-sm text-slate-500">
            A compact storefront layout built with shadcn, React Router, and a
            live products feed.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          {footerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="transition hover:text-slate-950"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
