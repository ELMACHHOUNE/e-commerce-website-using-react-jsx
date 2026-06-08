import { Link } from "react-router-dom";

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
  { to: "/auth", label: "Account" },
];

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-3">
        {/* Child 1 - Left: White bg with logo */}
        <div className="flex flex-col items-center justify-center border-t border-zinc-200 bg-gradient-to-b from-slate-50 to-white px-8 py-12 text-center">
          <img
            src="/logo.png"
            alt="MSC Store"
            className="h-36 w-auto object-contain"
          />
        </div>

        {/* Child 2 - Black bg with Pages links */}
        <div className="border-t border-zinc-800 bg-black px-8 py-12 text-zinc-100">
          <h2 className="text-base font-semibold text-white">Pages</h2>
          <div className="mt-5 space-y-4 text-sm text-zinc-400">
            {pageLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="block transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Child 3 - Black bg with social icons and copyright */}
        <div className="border-t border-zinc-800 bg-black px-8 py-12 text-zinc-100">
          <h2 className="text-base font-semibold text-white">Follow Us</h2>
          <div className="mt-5 flex items-center gap-4">
            {socialIcons.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex size-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition hover:bg-white hover:text-black"
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
          <p className="mt-10 border-t border-zinc-800 pt-6 text-sm text-zinc-600">
            © Copyright MSC Studios 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
