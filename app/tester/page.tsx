"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TesterLayout } from "@/components/tester-layout"
import TesterDashboard from "@/components/tester/tester-dashboard"
import TesterFindings from "@/components/tester/tester-findings"
import TesterSupportTickets from "@/components/tester/tester-support-tickets"
import TesterAddTicketPage from "@/components/tester/add-ticket-page"
import TesterProfile from "@/components/tester/tester-profile"

const initialTickets = [
  { id: "201", subject: "Bug in Test Environment Setup", category: "request", priority: "high", status: "in_progress", recipient: "Manager", description: "Docker compose failing on CI", updatedAt: "2025-01-16T09:00:00Z", comments: 3 },
  { id: "202", subject: "Clarify Test Scope for Release R12", category: "request", priority: "medium", status: "open", recipient: "Admin", description: "Need scope confirmation for APIs", updatedAt: "2025-01-14T12:00:00Z", comments: 1 },
  { id: "203", subject: "Access Needed to Staging Logs", category: "access", priority: "low", status: "open", recipient: "Both", description: "Grant read-only Grafana access", updatedAt: "2025-01-13T10:00:00Z", comments: 0 },
  { id: "204", subject: "Resolve Flaky E2E Suite", category: "other", priority: "critical", status: "resolved", recipient: "Manager", description: "Investigate intermittent failures", updatedAt: "2025-01-10T08:00:00Z", comments: 5 },
]

export default function TesterPage() {
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
        return <TesterDashboard />
      case "findings":
        return <TesterFindings onNavigate={handleNavigate} />
      case "support-tickets":
        return (
          <TesterSupportTickets 
            onNavigate={handleNavigate} 
            tickets={tickets}
            onTicketsChange={setTickets}
          />
        )
      case "add-ticket":
        return (
          <TesterAddTicketPage
            onBack={handleBackToTickets}
            onSave={handleSaveTicket}
            defaultClient="ACME Corp"
            availableServices={["Web App Security", "Network Security", "Cloud Security", "Compliance"]}
          />
        )
      case "view-ticket":
        return (
          <TesterAddTicketPage
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
          <TesterAddTicketPage
            onBack={handleBackToTickets}
            onSave={handleSaveTicket}
            defaultClient="ACME Corp"
            availableServices={["Web App Security", "Network Security", "Cloud Security", "Compliance"]}
            editingTicket={ticketData}
            isEditMode={true}
          />
        )
      case "profile":
        return <TesterProfile onBack={() => setActivePage("dashboard")} />
      default:
        return <TesterDashboard />
    }
  }

  return (
    <TesterLayout activePage={activePage} onPageChange={setActivePage} onLogout={handleLogout}>
      {renderPage()}
    </TesterLayout>
  )
}
