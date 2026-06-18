import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCw,
  Headphones,
  Star,
  ChevronRight,
} from "lucide-react";

import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

const features = [
  {
    icon: ShoppingBag,
    title: "Free Shipping",
    description: "Free delivery on all orders over $50. Shipped within 24 hours.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Your payment info is encrypted and protected with industry-standard security.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Not satisfied? Return any item within 30 days for a full refund.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is always here to help with any questions or concerns.",
  },
  {
    icon: Truck,
    title: "Track Your Order",
    description: "Real-time tracking from warehouse to your doorstep.",
  },
  {
    icon: Star,
    title: "Top-Rated Products",
    description: "Curated collections with verified customer reviews and ratings.",
  },
];

const categories = [
  { name: "electronics", slug: "electronics" },
  { name: "jewelery", slug: "jewelery" },
  { name: "men's clothing", slug: "men's clothing" },
  { name: "women's clothing", slug: "women's clothing" },
];

const testimonials = [
  { name: "Alex Rivera", role: "Verified Buyer", text: "Fast shipping and the jacket fits perfectly. Will definitely order again." },
  { name: "Sarah Chen", role: "Verified Buyer", text: "Great prices and the quality exceeded my expectations. Highly recommend!" },
  { name: "James Wilson", role: "Verified Buyer", text: "Easy checkout, quick delivery, and hassle-free returns. My new go-to store." },
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
    <>
      {/* ─── Hero ─── */}
      <section className="relative w-screen ml-[calc(-50vw+50%)] flex min-h-[85vh] items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 sm:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(148,163,184,0.08),_transparent_50%)]" />
        <div className="relative mx-auto w-full max-w-3xl text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-zinc-400 backdrop-blur-sm">
            New arrivals are here
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Quality products,{" "}
            <span className="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
              fair prices
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Curated collections from trusted brands. Free shipping on orders over $50,
            easy returns, and secure checkout.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/products"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-slate-950 transition hover:bg-zinc-200"
            >
              Shop Now
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/categories"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-700 px-6 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Content ─── */}
      <div className="mx-auto w-full max-w-7xl space-y-24 px-4 pb-16 sm:space-y-32 sm:px-6 lg:px-8 mt-16">

        {/* ─── Features ─── */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              Why shop with us
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              We make online shopping simple, safe, and enjoyable.
            </p>
          </div>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex w-max animate-scroll gap-5 px-4">
              {[...features, ...features].map((f, i) => {
                const Icon = f.icon;
                return (
                  <Card
                    key={`${f.title}-${i}`}
                    className="w-72 shrink-0 border-slate-200 bg-white p-6 transition hover:shadow-lg hover:shadow-slate-950/5 dark:border-slate-700 dark:bg-slate-900 dark:hover:shadow-white/5"
                  >
                    <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{f.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Categories ─── */}
        <section>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                Shop by Category
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Find exactly what you need.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to="/products"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 p-8 text-center transition hover:-translate-y-1 hover:shadow-lg dark:from-slate-800 dark:to-slate-700"
              >
                <h3 className="text-lg font-bold capitalize text-slate-900 dark:text-white">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Shop now <ArrowRight className="inline size-3.5 transition group-hover:translate-x-0.5" />
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── Featured Products ─── */}
        {featuredProducts.length > 0 && (
          <section>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                  Featured Products
                </h2>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  Hand-picked items from our catalog.
                </p>
              </div>
              <Link
                to="/products"
                className="hidden items-center gap-1 text-sm font-medium text-slate-900 transition hover:text-slate-600 sm:flex dark:text-white dark:hover:text-slate-300"
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

        {/* ─── Testimonials ─── */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              What our customers say
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Real reviews from real people.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex gap-1 text-slate-400 dark:text-slate-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-16 text-center sm:px-12 sm:py-20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to upgrade your wardrobe?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-400">
            Join thousands of happy customers. Free shipping on your first order.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/products"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-slate-950 transition hover:bg-zinc-200 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
            >
              Start Shopping
            </Link>
            <Link
              to="/about"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-700 px-6 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              Learn More
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
