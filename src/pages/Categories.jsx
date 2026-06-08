import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const categories = [
  {
    name: "men's clothing",
    description: "Tailored basics, outerwear, and everyday essentials.",
  },
  {
    name: "women's clothing",
    description: "Clean silhouettes and everyday wardrobe staples.",
  },
  {
    name: "jewelery",
    description: "Small details with a premium feel.",
  },
  {
    name: "electronics",
    description: "Useful tech products and practical accessories.",
  },
];

export default function Categories() {
  return (
    <section className="space-y-6 py-4 sm:py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="secondary">Categories</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Browse by collection.
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            The categories page is kept lightweight and consistent with the new
            storefront shell.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-950 transition hover:bg-slate-50"
        >
          View all products <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <Card key={category.name} className="border-slate-200 bg-white p-6">
            <Badge className="capitalize">{category.name}</Badge>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {category.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
