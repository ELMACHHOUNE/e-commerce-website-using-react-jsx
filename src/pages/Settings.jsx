import { useState } from "react";
import { User, Bell, Shield, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/file-upload";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user, updateProfile, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  if (!user) {
    navigate("/auth");
    return null;
  }

  function handleSave(e) {
    e.preventDefault();
    clearError();
    const ok = updateProfile({ fullName, phone, avatar });
    if (ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Settings</h1>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-medium flex items-center gap-2">
            <User className="size-5" />
            Profile Picture
          </h2>
          <FileUpload value={avatar} onChange={setAvatar} className="max-w-xs" />
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-medium flex items-center gap-2">
            <User className="size-5" />
            Account
          </h2>
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          {saved && (
            <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
              Profile updated successfully.
            </div>
          )}
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500 outline-none cursor-not-allowed"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="bg-slate-900 text-white hover:bg-slate-800"
            >
              <Save className="mr-2 size-4" />
              Save Changes
            </Button>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-medium flex items-center gap-2">
            <Bell className="size-5" />
            Notifications
          </h2>
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="h-4 w-4 rounded border-slate-200 text-slate-900"
            />
            <span className="text-sm text-slate-700">
              Receive email notifications about orders and promotions
            </span>
          </label>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-medium flex items-center gap-2">
            <Shield className="size-5" />
            Password
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
            <Button className="bg-slate-900 text-white hover:bg-slate-800">
              <Save className="mr-2 size-4" />
              Update Password
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
