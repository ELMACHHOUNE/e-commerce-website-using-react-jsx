import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { ArrowLeft, ShoppingCart, Star } from "lucide-react"

import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem, toggle } = useCart()
  const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "")

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const res = await axios.get(`${API_URL}/products/${id}`)
        if (mounted) setProduct(res.data)
      } catch {
        if (mounted) navigate("/products", { replace: true })
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [id])

  if (loading) return <Loader loading={loading} fullScreen={false} />
  if (!product) return null

  return (
    <section className="py-8">
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => navigate("/products")}
      >
        <ArrowLeft className="size-4" />
        Back to products
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl bg-slate-50 p-12 dark:bg-slate-800">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 w-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600 dark:bg-slate-700 dark:text-slate-300">
            {product.category}
          </span>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {product.title}
          </h1>

          <div className="flex items-center gap-2">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {product.rating?.rate} ({product.rating?.count} reviews)
            </span>
          </div>

          <p className="text-slate-600 dark:text-slate-400">
            {product.description}
          </p>

          <div className="mt-auto flex items-center justify-between gap-4 border-t pt-4 dark:border-slate-700">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>

            <Button
              className="gap-2 bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              onClick={() => { addItem(product); toggle(true) }}
            >
              <ShoppingCart className="size-4" />
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
