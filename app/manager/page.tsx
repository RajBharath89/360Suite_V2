"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ManagerLayout } from "@/components/manager-layout"
import ManagerDashboard from "@/components/manager/manager-dashboard"
import ManagerServices from "@/components/manager/manager-services"
import ManagerFindings from "@/components/manager/manager-findings"
import ManagerSupportTickets from "@/components/manager/manager-support-tickets"
import ManagerAddTicketPage from "@/components/manager/add-ticket-page"
import ManagerProfile from "@/components/manager/manager-profile"

const initialTickets = [
  { id: "201", subject: "Escalate: VPN access issues", category: "access", priority: "high", status: "in_progress", recipient: "Admin", description: "Intermittent VPN failures", updatedAt: "2025-01-15T10:00:00Z", comments: 3 },
  { id: "202", subject: "Client onboarding query", category: "request", priority: "medium", status: "open", recipient: "Both", description: "Clarify onboarding checklist", updatedAt: "2025-01-14T12:00:00Z", comments: 1 },
  { id: "203", subject: "Schedule vulnerability scan", category: "request", priority: "low", status: "open", recipient: "Tester", description: "Plan monthly scan", updatedAt: "2025-01-12T08:00:00Z", comments: 2 },
  { id: "204", subject: "License renewal coordination", category: "billing", priority: "critical", status: "resolved", recipient: "Admin", description: "Align renewal dates", updatedAt: "2025-01-10T08:00:00Z", comments: 4 },
]

export default function ManagerPage() {
  const router = useRouter()
  const [activePage, setActivePage] = useState("dashboard")
  const [ticketData, setTicketData] = useState<any>(null)
  const [tickets, setTickets] = useState<any[]>(initialTickets)

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const handleNavigate = (page: string, data?: any) => {
    if (page === "add-ticket" || page === "view-ticket" || page === "edit-ticket") {
      setTicketData(data || null)
      setActivePage(page)
    } else {
      setActivePage(page)
    }
  }

  const handleBackToTickets = () => {
    setTicketData(null)
    setActivePage("support-tickets")
  }

  const handleSaveTicket = (data: any) => {
    if (ticketData) {
      setTickets(prev => prev.map(t => t.id === ticketData.id ? { ...t, ...data } : t))
    } else {
      const newTicket = { id: String(Date.now()), updatedAt: new Date().toISOString(), comments: 0, status: "open", ...data }
      setTickets(prev => [newTicket, ...prev])
    }
    handleBackToTickets()
  }

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <ManagerDashboard />
      case "services":
        return <ManagerServices onNavigate={handleNavigate} />
      case "findings":
        return <ManagerFindings onNavigate={handleNavigate} />
      case "support-tickets":
        return (
          <ManagerSupportTickets 
            onNavigate={handleNavigate} 
            tickets={tickets}
            onTicketsChange={setTickets}
          />
        )
      case "add-ticket":
        return (
          <ManagerAddTicketPage
            onBack={handleBackToTickets}
            onSave={handleSaveTicket}
            defaultClient="ACME Corp"
            availableServices={["Web App Security", "Network Security", "Cloud Security", "Compliance"]}
          />
        )
      case "view-ticket":
        return (
          <ManagerAddTicketPage
            onBack={handleBackToTickets}
            onSave={handleSaveTicket}
            defaultClient="ACME Corp"
            availableServices={["Web App Security", "Network Security", "Cloud Security", "Compliance"]}
            editingTicket={ticketData}
            isViewMode={true}
          />
        )
      case "edit-ticket":
        return (
          <ManagerAddTicketPage
            onBack={handleBackToTickets}
            onSave={handleSaveTicket}
            defaultClient="ACME Corp"
            availableServices={["Web App Security", "Network Security", "Cloud Security", "Compliance"]}
            editingTicket={ticketData}
            isEditMode={true}
          />
        )
      case "profile":
        return <ManagerProfile onBack={() => setActivePage("dashboard")} />
      default:
        return <ManagerDashboard />
    }
  }

  return (
    <ManagerLayout activePage={activePage} onPageChange={setActivePage} onLogout={handleLogout}>
      {renderPage()}
    </ManagerLayout>
  )
}
