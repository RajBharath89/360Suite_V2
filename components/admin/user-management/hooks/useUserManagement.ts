import { useMemo, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface UseUserManagementProps {
  users: any[]
  setUsers: (users: any[]) => void
  searchTerm: string
  statusFilter: string
  roleFilter: string
  specializationFilter: string
  reportingToFilter: string
  minSpecializations: string
  maxSpecializations: string
  dateRangeFilter: {start: string, end: string}
  sortBy: string
  sortDirection: "asc" | "desc"
  cardSortBy: string
  cardSortDirection: "asc" | "desc"
  viewMode: "table" | "card"
  currentPage: number
  itemsPerPage: number
  setCurrentPage: (page: number) => void
  editingUser: any
  setEditingUser: (user: any) => void
  setSelectedUser: (user: any) => void
  userToDelete: any
  setUserToDelete: (user: any) => void
  setShowEditModal: (show: boolean) => void
  setShowViewModal: (show: boolean) => void
  setShowDeleteModal: (show: boolean) => void
  setShowAddModal: (show: boolean) => void
  toast: any
}

export const useUserManagement = ({
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
}: UseUserManagementProps) => {
  
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.role.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || user.status === statusFilter
      const matchesRole = roleFilter === "all" || user.role === roleFilter
      const matchesSpecialization = !specializationFilter || 
        user.specializations.some((spec: string) => 
          spec.toLowerCase().includes(specializationFilter.toLowerCase())
        )
      const matchesReportingTo = !reportingToFilter || 
        (user.reportingTo && user.reportingTo.toLowerCase().includes(reportingToFilter.toLowerCase()))
      const matchesMinSpecializations = !minSpecializations || user.specializations.length >= parseInt(minSpecializations)
      const matchesMaxSpecializations = !maxSpecializations || user.specializations.length <= parseInt(maxSpecializations)
      const matchesDateRange = (!dateRangeFilter.start || new Date(user.lastActive) >= new Date(dateRangeFilter.start)) &&
                               (!dateRangeFilter.end || new Date(user.lastActive) <= new Date(dateRangeFilter.end))
      
      return matchesSearch && matchesStatus && matchesRole && matchesSpecialization && 
             matchesReportingTo && matchesMinSpecializations && matchesMaxSpecializations && matchesDateRange
    })
  }, [users, searchTerm, statusFilter, roleFilter, specializationFilter, reportingToFilter, 
      minSpecializations, maxSpecializations, dateRangeFilter])

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      let aValue: any
      let bValue: any

      // Use appropriate sort settings based on view mode
      const currentSortBy = viewMode === "card" ? cardSortBy : sortBy
      const currentSortDirection = viewMode === "card" ? cardSortDirection : sortDirection

      switch (currentSortBy) {
        case "fullName":
          aValue = a.fullName.toLowerCase()
          bValue = b.fullName.toLowerCase()
          break
        case "email":
          aValue = a.email.toLowerCase()
          bValue = b.email.toLowerCase()
          break
        case "role":
          aValue = a.role.toLowerCase()
          bValue = b.role.toLowerCase()
          break
        case "status":
          aValue = a.status.toLowerCase()
          bValue = b.status.toLowerCase()
          break
        case "lastActive":
          aValue = new Date(a.lastActive).getTime()
          bValue = new Date(b.lastActive).getTime()
          break
        case "reportingTo":
          aValue = a.reportingTo?.toLowerCase() || ""
          bValue = b.reportingTo?.toLowerCase() || ""
          break
        case "specializations":
          aValue = a.specializations.length
          bValue = b.specializations.length
          break
        default:
          aValue = a.fullName.toLowerCase()
          bValue = b.fullName.toLowerCase()
      }

      if (aValue < bValue) return currentSortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return currentSortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [filteredUsers, viewMode, cardSortBy, cardSortDirection, sortBy, sortDirection])

  // Pagination calculations
  const paginationData = useMemo(() => {
    const totalItems = sortedUsers.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedUsers = sortedUsers.slice(startIndex, endIndex)
    
    return { totalItems, totalPages, startIndex, endIndex, paginatedUsers }
  }, [sortedUsers, itemsPerPage, currentPage])

  const handleTableSort = useCallback((column: string) => {
    // This would need to be handled by the parent component
    setCurrentPage(1)
  }, [setCurrentPage])

  const handleCardSort = useCallback((sortOption: string) => {
    // This would need to be handled by the parent component
    setCurrentPage(1)
  }, [setCurrentPage])

  const handleAddUser = useCallback((userData: any) => {
    // Generate sequential ID based on existing users
    const maxId = users.length > 0 ? Math.max(...users.map(user => parseInt(user.id) || 0)) : 0
    const newId = (maxId + 1).toString()
    
    const newUser = {
      id: newId,
      ...userData,
      avatar: "/placeholder-user.jpg"
    }
    setUsers(prevUsers => [...prevUsers, newUser])
  }, [setUsers, users])

  const handleToggleStatus = useCallback((userId: string) => {
    setUsers(prevUsers => prevUsers.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ))
  }, [setUsers])

  const handleViewUser = useCallback((user: any) => {
    setSelectedUser(user)
    setShowViewModal(true)
  }, [setSelectedUser, setShowViewModal])

  const handleCloseViewModal = useCallback(() => {
    setShowViewModal(false)
    setSelectedUser(null)
  }, [setShowViewModal, setSelectedUser])

  const handleEditUser = useCallback((user: any) => {
    setEditingUser(user)
    setShowEditModal(true)
  }, [setEditingUser, setShowEditModal])

  const handleCloseEditModal = useCallback(() => {
    setShowEditModal(false)
    setEditingUser(null)
  }, [setShowEditModal, setEditingUser])

  const handleUpdateUser = useCallback((updatedUserData: any) => {
    setUsers(prevUsers => prevUsers.map(user => 
      user.id === editingUser?.id 
        ? { ...user, ...updatedUserData }
        : user
    ))
    setShowEditModal(false)
    setEditingUser(null)
    
    // Show success toast
    toast({
      title: "User Updated Successfully! 🎉",
      description: `${updatedUserData.fullName} has been updated with ${updatedUserData.specializations?.length || 0} specialization(s).`,
      duration: 5000,
      variant: "success",
    })
  }, [setUsers, setShowEditModal, setEditingUser, editingUser, toast])

  const handleDeleteUser = useCallback((user: any) => {
    setUserToDelete(user)
    setShowDeleteModal(true)
  }, [setUserToDelete, setShowDeleteModal])

  const confirmDeleteUser = useCallback(() => {
    if (userToDelete) {
      const userName = userToDelete.fullName
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id))
      setShowDeleteModal(false)
      setUserToDelete(null)
      
      // Show success toast
      toast({
        title: "User Deleted Successfully! 🗑️",
        description: `${userName} and all associated data have been permanently removed from your user list.`,
        duration: 5000,
        variant: "success",
      })
    }
  }, [userToDelete, setUsers, setShowDeleteModal, setUserToDelete, toast])

  const cancelDeleteUser = useCallback(() => {
    setShowDeleteModal(false)
    setUserToDelete(null)
  }, [setShowDeleteModal, setUserToDelete])

  const handleExportUsers = useCallback(() => {
    try {
      const exportData = {
        exportDate: new Date().toISOString(),
        version: "1.0",
        users: users.map(user => ({
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          status: user.status,
          specializations: user.specializations,
          reportingTo: user.reportingTo,
          clientMapping: user.clientMapping,
          lastActive: user.lastActive
        }))
      }

      const jsonContent = JSON.stringify(exportData, null, 2)
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `users_export_${new Date().toISOString().split('T')[0]}.json`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    }
  }, [users])

  const handleImportButtonClick = useCallback(() => {
    // Trigger the hidden file input
    const fileInput = document.querySelector('input[type="file"][accept=".json"]') as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }, [])

  const handleImportUsers = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const importData = JSON.parse(text)
        
        // Handle both new format (with metadata) and direct user array
        const usersToImport = importData.users || importData
        
        if (!Array.isArray(usersToImport)) {
          throw new Error('Invalid JSON format. Expected an array of users.')
        }

        // Generate sequential IDs for imported users
        const maxExistingId = users.length > 0 ? Math.max(...users.map(user => parseInt(user.id) || 0)) : 0
        
        const importedUsers = usersToImport.map((user: any, index: number) => ({
          id: (maxExistingId + index + 1).toString(),
          fullName: user.fullName || '',
          email: user.email || '',
          phone: user.phone || '',
          role: user.role || 'Tester',
          status: user.status || 'active',
          specializations: Array.isArray(user.specializations) ? user.specializations : [],
          reportingTo: user.reportingTo || null,
          clientMapping: Array.isArray(user.clientMapping) ? user.clientMapping : [],
          lastActive: user.lastActive || new Date().toISOString(),
          avatar: '/placeholder-user.jpg'
        }))

        setUsers(prevUsers => [...prevUsers, ...importedUsers])
        
        // Show success toast
        toast({
          title: "Users Imported Successfully! 📥",
          description: `Successfully imported ${importedUsers.length} user(s) from the JSON file.`,
          duration: 5000,
          variant: "success",
        })
      } catch (error) {
        console.error('Import failed:', error)
        toast({
          title: "Import Failed! ❌",
          description: "Please check the file format and try again. Make sure the JSON file contains valid user data.",
          duration: 5000,
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
    
    // Reset the input
    event.target.value = ''
  }, [setUsers, toast])

  // Memoized summary statistics
  const summaryStats = useMemo(() => {
    const activeUsers = users.filter(u => u.status === 'active').length
    const inactiveUsers = users.filter(u => u.status === 'inactive').length
    const adminUsers = users.filter(u => u.role === 'Admin').length
    const managerUsers = users.filter(u => u.role === 'Manager').length
    const testerUsers = users.filter(u => u.role === 'Tester').length

    return {
      total: users.length,
      active: activeUsers,
      inactive: inactiveUsers,
      admin: adminUsers,
      manager: managerUsers,
      tester: testerUsers
    }
  }, [users])

  const handleClearAdvancedFilters = useCallback(() => {
    // This would need to be handled by the parent component
  }, [])

  return {
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
  }
}
