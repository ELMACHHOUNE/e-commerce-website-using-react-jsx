import { useEffect, useState } from "react";
import axios from "axios";
import { AlertCircle, Loader2 } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("https://fakestoreapi.com/products/");

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
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Live catalog from Fake Store API.
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            This page fetches product data with axios and renders the results in
            a responsive shadcn grid.
          </p>
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh data
        </Button>
      </div>

      {loading ? (
        <Card className="flex items-center justify-center gap-3 border-slate-200 bg-white p-10 text-slate-600">
          <Loader2 className="size-5 animate-spin" />
          Loading products...
        </Card>
      ) : error ? (
        <Card className="border-red-200 bg-red-50 p-6 text-red-700">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-medium">Unable to load products</p>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
