"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Plus, Upload, Download } from "lucide-react"
import AddUserDrawer from "./add-user-drawer"
import { SummaryCards } from "./user-management/components/SummaryCards"
import { SearchAndFilters } from "./user-management/components/SearchAndFilters"
import { UserTableView } from "./user-management/components/UserTableView"
import { UserCardView } from "./user-management/components/UserCardView"
import { PaginationControls } from "./user-management/components/PaginationControls"
import { AdvancedFilterSheet } from "./user-management/components/AdvancedFilterSheet"
import { DeleteConfirmationDialog } from "./user-management/components/DeleteConfirmationDialog"
import { useUserManagement } from "./user-management/hooks/useUserManagement"
import { getStatusBadge, getRoleBadge } from "./user-management/utils/badgeUtils"

// Mock data
const mockUsers = [
  {
    id: "1",
    fullName: "John Smith",
    email: "john.smith@company.com",
    phone: "+1-555-0123",
    role: "Admin",
    status: "active",
    specializations: ["Penetration Testing", "Vulnerability Assessment", "Compliance"],
    reportingTo: null,
    clientMapping: [],
    lastActive: "2024-01-15T10:30:00Z",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: "2",
    fullName: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1-555-0124",
    role: "Manager",
    status: "active",
    specializations: ["Team Leadership", "Project Management", "Client Relations"],
    reportingTo: "John Smith",
    clientMapping: ["TechCorp Solutions", "FinanceFirst Bank"],
    lastActive: "2024-01-15T09:15:00Z",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: "3",
    fullName: "Mike Chen",
    email: "mike.chen@company.com",
    phone: "+1-555-0125",
    role: "Tester",
    status: "active",
    specializations: ["Web Application Security", "Network Security", "Mobile Security"],
    reportingTo: "Sarah Johnson",
    clientMapping: [],
    lastActive: "2024-01-15T08:45:00Z",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: "4",
    fullName: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "+1-555-0126",
    role: "Tester",
    status: "inactive",
    specializations: ["Cloud Security", "DevSecOps", "Compliance"],
    reportingTo: "Sarah Johnson",
    clientMapping: [],
    lastActive: "2024-01-10T14:20:00Z",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: "5",
    fullName: "David Wilson",
    email: "david.wilson@company.com",
    phone: "+1-555-0127",
    role: "Client",
    status: "active",
    specializations: [],
    reportingTo: null,
    clientMapping: [],
    lastActive: "2024-01-15T11:00:00Z",
    avatar: "/placeholder-user.jpg"
  }
]

interface UserManagementProps {
  onNavigate?: (page: string, data?: any) => void
}

export default function UserManagement({ onNavigate }: UserManagementProps) {
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"table" | "card">("table")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [sortBy, setSortBy] = useState("fullName")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [cardSortBy, setCardSortBy] = useState("fullName")
  const [cardSortDirection, setCardSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [userToDelete, setUserToDelete] = useState<any>(null)
  const [users, setUsers] = useState(mockUsers)
  const [importFileInput, setImportFileInput] = useState<HTMLInputElement | null>(null)
  
  // Advanced filter states
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false)
  const [specializationFilter, setSpecializationFilter] = useState("")
  const [reportingToFilter, setReportingToFilter] = useState("")
  const [minSpecializations, setMinSpecializations] = useState("")
  const [maxSpecializations, setMaxSpecializations] = useState("")
  const [dateRangeFilter, setDateRangeFilter] = useState<{start: string, end: string}>({start: "", end: ""})

  const {
    filteredUsers,
    sortedUsers,
    paginationData,
    handleTableSort,
    handleCardSort,
    handleAddUser,
    handleToggleStatus,
    handleViewUser,
    handleCloseViewModal,
    handleEditUser,
    handleCloseEditModal,
    handleUpdateUser,
    handleDeleteUser,
    confirmDeleteUser,
    cancelDeleteUser,
    handleExportUsers,
    handleImportButtonClick,
    handleImportUsers,
    summaryStats,
    handleClearAdvancedFilters
  } = useUserManagement({
    users,
    setUsers,
    searchTerm,
    statusFilter,
    roleFilter,
    specializationFilter,
    reportingToFilter,
    minSpecializations,
    maxSpecializations,
    dateRangeFilter,
    sortBy,
    sortDirection,
    cardSortBy,
    cardSortDirection,
    viewMode,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    editingUser,
    setEditingUser,
    setSelectedUser,
    userToDelete,
    setUserToDelete,
    setShowEditModal,
    setShowViewModal,
    setShowDeleteModal,
    setShowAddModal,
    toast
  })

  const { totalItems, totalPages, startIndex, endIndex, paginatedUsers } = paginationData

  const wrappedHandleViewUser = useCallback((user: any) => {
    if (onNavigate) {
      onNavigate("add-user", { user, isEditMode: false, isViewMode: true })
    } else {
      handleViewUser(user)
    }
  }, [onNavigate, handleViewUser])

  const wrappedHandleEditUser = useCallback((user: any) => {
    if (onNavigate) {
      onNavigate("add-user", { user, isEditMode: true, isViewMode: false })
    } else {
      handleEditUser(user)
    }
  }, [onNavigate, handleEditUser])

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
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600 text-sm">Manage team members, roles, and permissions</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50" onClick={handleImportButtonClick}>
                <Upload className="h-4 w-4 mr-2" />
                Import User
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50" onClick={handleExportUsers}>
                <Download className="h-4 w-4 mr-2" />
                Export User
                </Button>
                <Button
                  size="sm"
                className="bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white shadow-md hover:from-[#0a7c71] hover:to-[#0784a0]"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate("add-user", { isEditMode: false, isViewMode: false })
                  } else {
                    setShowAddModal(true)
                  }
                }}
                >
                <Plus className="h-4 w-4 mr-2" />
                Add User
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
        onChange={handleImportUsers}
        className="hidden"
        aria-label="Import user data file"
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
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            cardSortBy={cardSortBy}
            cardSortDirection={cardSortDirection}
            handleCardSort={handleCardSort}
            setShowAdvancedFilter={setShowAdvancedFilter}
          />

      {/* Results */}
          {viewMode === "table" ? (
            <UserTableView
              paginatedUsers={paginatedUsers}
              sortBy={sortBy}
              sortDirection={sortDirection}
              handleTableSort={handleTableSort}
              handleViewUser={wrappedHandleViewUser}
              handleEditUser={wrappedHandleEditUser}
              handleToggleStatus={handleToggleStatus}
              handleDeleteUser={handleDeleteUser}
              getStatusBadge={getStatusBadge}
              getRoleBadge={getRoleBadge}
            />
          ) : (
            <UserCardView
              paginatedUsers={paginatedUsers}
              handleViewUser={wrappedHandleViewUser}
              handleEditUser={wrappedHandleEditUser}
              handleToggleStatus={handleToggleStatus}
              handleDeleteUser={handleDeleteUser}
              getStatusBadge={getStatusBadge}
              getRoleBadge={getRoleBadge}
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
          {/* Add User Drawer */}
          <AddUserDrawer
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSave={handleAddUser}
            existingUsers={users}
          />

          {/* View User Drawer */}
          <AddUserDrawer
            isOpen={showViewModal}
            onClose={handleCloseViewModal}
            onSave={() => {}} // No-op for view mode
            existingUsers={users}
            editingUser={selectedUser}
            isEditMode={false}
            isViewMode={true}
          />

          {/* Edit User Drawer */}
          <AddUserDrawer
            isOpen={showEditModal}
            onClose={handleCloseEditModal}
            onSave={handleUpdateUser}
            existingUsers={users}
            editingUser={editingUser}
            isEditMode={true}
          />
        </>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationDialog
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        userToDelete={userToDelete}
        confirmDeleteUser={confirmDeleteUser}
        cancelDeleteUser={cancelDeleteUser}
      />

      {/* Advanced Filter Sheet */}
      <AdvancedFilterSheet
        showAdvancedFilter={showAdvancedFilter}
        setShowAdvancedFilter={setShowAdvancedFilter}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        specializationFilter={specializationFilter}
        setSpecializationFilter={setSpecializationFilter}
        reportingToFilter={reportingToFilter}
        setReportingToFilter={setReportingToFilter}
        minSpecializations={minSpecializations}
        setMinSpecializations={setMinSpecializations}
        maxSpecializations={maxSpecializations}
        setMaxSpecializations={setMaxSpecializations}
        dateRangeFilter={dateRangeFilter}
        setDateRangeFilter={setDateRangeFilter}
        handleClearAdvancedFilters={handleClearAdvancedFilters}
      />
    </div>
  )
}
