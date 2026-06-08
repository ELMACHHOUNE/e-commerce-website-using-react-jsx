import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Checkout() {
  const { items, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleConfirm() {
    clear();
    navigate("/");
  }

  if (items.length === 0 && !submitted) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-semibold">Checkout</h1>
        <Card className="p-6 text-center">
          <p className="text-slate-600">Your cart is empty.</p>
          <Button className="mt-4" onClick={() => navigate("/products")}>
            Browse Products
          </Button>
        </Card>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-semibold">Checkout</h1>
        <Card className="p-6 text-center">
          <div className="mb-4 text-4xl">&#10003;</div>
          <h2 className="text-xl font-semibold">Order Placed!</h2>
          <p className="mt-2 text-slate-600">
            Thank you, {form.name}. Your order has been placed successfully.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            A confirmation email has been sent to {form.email}.
          </p>
          <Button className="mt-6" onClick={handleConfirm}>
            Continue Shopping
          </Button>
        </Card>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Shipping form */}
        <div className="md:col-span-3">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-medium">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Main Street, Apt 4B"
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    required
                    value={form.zip}
                    onChange={handleChange}
                    placeholder="10001"
                    className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-slate-900 text-white hover:bg-slate-800"
              >
                Review Order
              </Button>
            </form>
          </Card>
        </div>

        {/* Order summary */}
        <div className="md:col-span-2">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.id} className="flex items-center gap-3">
                  <img
                    src={it.image}
                    alt={it.title}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {it.title}
                    </div>
                    <div className="text-xs text-slate-500">Qty: {it.qty}</div>
                  </div>
                  <div className="text-sm font-medium">
                    ${(it.price * it.qty).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Subtotal</span>
                <span className="font-medium">${total}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-slate-600">Shipping</span>
                <span className="text-sm text-slate-600">Free</span>
              </div>
              <div className="flex items-center justify-between mt-2 border-t pt-2">
                <span className="font-medium">Total</span>
                <span className="font-medium text-lg">${total}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
