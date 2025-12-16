"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Plus, Upload, Download } from "lucide-react"
import AddLicenseDrawer from "./add-license-drawer"
import { SummaryCards } from "./license-management/components/SummaryCards"
import { SearchAndFilters } from "./license-management/components/SearchAndFilters"
import { LicenseTableView } from "./license-management/components/LicenseTableView"
import { LicenseCardView } from "./license-management/components/LicenseCardView"
import { PaginationControls } from "./license-management/components/PaginationControls"
import { AdvancedFilterSheet } from "./license-management/components/AdvancedFilterSheet"
import { DeleteConfirmationDialog } from "./license-management/components/DeleteConfirmationDialog"
import { useLicenseManagement } from "./license-management/hooks/useLicenseManagement"
import { getStatusBadge, getTypeBadge } from "./license-management/utils/badgeUtils"

// Mock data with master fields only
const mockLicenses = [
  {
    id: "1",
    licenseType: "Enterprise",
    status: "active",
    version: "1.0",
    contractValue: 50000,
    createdAt: "2024-01-15T10:30:00Z"
  }
]

interface LicenseManagementProps {
  onNavigate?: (page: string, data?: any) => void
}

export default function LicenseManagement({ onNavigate }: LicenseManagementProps) {
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"table" | "card">("table")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const [sortBy, setSortBy] = useState("licenseType")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [cardSortBy, setCardSortBy] = useState("licenseType")
  const [cardSortDirection, setCardSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedLicense, setSelectedLicense] = useState<any>(null)
  const [editingLicense, setEditingLicense] = useState<any>(null)
  const [licenseToDelete, setLicenseToDelete] = useState<any>(null)
  const [licenses, setLicenses] = useState(mockLicenses)
  const [importFileInput, setImportFileInput] = useState<HTMLInputElement | null>(null)
  
  // Advanced filter states
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false)
  const [minContractValue, setMinContractValue] = useState("")
  const [maxContractValue, setMaxContractValue] = useState("")
  const [startDateRange, setStartDateRange] = useState("")
  const [endDateRange, setEndDateRange] = useState("")

  const {
    filteredLicenses,
    sortedLicenses,
    paginationData,
    handleTableSort,
    handleCardSort,
    handleAddLicense,
    handleToggleStatus,
    handleViewLicense,
    handleCloseViewModal,
    handleEditLicense,
    handleCloseEditModal,
    handleUpdateLicense,
    handleDeleteLicense,
    confirmDeleteLicense,
    cancelDeleteLicense,
    handleExportLicenses,
    handleImportButtonClick,
    handleImportLicenses,
    summaryStats,
    handleClearAdvancedFilters
  } = useLicenseManagement({
    licenses,
    setLicenses,
    searchTerm,
    statusFilter,
    typeFilter: "all",
    minContractValue,
    maxContractValue,
    startDateRange: "",
    endDateRange: "",
    sortBy,
    sortDirection,
    cardSortBy,
    cardSortDirection,
    viewMode,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    editingLicense,
    setEditingLicense,
    setSelectedLicense,
    licenseToDelete,
    setLicenseToDelete,
    setShowEditModal,
    setShowViewModal,
    setShowDeleteModal,
    setShowAddModal,
    toast
  })

  const { totalItems, totalPages, startIndex, endIndex, paginatedLicenses } = paginationData

  const wrappedHandleViewLicense = (license: any) => {
    if (onNavigate) {
      onNavigate("add-license", { license, isViewMode: true })
    } else {
      handleViewLicense(license)
    }
  }

  const wrappedHandleEditLicense = (license: any) => {
    if (onNavigate) {
      onNavigate("add-license", { license, isEditMode: true })
    } else {
      handleEditLicense(license)
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
                <span className="text-2xl">📄</span>
              </div>
        <div>
                <h1 className="text-2xl font-bold text-gray-900">License Management</h1>
                <p className="text-gray-600 text-sm">Manage license types, status, and contract values</p>
              </div>
        </div>
        <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50" onClick={handleImportButtonClick}>
                <Upload className="h-4 w-4 mr-2" />
                Import License
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50" onClick={handleExportLicenses}>
                <Download className="h-4 w-4 mr-2" />
                Export License
          </Button>
          <Button 
                size="sm"
                className="bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white shadow-md hover:from-[#0a7c71] hover:to-[#0784a0]"
            onClick={() => onNavigate ? onNavigate("add-license") : setShowAddModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add License
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
        onChange={handleImportLicenses}
        className="hidden"
        aria-label="Import license data file"
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
            typeFilter="all"
            setTypeFilter={() => {}}
            cardSortBy={cardSortBy}
            cardSortDirection={cardSortDirection}
            handleCardSort={handleCardSort}
            setShowAdvancedFilter={setShowAdvancedFilter}
          />

      {/* Results */}
          {viewMode === "table" ? (
            <LicenseTableView
              paginatedLicenses={paginatedLicenses}
              sortBy={sortBy}
              sortDirection={sortDirection}
              handleTableSort={handleTableSort}
              handleViewLicense={wrappedHandleViewLicense}
              handleEditLicense={wrappedHandleEditLicense}
              handleToggleStatus={handleToggleStatus}
              handleDeleteLicense={handleDeleteLicense}
              getStatusBadge={getStatusBadge}
              getTypeBadge={getTypeBadge}
            />
          ) : (
            <LicenseCardView
              paginatedLicenses={paginatedLicenses}
              handleViewLicense={wrappedHandleViewLicense}
              handleEditLicense={wrappedHandleEditLicense}
              handleToggleStatus={handleToggleStatus}
              handleDeleteLicense={handleDeleteLicense}
              getStatusBadge={getStatusBadge}
              getTypeBadge={getTypeBadge}
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
          <AddLicenseDrawer
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSave={handleAddLicense}
            existingLicenses={licenses}
          />
          <AddLicenseDrawer
            isOpen={showViewModal}
            onClose={handleCloseViewModal}
            onSave={() => {}}
            existingLicenses={licenses}
            editingLicense={selectedLicense}
            isEditMode={false}
            isViewMode={true}
          />
          <AddLicenseDrawer
            isOpen={showEditModal}
            onClose={handleCloseEditModal}
            onSave={handleUpdateLicense}
            existingLicenses={licenses}
            editingLicense={editingLicense}
            isEditMode={true}
          />
        </>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationDialog
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        licenseToDelete={licenseToDelete}
        confirmDeleteLicense={confirmDeleteLicense}
        cancelDeleteLicense={cancelDeleteLicense}
      />

      {/* Advanced Filter Sheet */}
      <AdvancedFilterSheet
        showAdvancedFilter={showAdvancedFilter}
        setShowAdvancedFilter={setShowAdvancedFilter}
        typeFilter="all"
        setTypeFilter={() => {}}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        minContractValue={minContractValue}
        setMinContractValue={setMinContractValue}
        maxContractValue={maxContractValue}
        setMaxContractValue={setMaxContractValue}
        startDateRange={startDateRange}
        setStartDateRange={setStartDateRange}
        endDateRange={endDateRange}
        setEndDateRange={setEndDateRange}
        handleClearAdvancedFilters={handleClearAdvancedFilters}
      />
    </div>
  )
}
