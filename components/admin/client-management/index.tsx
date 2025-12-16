"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Search, Filter, Plus, Upload, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AddClientDrawer from "../add-client-drawer"
import { mockClients } from "./data/mock-data"
import { SummaryCards } from "./components/SummaryCards"
import { SearchAndFilters } from "./components/SearchAndFilters"
import { ClientTableView } from "./components/ClientTableView"
import { ClientCardView } from "./components/ClientCardView"
import { PaginationControls } from "./components/PaginationControls"
import { AdvancedFilterSheet } from "./components/AdvancedFilterSheet"
import { DeleteConfirmationDialog } from "./components/DeleteConfirmationDialog"
import { GenerateCredentialsDrawer } from "./components/GenerateCredentialsDrawer"
import { useClientManagement } from "./hooks/useClientManagement"
import { getStatusBadge, getLicenseBadge } from "./utils/badgeUtils"

interface ClientManagementProps {
  onNavigate?: (page: string, data?: any) => void
}

export default function ClientManagement({ onNavigate }: ClientManagementProps) {
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"table" | "card">("table")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("companyName")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [cardSortBy, setCardSortBy] = useState("companyName")
  const [cardSortDirection, setCardSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showGenerateCredentialsModal, setShowGenerateCredentialsModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [editingClient, setEditingClient] = useState<any>(null)
  const [clientToDelete, setClientToDelete] = useState<any>(null)
  const [clientForCredentials, setClientForCredentials] = useState<any>(null)
  const [clients, setClients] = useState(mockClients)
  const [importFileInput, setImportFileInput] = useState<HTMLInputElement | null>(null)
  
  // Advanced filter states
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false)
  const [licenseTypeFilter, setLicenseTypeFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("")
  const [minServices, setMinServices] = useState("")
  const [maxServices, setMaxServices] = useState("")
  const [minContacts, setMinContacts] = useState("")
  const [maxContacts, setMaxContacts] = useState("")
  const [minAssets, setMinAssets] = useState("")
  const [maxAssets, setMaxAssets] = useState("")
  const [companyNameFilter, setCompanyNameFilter] = useState("")
  const [dateRangeFilter, setDateRangeFilter] = useState<{start: string, end: string}>({start: "", end: ""})
  const [endDateRangeFilter, setEndDateRangeFilter] = useState<{start: string, end: string}>({start: "", end: ""})

  const {
    filteredClients,
    sortedClients,
    paginationData,
    handleTableSort,
    handleCardSort,
    handleAddClient,
    handleToggleStatus,
    handleViewClient,
    handleCloseViewModal,
    handleEditClient,
    handleCloseEditModal,
    handleUpdateClient,
    handleDeleteClient,
    confirmDeleteClient,
    cancelDeleteClient,
    handleExportClients,
    handleImportButtonClick,
    handleImportClients,
    summaryStats,
    handleClearAdvancedFilters
  } = useClientManagement({
    clients,
    setClients,
    searchTerm,
    statusFilter,
    industryFilter,
    licenseTypeFilter,
    locationFilter,
    companyNameFilter,
    minServices,
    maxServices,
    minContacts,
    maxContacts,
    minAssets,
    maxAssets,
    dateRangeFilter,
    endDateRangeFilter,
    sortBy,
    sortDirection,
    cardSortBy,
    cardSortDirection,
    viewMode,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    editingClient,
    setEditingClient,
    setSelectedClient,
    clientToDelete,
    setClientToDelete,
    setShowEditModal,
    setShowViewModal,
    setShowDeleteModal,
    setShowAddModal,
    toast
  })

  const { totalItems, totalPages, startIndex, endIndex, paginatedClients } = paginationData

  const wrappedHandleViewClient = useCallback((client: any) => {
    if (onNavigate) {
      onNavigate("add-client", { client, isEditMode: false, isViewMode: true })
    } else {
      handleViewClient(client)
    }
  }, [onNavigate, handleViewClient])

  const wrappedHandleEditClient = useCallback((client: any) => {
    if (onNavigate) {
      onNavigate("add-client", { client, isEditMode: true, isViewMode: false })
    } else {
      handleEditClient(client)
    }
  }, [onNavigate, handleEditClient])

  return (
    <div className="p-6 space-y-6">
      {/* Banner Card */}
      <Card className="h-28 bg-gradient-to-r from-cyan-50 via-teal-50 to-green-50 border-cyan-200 shadow-lg">
        <CardContent className="p-3 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 border-2 border-white shadow-md rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
                <p className="text-gray-600 text-sm">Manage client information, services, and licenses</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50" onClick={handleImportButtonClick}>
                <Upload className="h-4 w-4 mr-2" />
                Import Client
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50" onClick={handleExportClients}>
                <Download className="h-4 w-4 mr-2" />
                Export Client
              </Button>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white shadow-md hover:from-[#0a7c71] hover:to-[#0784a0]"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate("add-client", { isEditMode: false, isViewMode: false })
                  } else {
                    setShowAddModal(true)
                  }
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Client
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
        onChange={handleImportClients}
        className="hidden"
        aria-label="Import client data file"
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
            industryFilter={industryFilter}
            setIndustryFilter={setIndustryFilter}
            cardSortBy={cardSortBy}
            cardSortDirection={cardSortDirection}
            handleCardSort={handleCardSort}
            setShowAdvancedFilter={setShowAdvancedFilter}
          />

          {/* Results */}
          {viewMode === "table" ? (
            <ClientTableView
              paginatedClients={paginatedClients}
              sortBy={sortBy}
              sortDirection={sortDirection}
              handleTableSort={handleTableSort}
              handleViewClient={wrappedHandleViewClient}
              handleEditClient={wrappedHandleEditClient}
              handleToggleStatus={handleToggleStatus}
              handleDeleteClient={handleDeleteClient}
              handleGenerateCredentials={(client) => {
                setClientForCredentials(client)
                setShowGenerateCredentialsModal(true)
              }}
              getStatusBadge={getStatusBadge}
              getLicenseBadge={getLicenseBadge}
            />
          ) : (
            <ClientCardView
              paginatedClients={paginatedClients}
              handleViewClient={wrappedHandleViewClient}
              handleEditClient={wrappedHandleEditClient}
              handleToggleStatus={handleToggleStatus}
              handleDeleteClient={handleDeleteClient}
              handleGenerateCredentials={(client) => {
                setClientForCredentials(client)
                setShowGenerateCredentialsModal(true)
              }}
              getStatusBadge={getStatusBadge}
              getLicenseBadge={getLicenseBadge}
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
          {/* Add Client Modal */}
          <AddClientDrawer
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSave={handleAddClient}
            existingClients={clients}
          />

          {/* View Client Drawer */}
          <AddClientDrawer
            isOpen={showViewModal}
            onClose={handleCloseViewModal}
            onSave={() => {}} // No-op for view mode
            existingClients={clients}
            editingClient={selectedClient}
            isEditMode={false}
            isViewMode={true}
          />

          {/* Edit Client Modal */}
          <AddClientDrawer
            isOpen={showEditModal}
            onClose={handleCloseEditModal}
            onSave={handleUpdateClient}
            existingClients={clients}
            editingClient={editingClient}
            isEditMode={true}
          />
        </>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationDialog
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        clientToDelete={clientToDelete}
        confirmDeleteClient={confirmDeleteClient}
        cancelDeleteClient={cancelDeleteClient}
      />

      {/* Advanced Filter Sheet */}
      <AdvancedFilterSheet
        showAdvancedFilter={showAdvancedFilter}
        setShowAdvancedFilter={setShowAdvancedFilter}
        licenseTypeFilter={licenseTypeFilter}
        setLicenseTypeFilter={setLicenseTypeFilter}
        companyNameFilter={companyNameFilter}
        setCompanyNameFilter={setCompanyNameFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        minServices={minServices}
        setMinServices={setMinServices}
        maxServices={maxServices}
        setMaxServices={setMaxServices}
        minContacts={minContacts}
        setMinContacts={setMinContacts}
        maxContacts={maxContacts}
        setMaxContacts={setMaxContacts}
        minAssets={minAssets}
        setMinAssets={setMinAssets}
        maxAssets={maxAssets}
        setMaxAssets={setMaxAssets}
        dateRangeFilter={dateRangeFilter}
        setDateRangeFilter={setDateRangeFilter}
        endDateRangeFilter={endDateRangeFilter}
        setEndDateRangeFilter={setEndDateRangeFilter}
        handleClearAdvancedFilters={handleClearAdvancedFilters}
      />

      {/* Generate Credentials Drawer */}
      <GenerateCredentialsDrawer
        isOpen={showGenerateCredentialsModal}
        onClose={() => {
          setShowGenerateCredentialsModal(false)
          setClientForCredentials(null)
        }}
        client={clientForCredentials}
      />
    </div>
  )
}