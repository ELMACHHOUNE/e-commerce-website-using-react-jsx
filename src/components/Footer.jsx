import { Link } from "react-router-dom";

const footerGroups = [
  {
    title: "Pages",
    links: [
      { to: "/products", label: "All Products" },
      { to: "/", label: "Home" },
      { to: "/categories", label: "Categories" },
    ],
  },
  {
    title: "Socials",
    links: [
      { to: "https://facebook.com", label: "Facebook", external: true },
      { to: "https://instagram.com", label: "Instagram", external: true },
      { to: "https://x.com", label: "Twitter", external: true },
      { to: "https://linkedin.com", label: "LinkedIn", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "#", label: "Privacy Policy" },
      { to: "#", label: "Terms of Service" },
      { to: "#", label: "Cookie Policy" },
    ],
  },
  {
    title: "Register",
    links: [
      { to: "#", label: "Sign Up" },
      { to: "#", label: "Login" },
      { to: "#", label: "Forgot Password" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black text-zinc-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] lg:gap-16">
          <div className="flex flex-col justify-between gap-10">
            <div className="max-w-sm space-y-5">
              <p className="text-lg font-semibold text-white">MSC Store</p>
              <p className="text-sm leading-6 text-zinc-400">
                A clean storefront built with shadcn, React Router, and a live
                product catalog.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-300">
                <Link className="transition hover:text-white" to="/products">
                  Products
                </Link>
                <Link className="transition hover:text-white" to="/categories">
                  Categories
                </Link>
                <a
                  className="transition hover:text-white"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
                <a
                  className="transition hover:text-white"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </div>

              <p className="text-sm text-zinc-500">
                © Copyright MSC Studios 2024. All rights reserved.
              </p>

              <img
                src="/logo.svg"
                alt="MSC Store logo"
                className="h-10 w-auto"
              />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-base font-semibold text-white">
                  {group.title}
                </h2>
                <div className="mt-5 space-y-4 text-sm text-zinc-400">
                  {group.links.map((link) => {
                    if (link.external) {
                      return (
                        <a
                          key={link.label}
                          href={link.to}
                          target="_blank"
                          rel="noreferrer"
                          className="block transition hover:text-white"
                        >
                          {link.label}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={link.label}
                        to={link.to}
                        className="block transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
