"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LogOut,
  Bell,
  Star,
  LayoutDashboard,
  Menu,
  X,
  Workflow,
  LifeBuoy,
  Lock,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navigationItems = [
  { name: "Dashboard", id: "dashboard", icon: LayoutDashboard },
  { name: "Services", id: "services", icon: Workflow },
  { name: "Findings", id: "findings", icon: LifeBuoy },
  { name: "Support Tickets", id: "support-tickets", icon: LifeBuoy },
]

const getParentPage = (pageId: string): string => {
  const pageMapping: Record<string, string> = {
    "add-ticket": "support-tickets",
    "edit-ticket": "support-tickets",
    "view-ticket": "support-tickets",
    "view-findings": "findings",
    "view-service": "services",
    "profile": "dashboard",
  }
  return pageMapping[pageId] || pageId
}

interface ClientLayoutProps {
  children: React.ReactNode
  activePage?: string
  onPageChange?: (pageId: string) => void
  onLogout?: () => void
}

export function ClientLayout({
  children,
  activePage = "dashboard",
  onPageChange,
  onLogout,
}: ClientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNavClick = (pageId: string) => {
    onPageChange?.(pageId)
    setSidebarOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userRole")
    sessionStorage.clear()
    onLogout?.()
  }

  return (
    <TooltipProvider>
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="w-full flex items-center justify-between px-4 py-2 bg-white border-b shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center">
              <Lock className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-cyan-600 font-bold text-sm">NECURITY</div>
              <div className="text-[10px] text-gray-400 -mt-1">A CYBER SECURITY COMPANY</div>
            </div>
          </div>
          <div className="hidden sm:block h-6 w-px bg-gray-200 mx-2" />
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="hidden sm:block text-sm font-medium text-gray-700 cursor-default">
                Pon Pure Chemicals India Pvt...
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Pon Pure Chemicals India Pvt Ltd</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <Star className="h-5 w-5 text-gray-400 hover:text-amber-500" />
          </div>
          
          <div className="relative cursor-pointer">
            <Bell className="h-5 w-5 text-gray-400 hover:text-cyan-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">4</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center text-sm font-medium">
              TC
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={cn(
            "fixed lg:static inset-y-0 left-0 z-40 w-56 bg-white border-r transform transition-transform duration-200 ease-in-out pt-4 lg:pt-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            "lg:mt-0 mt-14"
          )}
        >
          <nav className="flex flex-col p-3 space-y-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-10 text-sm",
                  getParentPage(activePage) === item.id 
                    ? "bg-cyan-600 text-white hover:bg-cyan-700 hover:text-white" 
                    : "text-gray-600 hover:bg-cyan-50 hover:text-cyan-700"
                )}
                onClick={() => handleNavClick(item.id)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
    </TooltipProvider>
  )
}
