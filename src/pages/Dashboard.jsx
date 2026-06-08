import { User, Package, MapPin, CreditCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-2">
          <h2 className="mb-4 text-lg font-medium flex items-center gap-2">
            <User className="size-5" />
            Profile Information
          </h2>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-slate-500">Name</span>
              <p className="font-medium">{user.fullName || "N/A"}</p>
            </div>
            <div>
              <span className="text-sm text-slate-500">Email</span>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <span className="text-sm text-slate-500">Phone</span>
              <p className="font-medium">{user.phone || "N/A"}</p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-sm font-medium flex items-center gap-2 text-slate-700">
              <Package className="size-4" />
              Orders
            </h3>
            <p className="mt-2 text-2xl font-semibold">0</p>
            <p className="text-xs text-slate-500">No orders yet</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium flex items-center gap-2 text-slate-700">
              <MapPin className="size-4" />
              Addresses
            </h3>
            <p className="mt-2 text-2xl font-semibold">0</p>
            <p className="text-xs text-slate-500">No addresses saved</p>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-medium flex items-center gap-2">
            <CreditCard className="size-5" />
            Recent Orders
          </h2>
          <p className="text-sm text-slate-500">
            You haven't placed any orders yet.
          </p>
          <Button className="mt-4" onClick={() => navigate("/products")}>
            Start Shopping
          </Button>
        </Card>
      </div>
    </section>
  );
}
