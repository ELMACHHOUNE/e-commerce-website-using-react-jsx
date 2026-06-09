import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowRight,
  ShoppingBag,
  Package,
  CreditCard,
  Truck,
  ShieldCheck,
  Star,
  ChevronRight,
} from "lucide-react";

import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

const features = [
  {
    icon: Package,
    title: "Live Product Catalog",
    description: "Browse real products fetched from the Fake Store API with search and pagination.",
  },
  {
    icon: ShoppingBag,
    title: "Shopping Cart",
    description: "Add items to your cart, adjust quantities, and see the total before checkout.",
  },
  {
    icon: CreditCard,
    title: "Secure Checkout",
    description: "Streamlined checkout flow with order summary and delivery details.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick processing and reliable shipping on all orders.",
  },
  {
    icon: ShieldCheck,
    title: "Admin Dashboard",
    description: "Full CRUD management for products, users, and categories with charts and export.",
  },
  {
    icon: Star,
    title: "Modern UI",
    description: "Built with shadcn/ui components and Tailwind CSS for a clean, responsive design.",
  },
];

const testimonials = [
  { name: "Alex Rivera", role: "Store Owner", text: "Clean codebase and easy to customize. The admin panel saved me hours of development time." },
  { name: "Sarah Chen", role: "Developer", text: "Love the shadcn components — everything looks polished right out of the box." },
  { name: "James Wilson", role: "Designer", text: "The responsive layout works beautifully across all devices. Great UX." },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await axios.get(`${API_URL}/products?limit=4`);
        setFeaturedProducts(data);
      } catch { /* silently fail */ }
    }
    load();
  }, []);

  return (
    <div className="space-y-24 pb-16 sm:space-y-32">
      {/* Hero — full screen inside layout */}
      <section className="relative -mx-4 flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 sm:-mx-6 sm:px-12 lg:-mx-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(148,163,184,0.08),_transparent_50%)]" />
        <div className="relative mx-auto w-full max-w-3xl text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-zinc-400 backdrop-blur-sm">
            MSC Store v2.0
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Discover products that{" "}
            <span className="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
              inspire
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            A modern ecommerce experience built with React, shadcn/ui, and Tailwind CSS.
            Browse, search, and manage products with ease.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/products"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-slate-950 transition hover:bg-zinc-200"
            >
              Browse Products
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-700 px-6 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features — auto-scroll drawer */}
      <section>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Everything you need
          </h2>
          <p className="mt-3 text-slate-500">
            A complete set of tools to run your online store.
          </p>
        </div>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max animate-scroll gap-5 px-4">
            {[...features, ...features].map((f, i) => {
              const Icon = f.icon;
              return (
                <Card
                  key={`${f.title}-${i}`}
                  className="w-72 shrink-0 border-slate-200 bg-white p-6 transition hover:shadow-lg hover:shadow-slate-950/5"
                >
                  <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">{f.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{f.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Featured Products
              </h2>
              <p className="mt-2 text-slate-500">
                Hand-picked items from our catalog.
              </p>
            </div>
            <Link
              to="/products"
              className="hidden items-center gap-1 text-sm font-medium text-slate-900 transition hover:text-slate-600 sm:flex"
            >
              View All <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-16 text-center sm:px-12 sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-400">
          Create an account to start shopping, or explore the admin dashboard to manage your store.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/auth"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-slate-950 transition hover:bg-zinc-200"
          >
            Create Account
          </Link>
          <Link
            to="/products"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-700 px-6 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            Start Shopping
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            What people say
          </h2>
          <p className="mt-3 text-slate-500">
            Trusted by developers and store owners.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-slate-200 bg-white p-6">
              <div className="flex gap-1 text-slate-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-sm font-medium text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
