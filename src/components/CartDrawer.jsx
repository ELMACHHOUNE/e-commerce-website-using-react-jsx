import { X, Trash, Plus, Minus, ShoppingBag, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";

export default function CartDrawer() {
  const { items, isOpen, toggle, removeItem, updateQty, clear, itemCount } =
    useCart();
  const navigate = useNavigate();

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

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
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-slate-950 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4 dark:border-slate-800">
            <h3 className="text-lg font-medium flex items-center gap-2 dark:text-white">
              <ShoppingBag className="size-5" />
              Your cart
              {itemCount > 0 && (
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-medium text-white dark:bg-white dark:text-slate-900">
                  {itemCount}
                </span>
              )}
            </h3>
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
              <Card className="p-6 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                <ShoppingBag className="mx-auto size-8 mb-2 text-slate-300 dark:text-slate-600" />
                No items in cart.
              </Card>
            ) : (
              <ul className="space-y-3">
                {items.map((it) => (
                  <li key={it.id} className="flex items-center gap-3">
                    <img
                      src={it.image}
                      alt={it.title}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900 truncate dark:text-white">
                        {it.title}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        ${it.price} each
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => updateQty(it.id, -1)}
                          disabled={it.qty <= 1}
                        >
                          <Minus className="size-3" />
                        </Button>
                        <span className="w-6 text-center text-sm font-medium">
                          {it.qty}
                        </span>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => updateQty(it.id, 1)}
                        >
                          <Plus className="size-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="font-medium">
                        ${(it.price * it.qty).toFixed(2)}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeItem(it.id)}
                      >
                        <Trash className="size-4 text-red-500" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t p-4 space-y-3 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600 dark:text-slate-400">Total</div>
              <div className="font-medium text-lg dark:text-white">${total.toFixed(2)}</div>
            </div>
            <Button
              className="w-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              size="lg"
              disabled={items.length === 0}
              onClick={() => {
                toggle(false);
                navigate("/checkout");
              }}
            >
              <CreditCard className="mr-2 size-4" />
              Proceed to Checkout
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => toggle(false)}
            >
              Continue shopping
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
