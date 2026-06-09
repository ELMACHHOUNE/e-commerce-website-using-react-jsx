import { Link } from "react-router-dom";
import { ArrowRight, Package, Users, ShoppingBag, Globe } from "lucide-react";

import { Card } from "@/components/ui/card";

const stats = [
  { label: "Products in catalog", value: "20+" },
  { label: "API endpoints", value: "4" },
  { label: "UI Components", value: "12+" },
  { label: "Pages", value: "10+" },
];

export default function About() {
  return (
    <div className="space-y-20 py-4 sm:space-y-28 sm:py-8">
      {/* Header */}
      <section className="text-center">
        <span className="inline-block rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-medium text-slate-500 shadow-sm">
          About
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Built with modern tools
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-500">
          MSC Store is a frontend demonstration project showcasing a fully functional ecommerce
          interface built with React 19, Tailwind CSS v4, and shadcn/ui.
        </p>
      </section>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-slate-200 bg-white p-6 text-center">
            <p className="text-3xl font-bold text-slate-950">{s.value}</p>
            <p className="mt-1 text-sm text-slate-500">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Story */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Our story
          </h2>
          <p className="mt-4 leading-relaxed text-slate-500">
            This project was built as a demonstration of modern React development practices.
            It features a live product catalog powered by the Fake Store API, a role-based
            admin dashboard with full CRUD operations, and a clean, responsive UI built
            with shadcn/ui components.
          </p>
          <p className="mt-4 leading-relaxed text-slate-500">
            The admin panel includes data visualization with recharts, Excel and PDF export
            capabilities, and complete management interfaces for products, users, and categories.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Browse Products <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Package, label: "Products", desc: "Full CRUD management" },
            { icon: Users, label: "Users", desc: "Role-based access control" },
            { icon: ShoppingBag, label: "Cart", desc: "Persistent shopping cart" },
            { icon: Globe, label: "API", desc: "RESTful data fetching" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="border-slate-200 bg-white p-5">
                <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100">
                  <Icon className="size-5 text-slate-700" />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Tech */}
      <section className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12">
        <h2 className="text-center text-2xl font-semibold text-slate-950 sm:text-3xl">
          Tech Stack
        </h2>
        <div className="mt-8 grid gap-4 text-center text-sm sm:grid-cols-3">
          {[
            { title: "Frontend", items: ["React 19", "Vite 8", "Tailwind CSS v4", "shadcn/ui"] },
            { title: "Data & State", items: ["axios", "react-router-dom v7", "Context API", "localStorage"] },
            { title: "Tooling", items: ["recharts", "exceljs", "pdfmake", "lucide-react"] },
          ].map((group) => (
            <div key={group.title}>
              <p className="mb-3 font-semibold text-slate-950">{group.title}</p>
              <ul className="space-y-1.5 text-slate-500">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
