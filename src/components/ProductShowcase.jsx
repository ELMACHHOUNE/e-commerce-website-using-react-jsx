import { Heart, ShoppingCart, Leaf, Tag } from "lucide-react"

const timerBlocks = [
  { label: "00" },
  { label: "24" },
  { label: "02" },
]

export default function ProductShowcase() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto w-full max-w-sm">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="rounded-b-[2.5rem] bg-[#d4edda] px-5 pb-14 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="size-5 text-gray-700" />
                <span className="text-lg">
                  <span className="font-bold">30%</span>{" "}
                  <span className="text-gray-700">sale off</span>
                </span>
              </div>

              <div className="flex items-center gap-1">
                {timerBlocks.map((block, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="inline-flex items-center justify-center rounded-lg bg-black px-2 py-1 text-sm font-bold text-white">
                      {block.label}
                    </span>
                    {i < timerBlocks.length - 1 && (
                      <span className="font-bold text-gray-700">:</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 -mt-10 space-y-4 px-5">
            <div className="relative overflow-hidden rounded-t-3xl rounded-bl-2xl rounded-br-[5rem] bg-gray-100">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Gardener's Jacket"
                className="h-72 w-full object-cover"
              />

              <button
                type="button"
                className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/70 transition hover:bg-white"
              >
                <Heart className="size-4 text-gray-700" />
              </button>

              <span className="absolute right-3 top-3 rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium text-gray-700">
                1 / 10
              </span>
            </div>

            <div className="space-y-3 pb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f5e9] px-3 py-1 text-xs font-medium text-green-700">
                <Leaf className="size-3.5" />
                Carbon Neutral
              </span>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {"Gardener's Jacket"}
              </h2>

              <hr className="border-dashed border-gray-300" />

              <div className="flex items-end justify-between pt-1">
                <div>
                  <span className="text-sm text-gray-400 line-through">
                    $300.00
                  </span>
                  <p className="text-2xl font-bold text-gray-900">$245.00</p>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  <ShoppingCart className="size-4" />
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
