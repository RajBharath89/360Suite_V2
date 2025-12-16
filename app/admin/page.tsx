"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import DashboardPage from "@/components/admin/dashboard"
import ClientManagement from "@/components/admin/client-management"
import UserManagement from "@/components/admin/user-management"
import LicenseManagement from "@/components/admin/license-management"
import ServicesManagement from "@/components/admin/services-management"
import AdminFindings from "@/components/admin/admin-findings"
import AdminSupportTickets from "@/components/admin/admin-support-tickets"
import AdminNewsManagement from "@/components/admin/admin-news-management"
import AddLicensePage from "@/components/admin/add-license-page"
import AddServicePage from "@/components/admin/add-service-page"
import AddClientPage from "@/components/admin/add-client-page"
import AddUserPage from "@/components/admin/add-user-page"
import AddTicketPage from "@/components/client/add-ticket-page"
import AdminProfile from "@/components/admin/admin-profile"

export default function AdminPage() {
  const router = useRouter()
  const [activePage, setActivePage] = useState("dashboard")
  const [pageData, setPageData] = useState<any>(null)

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const handleNavigate = (page: string, data?: any) => {
    setPageData(data || null)
    setActivePage(page)
  }

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />
      case "clients":
        return <ClientManagement onNavigate={handleNavigate} />
      case "users":
        return <UserManagement onNavigate={handleNavigate} />
      case "licenses":
        return <LicenseManagement onNavigate={handleNavigate} />
      case "services":
        return <ServicesManagement onNavigate={handleNavigate} />
      case "findings":
        return <AdminFindings onNavigate={handleNavigate} />
      case "support-tickets":
        return <AdminSupportTickets onNavigate={handleNavigate} />
      case "news-management":
        return <AdminNewsManagement />
      case "profile":
        return <AdminProfile onBack={() => setActivePage("dashboard")} />
      case "add-license":
        return (
          <AddLicensePage 
            onBack={() => setActivePage("licenses")}
            onSave={(data) => {
              setActivePage("licenses")
            }}
            editingLicense={pageData?.license}
            isEditMode={pageData?.isEditMode}
            isViewMode={pageData?.isViewMode}
          />
        )
      case "add-service":
        return (
          <AddServicePage 
            onBack={() => setActivePage("services")}
            onSave={(data) => {
              setActivePage("services")
            }}
            editingService={pageData?.service}
            isEditMode={pageData?.isEditMode}
            isViewMode={pageData?.isViewMode}
          />
        )
      case "add-client":
        return (
          <AddClientPage 
            onBack={() => setActivePage("clients")}
            onSave={(data) => {
              setActivePage("clients")
            }}
            editingClient={pageData?.client}
            isEditMode={pageData?.isEditMode}
            isViewMode={pageData?.isViewMode}
          />
        )
      case "add-user":
        return (
          <AddUserPage 
            onBack={() => setActivePage("users")}
            onSave={(data) => {
              setActivePage("users")
            }}
            editingUser={pageData?.user}
            isEditMode={pageData?.isEditMode}
            isViewMode={pageData?.isViewMode}
          />
        )
      case "add-ticket":
        return (
          <AddTicketPage 
            onBack={() => setActivePage("support-tickets")}
            onSave={(data) => {
              setActivePage("support-tickets")
            }}
            defaultClient="Admin"
            availableServices={["Penetration Testing", "Vulnerability Assessment", "Security Audit", "Compliance Review"]}
            editingTicket={pageData?.ticket}
            isEditMode={pageData?.isEditMode}
            isViewMode={pageData?.isViewMode}
          />
        )
      default:
        return <DashboardPage />
    }
  }

  return (
    <DashboardLayout activePage={activePage} onPageChange={setActivePage} onLogout={handleLogout}>
      {renderPage()}
    </DashboardLayout>
  )
}
