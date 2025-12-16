"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ClientDashboard from "@/components/client/client-dashboard"
import ClientServices from "@/components/client/client-services"
import ClientFindings from "@/components/client/client-findings"
import ClientSupportTickets from "@/components/client/client-support-tickets"
import ClientServiceDetail from "@/components/client/client-service-detail"
import ClientScopeDetail from "@/components/client/client-scope-detail"
import ClientLicenses from "@/components/client/client-licenses"
import ClientNotifications from "@/components/client/client-notifications"
import ClientProfile from "@/components/client/client-profile"
import ClientHeader from "@/components/client/client-header"
import AddTicketPage from "@/components/client/add-ticket-page"

export default function ClientPage() {
  const router = useRouter()
  const [activePage, setActivePage] = useState("dashboard")
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedScope, setSelectedScope] = useState<string | null>(null)
  const [pageData, setPageData] = useState<any>(null)

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName)
    setPageData({ service: serviceName })
    setActivePage("service-findings")
  }

  const handleScopeClick = (serviceName: string, scopeName: string) => {
    setSelectedService(serviceName)
    setSelectedScope(scopeName)
    setActivePage("scope-detail")
  }

  const handleBackToDashboard = () => {
    setSelectedService(null)
    setSelectedScope(null)
    setActivePage("dashboard")
  }

  const handleBackToService = () => {
    setSelectedScope(null)
    setActivePage("service-detail")
  }

  const handleBackToTickets = () => {
    setPageData(null)
    setActivePage("support-tickets")
  }

  const handleNavigate = (page: string, data?: any) => {
    setPageData(data || null)
    setActivePage(page)
  }

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <ClientDashboard onServiceClick={handleServiceClick} onNavigate={setActivePage} />
      case "services":
        return <ClientServices onBack={handleBackToDashboard} onNavigate={handleNavigate} />
      case "findings":
        return <ClientFindings onBack={handleBackToDashboard} onNavigate={handleNavigate} />
      case "service-findings":
        return <ClientFindings onBack={handleBackToDashboard} onNavigate={handleNavigate} serviceName={selectedService || undefined} />
      case "support-tickets":
        return <ClientSupportTickets onBack={handleBackToDashboard} onNavigate={handleNavigate} />
      case "add-ticket":
        return (
          <AddTicketPage 
            onBack={handleBackToTickets}
            onSave={(data) => {
              handleBackToTickets()
            }}
            defaultClient="ACME Corp"
            availableServices={["Web App Security", "Network Security", "Cloud Security", "Compliance"]}
            editingTicket={pageData?.ticket}
            isEditMode={pageData?.isEditMode}
            isViewMode={pageData?.isViewMode}
          />
        )
      case "service-detail":
        return (
          <ClientServiceDetail 
            serviceName={selectedService || ""} 
            onBack={handleBackToDashboard}
            onScopeClick={(scopeName) => handleScopeClick(selectedService || "", scopeName)}
          />
        )
      case "scope-detail":
        return (
          <ClientScopeDetail 
            serviceName={selectedService || ""} 
            scopeName={selectedScope || ""}
            onBack={handleBackToService}
          />
        )
      case "licenses":
        return <ClientLicenses onBack={handleBackToDashboard} />
      case "notifications":
        return <ClientNotifications onBack={handleBackToDashboard} />
      case "profile":
        return <ClientProfile onBack={handleBackToDashboard} />
      default:
        return <ClientDashboard onServiceClick={handleServiceClick} onNavigate={setActivePage} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ClientHeader 
        onLogout={handleLogout} 
        onNavigate={setActivePage}
      />
      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
    </div>
  )
}
