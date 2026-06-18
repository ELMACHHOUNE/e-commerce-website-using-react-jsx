import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight, Package, Users, ShoppingBag, Globe,
  Mail, Phone, MapPin, Send, CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const stats = [
  { label: "Products in catalog", value: "20+" },
  { label: "API endpoints", value: "4" },
  { label: "UI Components", value: "12+" },
  { label: "Pages", value: "10+" },
];

const features = [
  { icon: Package, label: "Products", desc: "Full CRUD management" },
  { icon: Users, label: "Users", desc: "Role-based access control" },
  { icon: ShoppingBag, label: "Cart", desc: "Persistent shopping cart" },
  { icon: Globe, label: "API", desc: "RESTful data fetching" },
];

const techGroups = [
  { title: "Frontend", items: ["React 19", "Vite 8", "Tailwind CSS v4", "shadcn/ui"] },
  { title: "Data & State", items: ["axios", "react-router-dom v7", "Context API", "localStorage"] },
  { title: "Tooling", items: ["recharts", "exceljs", "pdfmake", "lucide-react"] },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@mscstore.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: MapPin, label: "Address", value: "123 Commerce St, San Francisco, CA 94102" },
];

function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="size-7 text-green-600" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">Message sent!</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">We&apos;ll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Send us a message</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-300">Full Name</label>
          <input required placeholder="John Doe"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-slate-300 focus:ring-2 focus:ring-slate-200/50 dark:border-gray-700 dark:bg-gray-950 dark:focus:ring-gray-700/50" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-300">Email</label>
          <input required type="email" placeholder="john@example.com"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-slate-300 focus:ring-2 focus:ring-slate-200/50 dark:border-gray-700 dark:bg-gray-950 dark:focus:ring-gray-700/50" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-300">Subject</label>
        <input required placeholder="How can we help?"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-slate-300 focus:ring-2 focus:ring-slate-200/50 dark:border-gray-700 dark:bg-gray-950 dark:focus:ring-gray-700/50" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-300">Message</label>
        <textarea required rows="5" placeholder="Tell us more about your inquiry..."
          className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-slate-300 focus:ring-2 focus:ring-slate-200/50 dark:border-gray-700 dark:bg-gray-950 dark:focus:ring-gray-700/50" />
      </div>
      <Button type="submit" className="bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200">
        <Send className="mr-2 size-4" />
        Send Message
      </Button>
    </form>
  );
}

export default function About() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div className="space-y-24 py-4 sm:space-y-32 sm:py-8">
      {/* ─── Hero ─── */}
      <section className="text-center">
        <span className="inline-block rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-medium text-slate-500 shadow-sm dark:border-gray-700 dark:bg-black dark:text-gray-400">
          About
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
          Built with modern tools
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-500 dark:text-gray-400">
          MSC Store is a frontend demonstration project showcasing a fully functional ecommerce
          interface built with React 19, Tailwind CSS v4, and shadcn/ui.
        </p>
      </section>

      {/* ─── Stats ─── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-slate-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-black">
            <p className="text-3xl font-bold text-slate-950 dark:text-white">{s.value}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* ─── Story ─── */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            Our story
          </h2>
          <p className="mt-4 leading-relaxed text-slate-500 dark:text-gray-400">
            This project was built as a demonstration of modern React development practices.
            It features a live product catalog powered by the Fake Store API, a role-based
            admin dashboard with full CRUD operations, and a clean, responsive UI built
            with shadcn/ui components.
          </p>
          <p className="mt-4 leading-relaxed text-slate-500 dark:text-gray-400">
            The admin panel includes data visualization with recharts, Excel and PDF export
            capabilities, and complete management interfaces for products, users, and categories.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
          >
            Browse Products <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="border-slate-200 bg-white p-5 dark:border-gray-700 dark:bg-black">
                <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-gray-900">
                  <Icon className="size-5 text-slate-700 dark:text-gray-300" />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-950 dark:text-white">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-gray-400">{item.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ─── Tech Stack ─── */}
      <section className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 dark:border-gray-700 dark:bg-black">
        <h2 className="text-center text-2xl font-semibold text-slate-950 sm:text-3xl dark:text-white">
          Tech Stack
        </h2>
        <div className="mt-8 grid gap-4 text-center text-sm sm:grid-cols-3">
          {techGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-3 font-semibold text-slate-950 dark:text-white">{group.title}</p>
              <ul className="space-y-1.5 text-slate-500 dark:text-gray-400">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact">
        <div className="text-center">
          <span className="inline-block rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-medium text-slate-500 shadow-sm dark:border-gray-700 dark:bg-black dark:text-gray-400">
            Contact
          </span>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            Get in touch
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-500 dark:text-gray-400">
            Have a question, feedback, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          <Card className="border-slate-200 bg-white p-6 lg:col-span-3 lg:p-8 dark:border-gray-700 dark:bg-black">
            <ContactForm />
          </Card>

          <div className="space-y-4 lg:col-span-2">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.label} className="border-slate-200 bg-white p-5 dark:border-gray-700 dark:bg-black">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-gray-900">
                      <Icon className="size-5 text-slate-700 dark:text-gray-300" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-gray-400">{item.label}</p>
                      <p className="mt-0.5 text-sm font-medium text-slate-900 dark:text-gray-100">{item.value}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
            <Card className="border-slate-200 bg-white p-5 dark:border-gray-700 dark:bg-black">
              <p className="text-sm font-medium text-slate-700 dark:text-gray-300">Business Hours</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">Mon – Fri: 9:00 AM – 6:00 PM</p>
              <p className="text-sm text-slate-500 dark:text-gray-400">Sat: 10:00 AM – 2:00 PM</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
