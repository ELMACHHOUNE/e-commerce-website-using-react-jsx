import { ArrowRight, BadgeCheck, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";

import { Card } from "@/components/ui/card";

const highlights = [
  {
    icon: Truck,
    title: "Fast browsing",
    description: "A clear catalog layout that makes products easy to scan.",
  },
  {
    icon: BadgeCheck,
    title: "Shadcn styled",
    description: "Built on the shared UI primitives already in the project.",
  },
  {
    icon: ShieldCheck,
    title: "API powered",
    description: "Products load directly from a public ecommerce API.",
  },
];

export default function Home() {
  return (
    <section className="space-y-10 py-4 sm:py-8">
      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            Modern storefront starter
          </span>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              A cleaner ecommerce layout with a live product catalog.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              The app now has a consistent shell, a responsive navbar and
              footer, and a products page that fetches real data from Fake Store
              API.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/products"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Browse products <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              to="/categories"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-950 transition hover:bg-slate-50"
            >
              Explore categories
            </Link>
          </div>
        </div>

        <Card className="border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
              Layout focus
            </p>
            <div className="space-y-3 text-sm text-slate-600">
              <p>• Sticky navigation with active route states.</p>
              <p>• Full-height layout with proper footer placement.</p>
              <p>• Product cards designed for fetched API data.</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} className="border-slate-200 bg-white p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Icon className="size-5" />
              </div>
              <h2 className="text-lg font-semibold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
