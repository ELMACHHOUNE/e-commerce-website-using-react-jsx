import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { AlertCircle, DollarSign } from "lucide-react";

import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";

export default function Products() {
  const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filtered = products.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      const matchesSearch = p.title?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }
    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/products`);

        if (isMounted) {
          setProducts(response.data);
        }
      } catch {
        if (isMounted) {
          setError("We could not load products right now. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="space-y-6 py-4 sm:py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="secondary">Products</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Live catalog from Fake Store API.
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-gray-400">
            This page fetches product data with axios and renders the results in
            a responsive shadcn grid.
          </p>
        </div>

          <div className="flex items-center gap-2">
            <DollarSign className="size-4 shrink-0 text-slate-400" />
            <select
              value={
                minPrice || maxPrice
                  ? `${minPrice || "0"}-${maxPrice || ""}`
                  : ""
              }
              onChange={(e) => {
                const val = e.target.value;
                if (!val) {
                  setMinPrice("");
                  setMaxPrice("");
                } else {
                  const [min, max] = val.split("-");
                  setMinPrice(min);
                  setMaxPrice(max || "");
                }
                setPage(1);
              }}
              className="h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-sm outline-none transition-colors focus:border-slate-300 focus:ring-2 focus:ring-slate-200/50 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:focus:ring-gray-700/50"
            >
              <option value="">All prices</option>
              <option value="0-50">Under $50</option>
              <option value="50-100">$50 – $100</option>
              <option value="100-200">$100 – $200</option>
              <option value="200-500">$200 – $500</option>
              <option value="500-">Over $500</option>
            </select>
            <span className="hidden text-xs text-slate-400 sm:inline">or</span>
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
              className="h-9 w-16 rounded-lg border border-slate-200 bg-white px-2 text-sm outline-none transition-colors focus:border-slate-300 focus:ring-2 focus:ring-slate-200/50 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:focus:ring-gray-700/50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="text-slate-300 dark:text-gray-600">—</span>
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
              className="h-9 w-16 rounded-lg border border-slate-200 bg-white px-2 text-sm outline-none transition-colors focus:border-slate-300 focus:ring-2 focus:ring-slate-200/50 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:focus:ring-gray-700/50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
      </div>
      {loading ? (
        <Loader loading={loading} fullScreen={false} />
      ) : error ? (
        <Card className="border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-medium">Unable to load products</p>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          </div>
        </Card>
      ) : (
        <>
          {paginated.length === 0 ? (
            <Card className="flex items-center justify-center border-slate-200 bg-white p-10 text-slate-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-400">
              No products match your search.
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {filtered.length > 0 && (
            <div className="mt-6">
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                totalItems={filtered.length}
                pageSize={pageSize}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}
