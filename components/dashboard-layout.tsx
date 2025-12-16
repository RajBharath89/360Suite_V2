"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Users,
  FileText,
  LogOut,
  Bell,
  LayoutDashboard,
  Menu,
  X,
  Workflow,
  BookOpen,
  LifeBuoy,
  Newspaper,
  Lock,
  MessageCircle,
  Star,
  User,
  Settings,
  ChevronRight,
} from "lucide-react"

const navigationItems = [
  { name: "Dashboard", href: "/", id: "dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", id: "clients", icon: Users },
  { name: "Users", href: "/users", id: "users", icon: Users },
  { name: "Licenses", href: "/licenses", id: "licenses", icon: FileText },
  { name: "Services", href: "/services", id: "services", icon: BookOpen },
  { name: "Findings", href: "/findings", id: "findings", icon: FileText },
  { name: "Support Tickets", href: "/support-tickets", id: "support-tickets", icon: LifeBuoy },
  { name: "News Management", href: "/news-management", id: "news-management", icon: Newspaper },
]

const getParentPage = (pageId: string): string => {
  const pageMapping: Record<string, string> = {
    "add-client": "clients",
    "edit-client": "clients",
    "view-client": "clients",
    "add-user": "users",
    "edit-user": "users",
    "view-user": "users",
    "add-license": "licenses",
    "edit-license": "licenses",
    "view-license": "licenses",
    "add-service": "services",
    "edit-service": "services",
    "view-service": "services",
    "add-ticket": "support-tickets",
    "edit-ticket": "support-tickets",
    "view-ticket": "support-tickets",
    "profile": "dashboard",
  }
  return pageMapping[pageId] || pageId
}

const notifications = [
  { id: 1, title: "New client registered", message: "Tech Corp has completed registration", time: "2 hours ago", read: false },
  { id: 2, title: "Workflow update", message: "Network audit stage completed", time: "5 hours ago", read: false },
  { id: 3, title: "License renewal", message: "Client license expires in 30 days", time: "1 day ago", read: true },
  { id: 4, title: "Report generated", message: "Monthly report is ready", time: "2 days ago", read: true },
]

interface DashboardLayoutProps {
  children: React.ReactNode
  activePage?: string
  onPageChange?: (pageId: string) => void
  onLogout?: () => void
  userRole?: string
}

export function DashboardLayout({
  children,
  activePage = "dashboard",
  onPageChange,
  onLogout,
  userRole = "Admin",
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNavClick = (pageId: string) => {
    onPageChange?.(pageId)
    setSidebarOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    sessionStorage.clear()
    onLogout?.()
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-gray-50">
        <header className="w-full flex items-center justify-between px-6 py-3 bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white shadow-md">
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="lg:hidden text-white hover:bg-white/20" 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{sidebarOpen ? 'Close menu' : 'Open menu'}</p>
              </TooltipContent>
            </Tooltip>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm tracking-wide">NECURITY</div>
                <div className="text-[9px] text-white/70 -mt-0.5">SOLUTIONS</div>
              </div>
            </div>
            <div className="h-6 w-px bg-white/30 mx-2" />
            <span className="text-sm font-medium text-white">{userRole} Dashboard</span>
          </div>

          <div className="flex items-center gap-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  onClick={() => onPageChange?.("support-tickets")}
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Support tickets</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
                  <Star className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rate application</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <button className="relative p-2 rounded-full hover:bg-white/20 transition-colors">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View notifications</p>
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  <span className="text-xs text-cyan-600 cursor-pointer hover:underline">Mark all read</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.slice(0, 4).map((notif) => (
                  <DropdownMenuItem key={notif.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                    <div className="flex items-center gap-2 w-full">
                      {!notif.read && <div className="w-2 h-2 rounded-full bg-cyan-500" />}
                      <span className="font-medium text-sm">{notif.title}</span>
                    </div>
                    <span className="text-xs text-gray-500 pl-4">{notif.message}</span>
                    <span className="text-xs text-gray-400 pl-4">{notif.time}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-cyan-600 font-medium cursor-pointer">
                  View All Notifications
                  <ChevronRight className="h-4 w-4 ml-1" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <button className="w-9 h-9 rounded-full bg-white text-cyan-600 flex items-center justify-center text-sm font-bold hover:ring-2 hover:ring-white/50 transition-all">
                      {userRole.charAt(0).toUpperCase()}
                    </button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Account menu</p>
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{userRole} User</span>
                    <span className="text-xs text-gray-500 font-normal">{userRole.toLowerCase()}@necurity.com</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => onPageChange?.("profile")}>
                  <User className="h-4 w-4 mr-2" />
                  Profile & Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <aside
            className={cn(
              "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out shadow-sm",
              sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}
          >
            <nav className="flex flex-col p-4 space-y-1 mt-2">
              {navigationItems.map((item) => (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 h-11 text-gray-600 hover:bg-cyan-50 hover:text-cyan-700 rounded-lg transition-all",
                        getParentPage(activePage) === item.id && "bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white font-medium shadow-sm hover:from-[#0a7c71] hover:to-[#0784a0] hover:text-white"
                      )}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Go to {item.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </nav>
          </aside>

          <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  )
}
