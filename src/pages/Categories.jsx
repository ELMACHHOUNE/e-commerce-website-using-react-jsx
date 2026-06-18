import { ArrowRight, Shirt, Gem, Monitor, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";

const categories = [
  {
    name: "men's clothing",
    description: "Tailored basics, outerwear, and everyday essentials.",
    icon: Shirt,
    gradient: "from-blue-100 to-indigo-200",
    iconBg: "bg-blue-100 text-blue-700",
    darkGradient: "dark:from-blue-950/40 dark:to-indigo-950/40",
  },
  {
    name: "women's clothing",
    description: "Clean silhouettes and everyday wardrobe staples.",
    icon: ShoppingBag,
    gradient: "from-pink-100 to-rose-200",
    iconBg: "bg-pink-100 text-pink-700",
    darkGradient: "dark:from-pink-950/40 dark:to-rose-950/40",
  },
  {
    name: "jewelery",
    description: "Small details with a premium feel.",
    icon: Gem,
    gradient: "from-amber-100 to-yellow-200",
    iconBg: "bg-amber-100 text-amber-700",
    darkGradient: "dark:from-amber-950/40 dark:to-yellow-950/40",
  },
  {
    name: "electronics",
    description: "Useful tech products and practical accessories.",
    icon: Monitor,
    gradient: "from-emerald-100 to-teal-200",
    iconBg: "bg-emerald-100 text-emerald-700",
    darkGradient: "dark:from-emerald-950/40 dark:to-teal-950/40",
  },
];

export default function Categories() {
  return (
    <section className="space-y-8 py-4 sm:py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="secondary">Categories</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Browse by collection.
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-gray-400">
            Find exactly what you need — shop by category.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-950 transition hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-900"
        >
          View all products <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.name}
              to="/products"
              className={`group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${category.gradient} ${category.darkGradient} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className={`rounded-xl ${category.iconBg} p-3 shadow-sm`}>
                  <Icon className="size-6" />
                </div>
                <ArrowRight className="size-5 text-slate-500 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 dark:text-slate-400" />
              </div>

              <div className="mt-auto">
                <h3 className="text-xl font-bold capitalize text-slate-900 dark:text-white">
                  {category.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {category.description}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-slate-700 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-slate-200">
                Shop now
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
