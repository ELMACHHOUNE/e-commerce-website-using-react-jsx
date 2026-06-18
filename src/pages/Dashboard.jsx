import { useState } from "react";
import { User, Package, MapPin, CreditCard, Edit3, Save, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/file-upload";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, updateProfile, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const [editName, setEditName] = useState(user?.fullName || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [editAvatar, setEditAvatar] = useState(user?.avatar || null);
  const [saved, setSaved] = useState(false);

  if (!user) {
    navigate("/auth");
    return null;
  }

  function startEdit() {
    setEditName(user.fullName || "");
    setEditPhone(user.phone || "");
    setEditAvatar(user.avatar || null);
    setEditing(true);
    clearError();
    setSaved(false);
  }

  function cancelEdit() {
    setEditing(false);
    clearError();
  }

  function saveEdit() {
    const ok = updateProfile({ fullName: editName, phone: editPhone, avatar: editAvatar });
    if (ok) {
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>

      {saved && (
        <div className="mb-6 rounded-md bg-green-50 p-3 text-sm text-green-700">
          Profile updated successfully.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <User className="size-5" />
              Profile Information
            </h2>
            <div className="flex gap-2">
              {editing ? (
                <>
                  <Button variant="outline" size="sm" onClick={cancelEdit}>
                    <X className="mr-1 size-3" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
                    onClick={saveEdit}
                  >
                    <Save className="mr-1 size-3" />
                    Save
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={startEdit}>
                  <Edit3 className="mr-1 size-3" />
                  Edit
                </Button>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-gray-300">
                  Profile Image
                </label>
                <FileUpload value={editAvatar} onChange={setEditAvatar} className="max-w-60" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200 dark:border-gray-700 dark:bg-gray-950 dark:focus:ring-gray-700"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-gray-300">
                  Phone
                </label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200 dark:border-gray-700 dark:bg-gray-950 dark:focus:ring-gray-700"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500 outline-none cursor-not-allowed dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className="size-16 rounded-full object-cover ring-2 ring-slate-200 dark:ring-gray-700"
                  />
                ) : (
                  <div className="flex size-16 items-center justify-center rounded-full bg-slate-200 text-lg font-semibold text-slate-600 dark:bg-gray-800 dark:text-gray-400">
                    {(user.fullName || user.name || user.email).charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-medium text-lg">{user.fullName || "N/A"}</p>
                  <p className="text-sm text-slate-500 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-gray-800">
                <span className="text-sm text-slate-500 dark:text-gray-400">Phone</span>
                <p className="font-medium">{user.phone || "N/A"}</p>
              </div>
            </div>
          )}
        </Card>

        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-sm font-medium flex items-center gap-2 text-slate-700 dark:text-gray-300">
              <Package className="size-4" />
              Orders
            </h3>
            <p className="mt-2 text-2xl font-semibold">0</p>
            <p className="text-xs text-slate-500 dark:text-gray-400">No orders yet</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium flex items-center gap-2 text-slate-700 dark:text-gray-300">
              <MapPin className="size-4" />
              Addresses
            </h3>
            <p className="mt-2 text-2xl font-semibold">0</p>
            <p className="text-xs text-slate-500 dark:text-gray-400">No addresses saved</p>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-medium flex items-center gap-2">
            <CreditCard className="size-5" />
            Recent Orders
          </h2>
          <p className="text-sm text-slate-500 dark:text-gray-400">
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
