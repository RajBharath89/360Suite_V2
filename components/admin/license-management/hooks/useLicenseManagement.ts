import { useMemo, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface UseLicenseManagementProps {
  licenses: any[]
  setLicenses: (licenses: any[]) => void
  searchTerm: string
  statusFilter: string
  typeFilter: string
  minContractValue: string
  maxContractValue: string
  startDateRange: string
  endDateRange: string
  sortBy: string
  sortDirection: "asc" | "desc"
  cardSortBy: string
  cardSortDirection: "asc" | "desc"
  viewMode: "table" | "card"
  currentPage: number
  itemsPerPage: number
  setCurrentPage: (page: number) => void
  editingLicense: any
  setEditingLicense: (license: any) => void
  setSelectedLicense: (license: any) => void
  licenseToDelete: any
  setLicenseToDelete: (license: any) => void
  setShowEditModal: (show: boolean) => void
  setShowViewModal: (show: boolean) => void
  setShowDeleteModal: (show: boolean) => void
  setShowAddModal: (show: boolean) => void
  toast: any
}

export const useLicenseManagement = ({
  licenses,
  setLicenses,
  searchTerm,
  statusFilter,
  typeFilter,
  minContractValue,
  maxContractValue,
  startDateRange,
  endDateRange,
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
}: UseLicenseManagementProps) => {
  
  const filteredLicenses = useMemo(() => {
    return licenses.filter(license => {
      const matchesSearch = license.licenseType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           license.status?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || license.status === statusFilter
      const matchesType = typeFilter === "all" || license.licenseType === typeFilter
      const matchesMinValue = !minContractValue || license.contractValue >= parseFloat(minContractValue)
      const matchesMaxValue = !maxContractValue || license.contractValue <= parseFloat(maxContractValue)
      
      return matchesSearch && matchesStatus && matchesType && matchesMinValue && matchesMaxValue
    })
  }, [licenses, searchTerm, statusFilter, typeFilter, minContractValue, maxContractValue])

  const sortedLicenses = useMemo(() => {
    return [...filteredLicenses].sort((a, b) => {
      let aValue: any
      let bValue: any

      const currentSortBy = viewMode === "card" ? cardSortBy : sortBy
      const currentSortDirection = viewMode === "card" ? cardSortDirection : sortDirection

      switch (currentSortBy) {
        case "licenseType":
          aValue = a.licenseType?.toLowerCase() || ""
          bValue = b.licenseType?.toLowerCase() || ""
          break
        case "status":
          aValue = a.status?.toLowerCase() || ""
          bValue = b.status?.toLowerCase() || ""
          break
        case "contractValue":
          aValue = a.contractValue || 0
          bValue = b.contractValue || 0
          break
        case "createdAt":
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        case "version":
          aValue = a.version?.toLowerCase() || ""
          bValue = b.version?.toLowerCase() || ""
          break
        default:
          aValue = a.licenseType?.toLowerCase() || ""
          bValue = b.licenseType?.toLowerCase() || ""
      }

      if (aValue < bValue) return currentSortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return currentSortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [filteredLicenses, viewMode, cardSortBy, cardSortDirection, sortBy, sortDirection])

  const paginationData = useMemo(() => {
    const totalItems = sortedLicenses.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedLicenses = sortedLicenses.slice(startIndex, endIndex)
    
    return { totalItems, totalPages, startIndex, endIndex, paginatedLicenses }
  }, [sortedLicenses, itemsPerPage, currentPage])

  const handleTableSort = useCallback((column: string) => {
    setCurrentPage(1)
  }, [setCurrentPage])

  const handleCardSort = useCallback((sortOption: string) => {
    setCurrentPage(1)
  }, [setCurrentPage])

  const handleAddLicense = useCallback((licenseData: any) => {
    const maxId = licenses.length > 0 ? Math.max(...licenses.map(license => parseInt(license.id) || 0)) : 0
    const newId = (maxId + 1).toString()
    
    const newLicense = {
      id: newId,
      ...licenseData,
      createdAt: new Date().toISOString()
    }
    setLicenses(prevLicenses => [...prevLicenses, newLicense])
  }, [setLicenses, licenses])

  const handleToggleStatus = useCallback((licenseId: string) => {
    setLicenses(prevLicenses => prevLicenses.map(license => 
      license.id === licenseId 
        ? { ...license, status: license.status === "active" ? "inactive" : "active" }
        : license
    ))
  }, [setLicenses])

  const handleViewLicense = useCallback((license: any) => {
    setSelectedLicense(license)
    setShowViewModal(true)
  }, [setSelectedLicense, setShowViewModal])

  const handleCloseViewModal = useCallback(() => {
    setShowViewModal(false)
    setSelectedLicense(null)
  }, [setShowViewModal, setSelectedLicense])

  const handleEditLicense = useCallback((license: any) => {
    setEditingLicense(license)
    setShowEditModal(true)
  }, [setEditingLicense, setShowEditModal])

  const handleCloseEditModal = useCallback(() => {
    setShowEditModal(false)
    setEditingLicense(null)
  }, [setShowEditModal, setEditingLicense])

  const handleUpdateLicense = useCallback((updatedLicenseData: any) => {
    setLicenses(prevLicenses => prevLicenses.map(license => 
      license.id === editingLicense?.id 
        ? { ...license, ...updatedLicenseData }
        : license
    ))
    setShowEditModal(false)
    setEditingLicense(null)
    
    toast({
      title: "License Updated Successfully! 🎉",
      description: `${updatedLicenseData.licenseType} license has been updated.`,
      duration: 5000,
      variant: "success",
    })
  }, [setLicenses, setShowEditModal, setEditingLicense, editingLicense, toast])

  const handleDeleteLicense = useCallback((license: any) => {
    setLicenseToDelete(license)
    setShowDeleteModal(true)
  }, [setLicenseToDelete, setShowDeleteModal])

  const confirmDeleteLicense = useCallback(() => {
    if (licenseToDelete) {
      const licenseType = licenseToDelete.licenseType
      setLicenses(prevLicenses => prevLicenses.filter(license => license.id !== licenseToDelete.id))
      setShowDeleteModal(false)
      setLicenseToDelete(null)
      
      toast({
        title: "License Deleted Successfully! 🗑️",
        description: `${licenseType} license has been permanently removed.`,
        duration: 5000,
        variant: "success",
      })
    }
  }, [licenseToDelete, setLicenses, setShowDeleteModal, setLicenseToDelete, toast])

  const cancelDeleteLicense = useCallback(() => {
    setShowDeleteModal(false)
    setLicenseToDelete(null)
  }, [setShowDeleteModal, setLicenseToDelete])

  const handleExportLicenses = useCallback(() => {
    try {
      const exportData = {
        exportDate: new Date().toISOString(),
        version: "1.0",
        licenses: licenses.map(license => ({
          licenseType: license.licenseType,
          status: license.status,
          startDate: license.startDate,
          endDate: license.endDate,
          contractValue: license.contractValue,
          createdAt: license.createdAt
        }))
      }

      const jsonContent = JSON.stringify(exportData, null, 2)
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `licenses_export_${new Date().toISOString().split('T')[0]}.json`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    }
  }, [licenses])

  const handleImportButtonClick = useCallback(() => {
    const fileInput = document.querySelector('input[type="file"][accept=".json"]') as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }, [])

  const handleImportLicenses = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const importData = JSON.parse(text)
        
        const licensesToImport = importData.licenses || importData
        
        if (!Array.isArray(licensesToImport)) {
          throw new Error('Invalid JSON format. Expected an array of licenses.')
        }

        const maxExistingId = licenses.length > 0 ? Math.max(...licenses.map(license => parseInt(license.id) || 0)) : 0
        
        const importedLicenses = licensesToImport.map((license: any, index: number) => ({
          id: (maxExistingId + index + 1).toString(),
          licenseType: license.licenseType || '',
          status: license.status || 'active',
          version: license.version || '',
          contractValue: license.contractValue || 0,
          createdAt: license.createdAt || new Date().toISOString()
        }))

        setLicenses(prevLicenses => [...prevLicenses, ...importedLicenses])
        
        toast({
          title: "Licenses Imported Successfully! 📥",
          description: `Successfully imported ${importedLicenses.length} license(s) from the JSON file.`,
          duration: 5000,
          variant: "success",
        })
      } catch (error) {
        console.error('Import failed:', error)
        toast({
          title: "Import Failed! ❌",
          description: "Please check the file format and try again. Make sure the JSON file contains valid license data.",
          duration: 5000,
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
    
    event.target.value = ''
  }, [setLicenses, toast])

  const summaryStats = useMemo(() => {
    const activeLicenses = licenses.filter(l => l.status === 'active').length
    const inactiveLicenses = licenses.filter(l => l.status === 'inactive').length

    return {
      total: licenses.length,
      active: activeLicenses,
      inactive: inactiveLicenses
    }
  }, [licenses])

  const handleClearAdvancedFilters = useCallback(() => {
    // This would need to be handled by the parent component
  }, [])

  return {
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
  }
}
