import { useCart } from "@/contexts/CartContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Checkout() {
  const { items, clear } = useCart();

  const total = items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold">Checkout</h1>
      <Card className="p-6">
        {items.length === 0 ? (
          <p className="text-slate-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            <ul className="space-y-2">
              {items.map((it) => (
                <li key={it.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={it.image}
                      alt={it.title}
                      className="h-12 w-12 rounded"
                    />
                    <div>
                      <div className="font-medium">{it.title}</div>
                      <div className="text-sm text-slate-600">
                        Qty: {it.qty}
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">
                    ${(it.price * it.qty).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">Total</div>
              <div className="font-medium">${total}</div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => clear()}
                className="w-full"
              >
                Clear cart
              </Button>
              <Button
                className="w-full"
                onClick={() => alert("Pretend payment flow")}
              >
                Pay ${total}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
}
