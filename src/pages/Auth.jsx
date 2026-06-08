import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const { user, login, register, logout } = useAuth();
  const [email, setEmail] = useState("");

  function submit(e) {
    e.preventDefault();
    if (mode === "login") login({ email });
    else register({ email });
  }

  return (
    <section className="mx-auto max-w-md">
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">
            {mode === "login" ? "Sign in" : "Register"}
          </h2>
          <div className="text-sm text-slate-600">
            {mode === "login" ? (
              <Button variant="link" onClick={() => setMode("register")}>
                Create account
              </Button>
            ) : (
              <Button variant="link" onClick={() => setMode("login")}>
                Have an account?
              </Button>
            )}
          </div>
        </div>

        {user ? (
          <div>
            <p className="mb-4">
              Signed in as <strong>{user.email}</strong>
            </p>
            <Button onClick={() => logout()}>Sign out</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <div className="mb-1 text-sm text-slate-600">Email</div>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border px-3 py-2"
                type="email"
              />
            </label>
            <div className="flex justify-end">
              <Button type="submit">
                {mode === "login" ? "Sign in" : "Create account"}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </section>
  );
}
