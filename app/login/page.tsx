"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogIn, Shield, User, Building2, KeyRound, ArrowLeft, Users, TestTube2 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type LoginMode = "internal" | "client"
type InternalRole = "admin" | "manager" | "tester"
type AuthStep = "credentials" | "mfa"

export default function LoginPage() {
  const router = useRouter()
  const [loginMode, setLoginMode] = useState<LoginMode>("internal")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authStep, setAuthStep] = useState<AuthStep>("credentials")
  const [otpCode, setOtpCode] = useState("")

  const handleClientCredentials = () => {
    if (email && password) {
      setAuthStep("mfa")
    }
  }

  const handleClientMfaVerify = () => {
    if (otpCode.length === 6) {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userRole", "client")
      router.push("/client")
    }
  }

  const handleBackToCredentials = () => {
    setAuthStep("credentials")
    setOtpCode("")
  }

  const quotes = [
    {
      text: "Security is not a product, but a process.",
      author: "— Bruce Schneier",
    },
    {
      text: "The quieter you become, the more you are able to hear (threats).",
      author: "— Ram Dass (adapted)",
    },
    {
      text: "Trust, but verify — and log everything.",
      author: "— Security Maxim",
    },
    {
      text: "An ounce of prevention is worth a terabyte of cure.",
      author: "— Ops Wisdom",
    },
  ]

  const images = [
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554475901-4538ddfbccc8?q=80&w=1600&auto=format&fit=crop",
  ]

  const [index, setIndex] = useState(() => Math.floor(Math.random() * 4))

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % Math.max(quotes.length, images.length))
    }, 4000)
    return () => clearInterval(id)
  }, [quotes.length, images.length])

  const handleSsoLogin = (role: InternalRole) => {
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userRole", role)
    
    switch (role) {
      case "admin":
        router.push("/admin")
        break
      case "manager":
        router.push("/manager")
        break
      case "tester":
        router.push("/tester")
        break
    }
  }

  const renderInternalLogin = () => (
    <div className="space-y-4">
      <div className="text-center pb-2">
        <div className="w-16 h-16 mx-auto rounded-full bg-teal-100 flex items-center justify-center mb-3">
          <KeyRound className="h-8 w-8 text-teal-600" />
        </div>
        <h3 className="font-semibold text-gray-900">Internal Staff Login</h3>
        <p className="text-sm text-gray-600 mt-1">Select your role to sign in via SSO</p>
      </div>

      <div className="space-y-2">
        <Button
          onClick={() => handleSsoLogin("admin")}
          className="w-full justify-start gap-3 h-14 bg-white hover:bg-teal-50 border border-gray-200 hover:border-teal-300 text-gray-900"
          variant="outline"
        >
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
            <Shield className="h-5 w-5 text-teal-600" />
          </div>
          <div className="text-left">
            <div className="font-medium">Administrator</div>
            <div className="text-xs text-gray-500">Full system access</div>
          </div>
        </Button>

        <Button
          onClick={() => handleSsoLogin("manager")}
          className="w-full justify-start gap-3 h-14 bg-white hover:bg-teal-50 border border-gray-200 hover:border-teal-300 text-gray-900"
          variant="outline"
        >
          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
            <Users className="h-5 w-5 text-cyan-600" />
          </div>
          <div className="text-left">
            <div className="font-medium">Manager</div>
            <div className="text-xs text-gray-500">Team & workflow oversight</div>
          </div>
        </Button>

        <Button
          onClick={() => handleSsoLogin("tester")}
          className="w-full justify-start gap-3 h-14 bg-white hover:bg-teal-50 border border-gray-200 hover:border-teal-300 text-gray-900"
          variant="outline"
        >
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <TestTube2 className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="text-left">
            <div className="font-medium">Tester</div>
            <div className="text-xs text-gray-500">Security testing & findings</div>
          </div>
        </Button>
      </div>

      <p className="text-xs text-center text-gray-500 pt-2">
        Authenticated via corporate Single Sign-On
      </p>
    </div>
  )

  const renderClientLogin = () => {
    if (authStep === "credentials") {
      return (
        <div className="space-y-4">
          <div className="text-center pb-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Client Portal Access</p>
          </div>

          <div className="space-y-3">
            <Input 
              placeholder="Email" 
              type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <Input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <Button 
            onClick={handleClientCredentials} 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white" 
            size="lg"
            disabled={!email || !password}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Continue
          </Button>

          <p className="text-xs text-center text-gray-500">
            Multi-factor authentication required for client access
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <button 
          onClick={handleBackToCredentials}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="text-center pb-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-3">
            <KeyRound className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
          <p className="text-sm text-gray-600 mt-1">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        <div className="flex justify-center py-4">
          <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button 
          onClick={handleClientMfaVerify} 
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white" 
          size="lg"
          disabled={otpCode.length !== 6}
        >
          Verify & Sign In
        </Button>

        <p className="text-xs text-center text-gray-500">
          Signing in as <span className="font-medium">{email}</span>
        </p>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen flex items-stretch relative overflow-hidden">
      <div className="hidden lg:flex w-[65%] h-full relative items-center justify-center p-10 bg-gradient-to-br from-[#0d9488] via-[#0891b2] to-[#0d9488]">
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,white_0%,transparent_60%)] opacity-15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,white_0%,transparent_60%)] opacity-10 blur-3xl" />

        <div className="relative z-10 w-full max-w-3xl mx-auto text-white space-y-8">
          <div className="relative h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            {images.map((src, i) => (
              <div
                key={src}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  i === (index % images.length) ? "opacity-100" : "opacity-0"
                )}
              >
                <Image
                  src={src}
                  alt="Cybersecurity hero"
                  fill
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              </div>
            ))}
          </div>

          <div className="min-h-[120px] transition-all duration-500 ease-in-out text-center">
            <p className="text-2xl md:text-3xl font-semibold leading-snug">{quotes[index % quotes.length].text}</p>
            <p className="mt-4 text-white/90">{quotes[index % quotes.length].author}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === (index % images.length) ? "w-8 bg-white" : "w-3 bg-white/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[35%] h-full flex items-center justify-center p-6 bg-gradient-to-br from-[#ecfeff] via-white to-[#f0f9ff] dark:from-[#00141a] dark:via-[#001015] dark:to-[#001922]">
        <Card className="w-full max-w-md border border-white/60 shadow-xl bg-white/80 dark:bg-black/40 backdrop-blur-xl">
          <CardHeader className="text-center space-y-2 pb-4">
            <CardTitle className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#0d9488] to-[#0891b2] bg-clip-text text-transparent">360°</CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-300">Security Management Platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={loginMode} onValueChange={(v) => {
              setLoginMode(v as LoginMode)
              setAuthStep("credentials")
              setEmail("")
              setPassword("")
              setOtpCode("")
            }}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="internal" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Internal
                </TabsTrigger>
                <TabsTrigger value="client" className="gap-2">
                  <Building2 className="h-4 w-4" />
                  Client
                </TabsTrigger>
              </TabsList>
              <TabsContent value="internal" className="mt-4">
                {renderInternalLogin()}
              </TabsContent>
              <TabsContent value="client" className="mt-4">
                {renderClientLogin()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
