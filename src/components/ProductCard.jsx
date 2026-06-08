import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductCard({ product }) {
  const { addItem, toggle } = useCart();
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10">
      <div className="aspect-square overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-6 transition duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="gap-3">
        <Badge variant="secondary" className="w-fit capitalize">
          {product.category}
        </Badge>
        <CardTitle className="line-clamp-2 text-base">
          {product.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-slate-950">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-slate-500">
          Rating {product.rating.rate.toFixed(1)}
        </span>
      </CardContent>
      <CardFooter className="border-t-0 bg-transparent pt-0">
        <Button
          className="w-full bg-slate-950 hover:bg-slate-800"
          onClick={() => {
            addItem(product);
            toggle(true);
          }}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
