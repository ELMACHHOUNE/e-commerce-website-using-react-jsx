import { useState } from "react";
import { Globe, Eye, EyeOff, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function Auth() {
  const { user, login, register, logout, error, clearError } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (mode === "login") {
      login({ email, password });
    } else {
      if (password !== confirmPassword) {
        clearError();
        alert("Passwords do not match.");
        return;
      }
      register({ email, password, fullName, phone });
    }
  }

  function switchMode() {
    setMode(mode === "login" ? "register" : "login");
    clearError();
  }

  const isLogin = mode === "login";
  const heroImage = isLogin ? "/images/login.png" : "/images/signup.png";

  return (
    <div className="h-screen bg-slate-50 p-6">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-center">
        <div className="grid h-full w-full grid-cols-1 md:grid-cols-2 gap-6 max-h-[calc(100vh-3rem)]">
          {/* Left visual column - hidden on mobile */}
          <div className="hidden md:block rounded-3xl overflow-hidden bg-slate-900 text-white relative h-full min-h-0">
            <img
              src={heroImage}
              alt={isLogin ? "Login" : "Sign Up"}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 " />
            <div className="relative z-10 flex h-full flex-col justify-between p-10">
              <div>
                <div className="text-xs tracking-widest text-white/90">
                  A WISE QUOTE
                </div>
                <div className="mt-2 h-[1px] w-12 bg-white/60" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen" />
          </div>

          {/* Right column - auth form centered */}
          <div className="flex items-center justify-center h-full min-h-0 py-4">
            <Card className="w-full max-w-md p-8 max-h-full overflow-y-auto">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2">
                  <Globe className="size-6 text-slate-900" />
                  <span className="text-lg font-semibold">MSc</span>
                </div>
                <h1 className="mt-6 font-serif text-3xl">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  {isLogin
                    ? "Enter your email and password to access your account"
                    : "Enter your details to create an account"}
                </p>
              </div>

              {user ? (
                <div className="mt-6 text-center">
                  <p className="mb-4">
                    Signed in as <strong>{user.email}</strong>
                  </p>
                  <Button onClick={() => logout()}>Sign out</Button>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-6 space-y-4">
                  {error && (
                    <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  {!isLogin && (
                    <>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Enter your full name"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                          <input
                            type="tel"
                            placeholder="Enter your phone number"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                  <div className="relative">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm pr-10 outline-none focus:ring-2 focus:ring-slate-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2 top-9 inline-flex items-center rounded px-2 text-slate-500"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm your password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                      />
                    </div>
                  )}

                  {isLogin && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                          className="h-4 w-4 rounded border-slate-200 text-slate-900"
                        />
                        <span className="text-slate-600">Remember me</span>
                      </label>

                      <a
                        className="text-sm text-slate-500 hover:underline"
                        href="#"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Button
                      type="submit"
                      className="w-full bg-slate-900 text-white hover:bg-slate-800"
                    >
                      {isLogin ? "Sign In" : "Sign Up"}
                    </Button>
                    {isLogin && (
                      <Button variant="outline" className="w-full">
                        Sign In with Google
                      </Button>
                    )}
                  </div>
                </form>
              )}

              <div className="mt-6 text-center text-sm text-slate-600">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={switchMode}
                  className="font-medium text-slate-900"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
