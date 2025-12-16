"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Plus, Upload, Download } from "lucide-react"
import AddServiceDrawer from "./add-service-drawer"
import { SummaryCards } from "./services-management/components/SummaryCards"
import { SearchAndFilters } from "./services-management/components/SearchAndFilters"
import { ServiceTableView } from "./services-management/components/ServiceTableView"
import { ServiceCardView } from "./services-management/components/ServiceCardView"
import { PaginationControls } from "./services-management/components/PaginationControls"
import { AdvancedFilterSheet } from "./services-management/components/AdvancedFilterSheet"
import { DeleteConfirmationDialog } from "./services-management/components/DeleteConfirmationDialog"
import { useServicesManagement } from "./services-management/hooks/useServicesManagement"
import { getStatusBadge, getCategoryBadge } from "./services-management/utils/badgeUtils"

// Mock data with 10 security services as per requirements
const mockServices = [
  {
    id: "1",
    name: "API Security Assessment",
    status: "active",
    category: "Technical",
    description: "Comprehensive security assessment for API endpoints including authentication, authorization, input validation, and data exposure testing",
    hasSampleReport: true,
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "External Attack Surface Monitoring",
    status: "active",
    category: "Technical",
    description: "Continuous monitoring of external-facing assets to identify vulnerabilities, exposed services, and potential attack vectors",
    hasSampleReport: true,
    createdAt: "2024-01-20T09:15:00Z"
  },
  {
    id: "3",
    name: "Cloud Security Assessment",
    status: "active",
    category: "Technical",
    description: "Security evaluation of cloud infrastructure including misconfigurations, access controls, data protection, and compliance",
    hasSampleReport: true,
    createdAt: "2024-02-01T08:45:00Z"
  },
  {
    id: "4",
    name: "Dark Web Monitoring",
    status: "active",
    category: "Technical",
    description: "Monitoring dark web sources for leaked credentials, data breaches, and threat intelligence related to your organization",
    hasSampleReport: true,
    createdAt: "2024-02-10T14:20:00Z"
  },
  {
    id: "5",
    name: "Firewall Review",
    status: "active",
    category: "Technical",
    description: "Analysis of firewall configurations, rule sets, and policies to identify security gaps and optimization opportunities",
    hasSampleReport: true,
    createdAt: "2024-02-15T11:00:00Z"
  },
  {
    id: "6",
    name: "Phishing Simulation",
    status: "active",
    category: "Technical",
    description: "Simulated phishing campaigns to assess employee security awareness and identify training needs",
    hasSampleReport: true,
    createdAt: "2024-02-20T12:00:00Z"
  },
  {
    id: "7",
    name: "Red Team Assessment",
    status: "active",
    category: "Technical",
    description: "Adversarial simulation of real-world attacks to test detection and response capabilities across people, processes, and technology",
    hasSampleReport: true,
    createdAt: "2024-03-01T09:30:00Z"
  },
  {
    id: "8",
    name: "Server Hardening Assessment",
    status: "active",
    category: "Technical",
    description: "Evaluation of server configurations against security best practices and hardening guidelines",
    hasSampleReport: true,
    createdAt: "2024-03-10T10:00:00Z"
  },
  {
    id: "9",
    name: "Security Operation Centre - Monitoring",
    status: "active",
    category: "Management",
    description: "24/7 security monitoring, threat detection, incident response, and security event management services",
    hasSampleReport: false,
    createdAt: "2024-03-15T08:00:00Z"
  },
  {
    id: "10",
    name: "Consulting & Advisory",
    status: "active",
    category: "Management",
    description: "Strategic security consulting, policy development, risk assessments, and compliance advisory services",
    hasSampleReport: false,
    createdAt: "2024-03-20T09:00:00Z"
  }
]

interface ServicesManagementProps {
  onNavigate?: (page: string, data?: any) => void
}

export default function ServicesManagement({ onNavigate }: ServicesManagementProps) {
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"table" | "card">("table")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const [sortBy, setSortBy] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [cardSortBy, setCardSortBy] = useState("name")
  const [cardSortDirection, setCardSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [editingService, setEditingService] = useState<any>(null)
  const [serviceToDelete, setServiceToDelete] = useState<any>(null)
  const [services, setServices] = useState(mockServices)
  const [importFileInput, setImportFileInput] = useState<HTMLInputElement | null>(null)
  
  // Advanced filter states
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false)

  const {
    filteredServices,
    sortedServices,
    paginationData,
    handleTableSort,
    handleCardSort,
    handleAddService,
    handleToggleStatus,
    handleViewService,
    handleCloseViewModal,
    handleEditService,
    handleCloseEditModal,
    handleUpdateService,
    handleDeleteService,
    confirmDeleteService,
    cancelDeleteService,
    handleExportServices,
    handleImportButtonClick,
    handleImportServices,
    summaryStats,
    handleClearAdvancedFilters
  } = useServicesManagement({
    services,
    setServices,
    searchTerm,
    statusFilter,
    categoryFilter,
    sortBy,
    sortDirection,
    cardSortBy,
    cardSortDirection,
    viewMode,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    editingService,
    setEditingService,
    setSelectedService,
    serviceToDelete,
    setServiceToDelete,
    setShowEditModal,
    setShowViewModal,
    setShowDeleteModal,
    setShowAddModal,
    toast
  })

  const handleAddServiceClick = useCallback(() => {
    setEditingService(null)
    setShowAddModal(true)
  }, [])

  const handleSaveService = useCallback((serviceData: any) => {
    if (editingService) {
      handleUpdateService(serviceData)
      toast({
        title: "Service Updated! ✅",
        description: `${serviceData.name} has been successfully updated.`,
        duration: 5000,
      })
    } else {
      handleAddService(serviceData)
      toast({
        title: "Service Added! ✨",
        description: `New service "${serviceData.name}" has been added successfully.`,
        duration: 5000,
      })
    }
  }, [editingService, handleAddService, handleUpdateService, toast])

  const handleCardSortInternal = useCallback((sortOption: string) => {
    const [newSortBy, newDirection] = sortOption.split('-')
    setCardSortBy(newSortBy)
    setCardSortDirection(newDirection as "asc" | "desc")
    setCurrentPage(1)
  }, [])

  const { totalItems, totalPages, startIndex, endIndex, paginatedServices } = paginationData

  const wrappedHandleViewService = (service: any) => {
    if (onNavigate) {
      onNavigate("add-service", { service, isViewMode: true })
    } else {
      handleViewService(service)
    }
  }

  const wrappedHandleEditService = (service: any) => {
    if (onNavigate) {
      onNavigate("add-service", { service, isEditMode: true })
    } else {
      handleEditService(service)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Banner Card */}
      <Card className="h-28 bg-gradient-to-r from-cyan-50 via-teal-50 to-green-50 border-cyan-200 shadow-lg">
        <CardContent className="p-3 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 border-2 border-white shadow-md rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Services Master</h1>
                <p className="text-gray-600 text-sm">Manage and organize all services in your system</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50" onClick={handleImportButtonClick}>
                <Upload className="h-4 w-4 mr-2" />
                Import Service
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50" onClick={handleExportServices}>
                <Download className="h-4 w-4 mr-2" />
                Export Service
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white shadow-md hover:from-[#0a7c71] hover:to-[#0784a0]"
                onClick={() => onNavigate ? onNavigate("add-service") : setShowAddModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hidden file input for import */}
      <input
        type="file"
        accept=".json"
        ref={(input) => setImportFileInput(input)}
        onChange={handleImportServices}
        className="hidden"
        aria-label="Import service data file"
      />

      {/* Summary Cards */}
      <SummaryCards summaryStats={summaryStats} />

      {/* Main Content Card */}
      <Card>
        <CardContent className="px-4 pt-0 pb-0">
          {/* Search and Filter Section */}
          <SearchAndFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
            viewMode={viewMode}
            setViewMode={setViewMode}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            cardSortBy={cardSortBy}
            cardSortDirection={cardSortDirection}
            handleCardSort={handleCardSortInternal}
            setShowAdvancedFilter={setShowAdvancedFilter}
          />

          {/* Results */}
          {viewMode === "table" ? (
            <ServiceTableView
              paginatedServices={paginatedServices}
              handleViewService={wrappedHandleViewService}
              handleEditService={wrappedHandleEditService}
              handleToggleStatus={handleToggleStatus}
              handleDeleteService={handleDeleteService}
              getStatusBadge={getStatusBadge}
              getCategoryBadge={getCategoryBadge}
            />
          ) : (
            <ServiceCardView
              paginatedServices={paginatedServices}
              handleViewService={wrappedHandleViewService}
              handleEditService={wrappedHandleEditService}
              handleToggleStatus={handleToggleStatus}
              handleDeleteService={handleDeleteService}
              getStatusBadge={getStatusBadge}
              getCategoryBadge={getCategoryBadge}
            />
          )}

          {/* Pagination Controls */}
          <PaginationControls
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={totalItems}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Drawers only rendered when onNavigate is not provided (fallback mode) */}
      {!onNavigate && (
        <>
          <AddServiceDrawer
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSave={handleSaveService}
            existingServices={services}
            editingService={editingService}
            isEditMode={!!editingService}
          />
          <AddServiceDrawer
            isOpen={showViewModal}
            onClose={handleCloseViewModal}
            onSave={handleSaveService}
            existingServices={services}
            editingService={selectedService}
            isViewMode={true}
          />
          <AddServiceDrawer
            isOpen={showEditModal}
            onClose={handleCloseEditModal}
            onSave={handleSaveService}
            existingServices={services}
            editingService={editingService}
            isEditMode={true}
          />
        </>
      )}

      <AdvancedFilterSheet
        isOpen={showAdvancedFilter}
        onClose={() => setShowAdvancedFilter(false)}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        handleClearFilters={() => {
          setStatusFilter("all")
          setCategoryFilter("all")
        }}
      />

      <DeleteConfirmationDialog
        isOpen={showDeleteModal}
        onClose={cancelDeleteService}
        onConfirm={confirmDeleteService}
        serviceName={serviceToDelete?.name || ""}
      />
    </div>
  )
}
