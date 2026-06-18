import { Link } from "react-router-dom";

import { Separator } from "@/components/ui/separator";

const socialIcons = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    path: "M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5m-5 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8m5-9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3",
  },
  {
    href: "https://x.com",
    label: "X",
    path: "M4 4l6 8-6 8h2l5-6 5 6h6l-6-8 6-8h-2l-5 6-5-6H4zm3 2h2l5 6 5-6h2l-5 6 5 6h-2l-5-6-5 6H7l5-6-5-6z",
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2zm4-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
  },
];

const pageLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "All Products" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/about#contact", label: "Contact" },
  { to: "/auth", label: "Account" },
];

export default function Footer() {
  return (
    <footer className="border-t  border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto  grid w-full max-w-7xl grid-cols-1 md:grid-cols-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center px-8 py-12 text-center md:border-r md:border-slate-200 md:dark:border-slate-800">
          <img
            src="/logo.png"
            alt="MSC Store"
            className="h-28 w-auto object-contain dark:brightness-200"
          />
        </div>

        {/* Pages links */}
        <div className="px-8 py-12 bg-black dark:bg-slate-900">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-white dark:text-gray-300">Pages</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
            {pageLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-white transition hover:text-gray-300 dark:text-gray-400 dark:hover:text-gray-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Social icons and copyright */}
        <div className="px-8 py-12">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-900 dark:text-gray-100">Follow Us</h2>
          <div className="mt-6 flex items-center gap-3">
            {socialIcons.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex size-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-500 dark:hover:border-gray-100 dark:hover:text-gray-100"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
          <Separator className="my-6 h-px w-full" />
          <p className="text-xs text-gray-400 dark:text-gray-600">
            &copy; Copyright MSC Studios 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
