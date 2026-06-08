import { Link } from "react-router-dom";

const groups = [
  {
    title: "Pages",
    links: [
      { to: "/", label: "Home" },
      { to: "/products", label: "All Products" },
      { to: "/categories", label: "Categories" },
      { to: "/auth", label: "Account" },
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
    title: "Support",
    links: [
      { to: "#", label: "FAQ" },
      { to: "#", label: "Contact Us" },
      { to: "#", label: "Shipping Info" },
      { to: "#", label: "Returns" },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-3">
        {/* Child 1 - Left: White bg with big logo */}
        <div className="flex flex-col items-center justify-center border-t border-zinc-200  bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.06),_transparent_35%),linear-gradient(180deg,_#f8fafc,_#ffffff_45%,_#f8fafc)] px-8 py-16 text-center">
          <img
            src="/logo.png"
            alt="MSC Store"
            className="h-24 w-auto object-contain"
          />
        </div>

        {/* Child 2 - Right: Black bg with first two link groups */}
        <div className="border-t border-zinc-800 bg-black px-8 py-16 text-zinc-100">
          <div className="grid grid-cols-2 gap-8">
            {groups.slice(0, 2).map((group) => (
              <div key={group.title}>
                <h2 className="text-base font-semibold text-white">
                  {group.title}
                </h2>
                <div className="mt-5 space-y-4 text-sm text-zinc-400">
                  {group.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        href={link.to}
                        target="_blank"
                        rel="noreferrer"
                        className="block transition hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        to={link.to}
                        className="block transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Child 3 - Right: Black bg with last two link groups */}
        <div className="border-t border-zinc-800 bg-black px-8 py-16 text-zinc-100">
          <div className="grid grid-cols-2 gap-8">
            {groups.slice(2, 4).map((group) => (
              <div key={group.title}>
                <h2 className="text-base font-semibold text-white">
                  {group.title}
                </h2>
                <div className="mt-5 space-y-4 text-sm text-zinc-400">
                  {group.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        href={link.to}
                        target="_blank"
                        rel="noreferrer"
                        className="block transition hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        to={link.to}
                        className="block transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 border-t border-zinc-800 pt-6 text-sm text-zinc-500">
            © Copyright MSC Studios 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
