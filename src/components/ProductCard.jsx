import { useNavigate } from "react-router-dom";
import { Eye, ShoppingCart } from "lucide-react";

import { useCart } from "@/contexts/CartContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addItem, toggle } = useCart();

  return (
    <div className="group relative flex h-82 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="relative flex-1 overflow-hidden bg-slate-50 dark:bg-slate-800">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-8 transition duration-300 group-hover:scale-110"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/0 transition-all duration-200 group-hover:bg-black/40">
          <div className="flex items-center gap-3 opacity-0 transition-all duration-200 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => navigate(`/products/${product.id}`)}
              className="flex size-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
            >
              <Eye className="size-5 text-slate-800" />
            </button>
            <button
              type="button"
              onClick={() => {
                addItem(product);
                toggle(true);
              }}
              className="flex size-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
            >
              <ShoppingCart className="size-5 text-slate-800" />
            </button>
          </div>
          <span className="text-lg font-bold text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-t border-slate-100 px-3 py-2.5 dark:border-slate-700">
        <p className="line-clamp-1 text-xl font-medium text-slate-700 dark:text-slate-300">
          {product.title}
        </p>
      </div>
    </div>
  );
}
