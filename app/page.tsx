"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Lock, Eye, EyeOff, Shield } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type LoginStep =
  | "login"
  | "mfa"
  | "change-password"
  | "forgot-password"
  | "register";

const heroItems = [
  {
    src: "/images/hero-login.jpg",
    preTitle: "Necurity Solution's",
    mainTitle: "Next-Gen CyberSuite",
    subLines: ["for an Ever-Evolving", "Threat Landscape."],
  },
  {
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop",
    preTitle: "Protecting Organizations",
    mainTitle: "Advanced Threat Detection",
    subLines: ["Real-time insights", "and automated response."],
  },
  {
    src: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1600&auto=format&fit=crop",
    preTitle: "Secure Your Future",
    mainTitle: "AI-driven Security",
    subLines: ["Predict, Prevent,", "and Protect."],
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    preTitle: "Enterprise Ready",
    mainTitle: "Scalable Cyber Defense",
    subLines: ["Cloud-native architecture", "for modern workloads."],
  },
];

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<LoginStep>("login");

  const [ssoOpen, setSsoOpen] = useState(false);
  const [ssoEmail, setSsoEmail] = useState("");
  const [ssoPassword, setSsoPassword] = useState("");
  const [showSsoPassword, setShowSsoPassword] = useState(false);
  const [ssoError, setSsoError] = useState("");

  const [mfaPin, setMfaPin] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");
  const [registerName, setRegisterName] = useState("");

  const [error, setError] = useState("");

  // start with null — we'll pick a random index after hydration
  const [imageIndex, setImageIndex] = useState<number | null>(null);

  // preload all images (optional, helps reduce perceived load time)
  useEffect(() => {
    if (typeof window === "undefined") return;
    heroItems.forEach((item) => {
      const img = new window.Image();
      img.src = item.src;
    });
  }, []);

  // choose the random image after hydration to avoid SSR/client mismatch flicker
  useEffect(() => {
    const idx = Math.floor(Math.random() * heroItems.length);
    setImageIndex(idx);
  }, []);

  // keep the rest of your auth redirect logic intact
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");

    if (isLoggedIn === "true") {
      if (userRole === "client") {
        router.push("/client");
      } else if (userRole === "manager") {
        router.push("/manager");
      } else if (userRole === "tester") {
        router.push("/tester");
      } else {
        router.push("/admin");
      }
    }
  }, [router, mounted]);

  const handleClientLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    const isFirstTime = localStorage.getItem(`firstLogin_${email}`) !== "false";

    if (isFirstTime) {
      localStorage.setItem("pendingClientEmail", email);
      setStep("change-password");
    } else {
      localStorage.setItem("pendingClientEmail", email);
      setStep("mfa");
    }
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaPin.length !== 6) {
      setError("Please enter the 6-digit PIN");
      return;
    }

    if (mfaPin === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "client");
      router.push("/client");
    } else {
      setError("Invalid PIN. Try 123456 for demo");
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const pendingEmail = localStorage.getItem("pendingClientEmail");
    if (pendingEmail) {
      localStorage.setItem(`firstLogin_${pendingEmail}`, "false");
    }

    setStep("mfa");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSsoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSsoError("");

    if (!ssoEmail || !ssoPassword) {
      setSsoError("Please enter email and password");
      return;
    }

    let role = "";
    if (ssoEmail.toLowerCase() === "admin@admin.com") {
      role = "admin";
    } else if (ssoEmail.toLowerCase() === "manager@manager.com") {
      role = "manager";
    } else if (ssoEmail.toLowerCase() === "tester@tester.com") {
      role = "tester";
    } else {
      setSsoError(
        "Invalid SSO credentials. Use admin@admin.com, manager@manager.com, or tester@tester.com",
      );
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);
    setSsoOpen(false);

    if (role === "admin") {
      router.push("/admin");
    } else if (role === "manager") {
      router.push("/manager");
    } else if (role === "tester") {
      router.push("/tester");
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail) {
      setForgotSent(true);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!registerName || !registerEmail || !registerPassword) {
      setError("Please fill all fields");
      return;
    }

    if (registerPassword !== registerConfirm) {
      setError("Passwords do not match");
      return;
    }

    if (registerPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    localStorage.setItem(`firstLogin_${registerEmail}`, "false");
    setStep("login");
    setEmail(registerEmail);
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterConfirm("");
    setRegisterName("");
  };

  const renderRightPanel = () => {
    switch (step) {
      case "mfa":
        return (
          <div className="w-full max-w-sm mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#0092b8] rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#0092b8] text-center mb-2">
              Verify Your Identity
            </h1>
            <p className="text-gray-500 text-center text-sm mb-8">
              Enter the 6-digit PIN sent to your device
            </p>

            <form onSubmit={handleMfaSubmit} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={mfaPin}
                  onChange={(value) => setMfaPin(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-[#0092b8] hover:bg-[#007a9e] text-white py-3"
              >
                Verify PIN
              </Button>

              <p className="text-center text-sm text-gray-500">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  className="text-[#0092b8] hover:underline"
                >
                  Resend
                </button>
              </p>
            </form>

            <button
              type="button"
              onClick={() => {
                setStep("login");
                setMfaPin("");
                setError("");
              }}
              className="mt-6 text-sm text-gray-500 hover:text-gray-700 w-full text-center"
            >
              Back to Login
            </button>
          </div>
        );

      case "change-password":
        return (
          <div className="w-full max-w-sm mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#0092b8] rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#0092b8] text-center mb-2">
              Change Password
            </h1>
            <p className="text-gray-500 text-center text-sm mb-8">
              First time login. Please set a new password.
            </p>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10 border-gray-300"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10 border-gray-300"
                  autoComplete="new-password"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-[#0092b8] hover:bg-[#007a9e] text-white py-3"
              >
                Change Password
              </Button>
            </form>

            <button
              type="button"
              onClick={() => {
                setStep("login");
                setError("");
              }}
              className="mt-6 text-sm text-gray-500 hover:text-gray-700 w-full text-center"
            >
              Back to Login
            </button>
          </div>
        );

      case "forgot-password":
        return (
          <div className="w-full max-w-sm mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#0092b8] rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#0092b8] text-center mb-2">
              Forgot Password
            </h1>
            <p className="text-gray-500 text-center text-sm mb-8">
              {forgotSent
                ? "Password reset link has been sent to your email."
                : "Enter your email to receive a password reset link."}
            </p>

            {!forgotSent ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="border-gray-300"
                  autoComplete="email"
                />

                <Button
                  type="submit"
                  className="w-full bg-[#0092b8] hover:bg-[#007a9e] text-white py-3"
                >
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <Button
                onClick={() => {
                  setStep("login");
                  setForgotSent(false);
                  setForgotEmail("");
                }}
                className="w-full bg-[#0092b8] hover:bg-[#007a9e] text-white py-3"
              >
                Back to Login
              </Button>
            )}

            {!forgotSent && (
              <button
                type="button"
                onClick={() => {
                  setStep("login");
                  setForgotEmail("");
                }}
                className="mt-6 text-sm text-gray-500 hover:text-gray-700 w-full text-center"
              >
                Back to Login
              </button>
            )}
          </div>
        );

      case "register":
        return (
          <div className="w-full max-w-sm mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#0092b8] rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#0092b8] text-center mb-2">
              Register
            </h1>
            <p className="text-gray-500 text-center text-sm mb-8">
              Create a new client account
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className="border-gray-300"
                autoComplete="name"
              />

              <Input
                type="email"
                placeholder="Email Address"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="border-gray-300"
                autoComplete="email"
              />

              <Input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="border-gray-300"
                autoComplete="new-password"
              />

              <Input
                type="password"
                placeholder="Confirm Password"
                value={registerConfirm}
                onChange={(e) => setRegisterConfirm(e.target.value)}
                className="border-gray-300"
                autoComplete="new-password"
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-[#0092b8] hover:bg-[#007a9e] text-white py-3"
              >
                Register
              </Button>
            </form>

            <button
              type="button"
              onClick={() => {
                setStep("login");
                setError("");
              }}
              className="mt-6 text-sm text-gray-500 hover:text-gray-700 w-full text-center"
            >
              Already have an account? Login
            </button>
          </div>
        );
      default:
        return (
          <div className="w-full max-w-sm mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logo.png"
                  alt="Necurity Logo"
                  width={150}
                  height={25}
                />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-[#0092b8] text-center mb-2">
              Login
            </h1>
            <p className="text-gray-500 text-center text-sm mb-8">
              Enter your email and password below
            </p>

            <form onSubmit={handleClientLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="yourname@necurity.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300"
                autoComplete="email"
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 border-gray-300"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-[#0092b8] hover:bg-[#007a9e] text-white py-3"
              >
                Submit
              </Button>
            </form>
            <div className="mt-2 flex justify-between text-sm">
              <button
                type="button"
                onClick={() => setStep("forgot-password")}
                className="text-[#0092b8] hover:underline"
              >
                Forgot Password?
              </button>
              <button
                type="button"
                onClick={() => setStep("register")}
                className="text-[#0092b8] hover:underline"
              >
                Register as Client
              </button>
            </div>

            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <Button
              type="button"
              onClick={() => setSsoOpen(true)}
              className="w-full bg-[#9bc53d] hover:bg-[#8ab535] text-white py-3"
            >
              Login with Necurity ID
            </Button>
          </div>
        );
    }
  };

  // resolve hero only when imageIndex is set
  const hero = imageIndex !== null ? heroItems[imageIndex] : null;

  return (
    <div className="h-screen w-screen flex items-stretch relative overflow-hidden">
      {/* Left hero area (desktop) - container always present to avoid layout shift */}
      <div className="hidden lg:flex w-[60%] h-full items-center justify-center relative">
        {/* Masked rectangular box */}
        <div className="m-8 w-[92%] h-[92%] bg-white rounded-2xl overflow-hidden relative shadow-md border border-gray-200">
          {/* Render the actual image and text only when hero is available */}
          {hero ? (
            <>
              <Image
                src={hero.src}
                alt={hero.mainTitle}
                fill
                sizes="60vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0092b8]/78 via-[#0092b8]/50 to-[#9bc53d]/32" />
              <div className="absolute bottom-50 left-8 right-8 text-white z-10">
                {hero.preTitle && (
                  <p className="text-lg font-light">{hero.preTitle}</p>
                )}
                {hero.mainTitle && (
                  <h1 className="text-4xl font-bold mt-2">{hero.mainTitle}</h1>
                )}
                {hero.subLines?.map((line, idx) => (
                  <p className="text-xl font-light mt-2" key={idx}>
                    {line}
                  </p>
                ))}
              </div>
            </>
          ) : (
            // optional: a tiny neutral background while the random choice is being made
            <div className="w-full h-full bg-gray-50" />
          )}
        </div>
      </div>

      {/* Right panel (forms) */}
      <div className="w-full lg:w-[40%] h-full flex items-center justify-center p-8 bg-white">
        {renderRightPanel()}
      </div>

      <Dialog open={ssoOpen} onOpenChange={setSsoOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-[#0092b8]">
              SSO Login
            </DialogTitle>
            <DialogDescription className="text-center">
              Login for Admin, Manager, or Tester roles
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSsoLogin} className="space-y-4 mt-4">
            <Input
              type="email"
              placeholder="Email (e.g., admin@admin.com)"
              value={ssoEmail}
              onChange={(e) => setSsoEmail(e.target.value)}
              className="border-gray-300"
              autoComplete="email"
            />

            <div className="relative">
              <Input
                type={showSsoPassword ? "text" : "password"}
                placeholder="Password"
                value={ssoPassword}
                onChange={(e) => setSsoPassword(e.target.value)}
                className="pr-10 border-gray-300"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowSsoPassword(!showSsoPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showSsoPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {ssoError && <p className="text-red-500 text-sm">{ssoError}</p>}

            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
              <p className="font-medium mb-1">Demo Credentials:</p>
              <p>admin@admin.com - Admin role</p>
              <p>manager@manager.com - Manager role</p>
              <p>tester@tester.com - Tester role</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0092b8] hover:bg-[#007a9e] text-white"
            >
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
