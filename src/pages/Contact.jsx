import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@mscstore.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: MapPin, label: "Address", value: "123 Commerce St, San Francisco, CA 94102" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div className="space-y-10 py-4 sm:space-y-14 sm:py-8">
      <section className="text-center">
        <span className="inline-block rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-medium text-slate-500 shadow-sm">
          Contact
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Get in touch
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-slate-500">
          Have a question, feedback, or just want to say hello? We&apos;d love to hear from you.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Form */}
        <Card className="border-slate-200 bg-white p-6 lg:col-span-3 lg:p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2 className="size-7 text-green-600" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-950">Message sent!</h2>
              <p className="mt-2 text-sm text-slate-500">We&apos;ll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-xl font-semibold text-slate-950">Send us a message</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name</label>
                  <input required placeholder="John Doe"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-slate-300 focus:ring-2 focus:ring-slate-200/50" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                  <input required type="email" placeholder="john@example.com"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-slate-300 focus:ring-2 focus:ring-slate-200/50" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Subject</label>
                <input required placeholder="How can we help?"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-slate-300 focus:ring-2 focus:ring-slate-200/50" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Message</label>
                <textarea required rows="5" placeholder="Tell us more about your inquiry..."
                  className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-slate-300 focus:ring-2 focus:ring-slate-200/50" />
              </div>
              <Button type="submit" className="bg-slate-950 text-white hover:bg-slate-800">
                <Send className="mr-2 size-4" />
                Send Message
              </Button>
            </form>
          )}
        </Card>

        {/* Contact info */}
        <div className="space-y-4 lg:col-span-2">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="border-slate-200 bg-white p-5">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                    <Icon className="size-5 text-slate-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{item.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-slate-900">{item.value}</p>
                  </div>
                </div>
              </Card>
            );
          })}
          <Card className="border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-700">Business Hours</p>
            <p className="mt-1 text-sm text-slate-500">Mon – Fri: 9:00 AM – 6:00 PM</p>
            <p className="text-sm text-slate-500">Sat: 10:00 AM – 2:00 PM</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
