import { useMemo, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface UseServicesManagementProps {
  services: any[]
  setServices: (services: any[]) => void
  searchTerm: string
  statusFilter: string
  categoryFilter: string
  sortBy: string
  sortDirection: "asc" | "desc"
  cardSortBy: string
  cardSortDirection: "asc" | "desc"
  viewMode: "table" | "card"
  currentPage: number
  itemsPerPage: number
  setCurrentPage: (page: number) => void
  editingService: any
  setEditingService: (service: any) => void
  setSelectedService: (service: any) => void
  serviceToDelete: any
  setServiceToDelete: (service: any) => void
  setShowEditModal: (show: boolean) => void
  setShowViewModal: (show: boolean) => void
  setShowDeleteModal: (show: boolean) => void
  setShowAddModal: (show: boolean) => void
  toast: any
}

export const useServicesManagement = ({
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
}: UseServicesManagementProps) => {
  
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || service.status === statusFilter
      const matchesCategory = categoryFilter === "all" || service.category === categoryFilter
      
      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [services, searchTerm, statusFilter, categoryFilter])

  const sortedServices = useMemo(() => {
    return [...filteredServices].sort((a, b) => {
      let aValue: any
      let bValue: any

      const currentSortBy = viewMode === "card" ? cardSortBy : sortBy
      const currentSortDirection = viewMode === "card" ? cardSortDirection : sortDirection

      switch (currentSortBy) {
        case "name":
          aValue = a.name?.toLowerCase() || ""
          bValue = b.name?.toLowerCase() || ""
          break
        case "status":
          aValue = a.status?.toLowerCase() || ""
          bValue = b.status?.toLowerCase() || ""
          break
        case "category":
          aValue = a.category?.toLowerCase() || ""
          bValue = b.category?.toLowerCase() || ""
          break
        case "createdAt":
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        default:
          aValue = a.name?.toLowerCase() || ""
          bValue = b.name?.toLowerCase() || ""
      }

      if (aValue < bValue) return currentSortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return currentSortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [filteredServices, viewMode, cardSortBy, cardSortDirection, sortBy, sortDirection])

  const paginationData = useMemo(() => {
    const totalItems = sortedServices.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedServices = sortedServices.slice(startIndex, endIndex)
    
    return { totalItems, totalPages, startIndex, endIndex, paginatedServices }
  }, [sortedServices, itemsPerPage, currentPage])

  const handleTableSort = useCallback((column: string) => {
    setCurrentPage(1)
  }, [setCurrentPage])

  const handleCardSort = useCallback((sortOption: string) => {
    setCurrentPage(1)
  }, [setCurrentPage])

  const handleAddService = useCallback((serviceData: any) => {
    const maxId = services.length > 0 ? Math.max(...services.map(service => parseInt(service.id) || 0)) : 0
    const newId = (maxId + 1).toString()
    
    const newService = {
      id: newId,
      ...serviceData,
      createdAt: new Date().toISOString()
    }
    setServices(prevServices => [...prevServices, newService])
  }, [setServices, services])

  const handleToggleStatus = useCallback((serviceId: string) => {
    setServices(prevServices => prevServices.map(service => 
      service.id === serviceId 
        ? { ...service, status: service.status === "active" ? "inactive" : "active" }
        : service
    ))
  }, [setServices])

  const handleViewService = useCallback((service: any) => {
    setSelectedService(service)
    setShowViewModal(true)
  }, [setSelectedService, setShowViewModal])

  const handleCloseViewModal = useCallback(() => {
    setShowViewModal(false)
    setSelectedService(null)
  }, [setShowViewModal, setSelectedService])

  const handleEditService = useCallback((service: any) => {
    setEditingService(service)
    setShowEditModal(true)
  }, [setEditingService, setShowEditModal])

  const handleCloseEditModal = useCallback(() => {
    setShowEditModal(false)
    setEditingService(null)
  }, [setShowEditModal, setEditingService])

  const handleUpdateService = useCallback((updatedServiceData: any) => {
    setServices(prevServices => prevServices.map(service => 
      service.id === editingService?.id 
        ? { ...service, ...updatedServiceData }
        : service
    ))
    setShowEditModal(false)
    setEditingService(null)
    
    toast({
      title: "Service Updated Successfully! 🎉",
      description: `${updatedServiceData.name} has been updated.`,
      duration: 5000,
      variant: "success",
    })
  }, [setServices, setShowEditModal, setEditingService, editingService, toast])

  const handleDeleteService = useCallback((service: any) => {
    setServiceToDelete(service)
    setShowDeleteModal(true)
  }, [setServiceToDelete, setShowDeleteModal])

  const confirmDeleteService = useCallback(() => {
    if (serviceToDelete) {
      const serviceName = serviceToDelete.name
      setServices(prevServices => prevServices.filter(service => service.id !== serviceToDelete.id))
      setShowDeleteModal(false)
      setServiceToDelete(null)
      
      toast({
        title: "Service Deleted Successfully! 🗑️",
        description: `${serviceName} has been permanently removed.`,
        duration: 5000,
        variant: "success",
      })
    }
  }, [serviceToDelete, setServices, setShowDeleteModal, setServiceToDelete, toast])

  const cancelDeleteService = useCallback(() => {
    setShowDeleteModal(false)
    setServiceToDelete(null)
  }, [setShowDeleteModal, setServiceToDelete])

  const handleExportServices = useCallback(() => {
    try {
      const exportData = {
        exportDate: new Date().toISOString(),
        version: "1.0",
        services: services.map(service => ({
          name: service.name,
          status: service.status,
          category: service.category,
          description: service.description,
          createdAt: service.createdAt
        }))
      }

      const jsonContent = JSON.stringify(exportData, null, 2)
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `services_export_${new Date().toISOString().split('T')[0]}.json`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    }
  }, [services])

  const handleImportButtonClick = useCallback(() => {
    const fileInput = document.querySelector('input[type="file"][accept=".json"]') as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }, [])

  const handleImportServices = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const importData = JSON.parse(text)
        
        const servicesToImport = importData.services || importData
        
        if (!Array.isArray(servicesToImport)) {
          throw new Error('Invalid JSON format. Expected an array of services.')
        }

        const maxExistingId = services.length > 0 ? Math.max(...services.map(service => parseInt(service.id) || 0)) : 0
        
        const importedServices = servicesToImport.map((service: any, index: number) => ({
          id: (maxExistingId + index + 1).toString(),
          name: service.name || '',
          status: service.status || 'active',
          category: service.category || 'Technical',
          description: service.description || '',
          createdAt: service.createdAt || new Date().toISOString()
        }))

        setServices(prevServices => [...prevServices, ...importedServices])
        
        toast({
          title: "Services Imported Successfully! 📥",
          description: `Successfully imported ${importedServices.length} service(s) from the JSON file.`,
          duration: 5000,
          variant: "success",
        })
      } catch (error) {
        console.error('Import failed:', error)
        toast({
          title: "Import Failed! ❌",
          description: "Please check the file format and try again. Make sure the JSON file contains valid service data.",
          duration: 5000,
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
    
    event.target.value = ''
  }, [setServices, toast])

  const summaryStats = useMemo(() => {
    const activeServices = services.filter(s => s.status === 'active').length
    const inactiveServices = services.filter(s => s.status === 'inactive').length

    return {
      total: services.length,
      active: activeServices,
      inactive: inactiveServices
    }
  }, [services])

  const handleClearAdvancedFilters = useCallback(() => {
    // This function is handled by the parent component
    // The parent component will reset the filter states
  }, [])

  return {
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
  }
}
