import { X, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";

export default function CartDrawer() {
  const { items, isOpen, toggle, removeItem, clear } = useCart();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => toggle(false)}
          aria-hidden
        />
      )}

      <div
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="text-lg font-medium">Your cart</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon-sm" onClick={() => clear()}>
                <Trash className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => toggle(false)}
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <Card className="p-6 text-slate-600">No items in cart.</Card>
            ) : (
              <ul className="space-y-3">
                {items.map((it) => (
                  <li key={it.id} className="flex items-center gap-3">
                    <img
                      src={it.image}
                      alt={it.title}
                      className="h-12 w-12 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">
                        {it.title}
                      </div>
                      <div className="text-sm text-slate-600">
                        Qty: {it.qty}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-medium">${it.price}</div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeItem(it.id)}
                      >
                        <Trash className="size-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm text-slate-600">Total</div>
              <div className="font-medium">
                ${items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => toggle(false)}
              >
                Continue shopping
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  toggle(false);
                  window.location.href = "/checkout";
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
