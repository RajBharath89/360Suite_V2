import { useMemo, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface UseClientManagementProps {
  clients: any[]
  setClients: (clients: any[]) => void
  searchTerm: string
  statusFilter: string
  industryFilter: string
  licenseTypeFilter: string
  locationFilter: string
  companyNameFilter: string
  minServices: string
  maxServices: string
  minContacts: string
  maxContacts: string
  minAssets: string
  maxAssets: string
  dateRangeFilter: {start: string, end: string}
  endDateRangeFilter: {start: string, end: string}
  sortBy: string
  sortDirection: "asc" | "desc"
  cardSortBy: string
  cardSortDirection: "asc" | "desc"
  viewMode: "table" | "card"
  currentPage: number
  itemsPerPage: number
  setCurrentPage: (page: number) => void
  editingClient: any
  setEditingClient: (client: any) => void
  setSelectedClient: (client: any) => void
  clientToDelete: any
  setClientToDelete: (client: any) => void
  setShowEditModal: (show: boolean) => void
  setShowViewModal: (show: boolean) => void
  setShowDeleteModal: (show: boolean) => void
  setShowAddModal: (show: boolean) => void
  toast: any
}

export const useClientManagement = ({
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
}: UseClientManagementProps) => {
  
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || client.status === statusFilter
      const matchesIndustry = industryFilter === "all" || client.industry === industryFilter
      const matchesLicenseType = licenseTypeFilter === "all" || client.licenseType === licenseTypeFilter
      const matchesLocation = !locationFilter || client.location.toLowerCase().includes(locationFilter.toLowerCase())
      const matchesCompanyName = !companyNameFilter || client.companyName.toLowerCase().includes(companyNameFilter.toLowerCase())
      const matchesMinServices = !minServices || client.services.length >= parseInt(minServices)
      const matchesMaxServices = !maxServices || client.services.length <= parseInt(maxServices)
      const matchesMinContacts = !minContacts || client.contacts.length >= parseInt(minContacts)
      const matchesMaxContacts = !maxContacts || client.contacts.length <= parseInt(maxContacts)
      const totalAssets = client.services?.reduce((total: number, service: any) => total + (service.assets?.length || 0), 0) || 0
      const matchesMinAssets = !minAssets || totalAssets >= parseInt(minAssets)
      const matchesMaxAssets = !maxAssets || totalAssets <= parseInt(maxAssets)
      const matchesStartDateRange = (!dateRangeFilter.start || new Date(client.startDate) >= new Date(dateRangeFilter.start)) &&
                                   (!dateRangeFilter.end || new Date(client.startDate) <= new Date(dateRangeFilter.end))
      const matchesEndDateRange = (!endDateRangeFilter.start || new Date(client.endDate) >= new Date(endDateRangeFilter.start)) &&
                                  (!endDateRangeFilter.end || new Date(client.endDate) <= new Date(endDateRangeFilter.end))
      
      return matchesSearch && matchesStatus && matchesIndustry && matchesLicenseType && matchesLocation && matchesCompanyName && 
             matchesMinServices && matchesMaxServices && matchesMinContacts && matchesMaxContacts && matchesMinAssets && matchesMaxAssets &&
             matchesStartDateRange && matchesEndDateRange
    })
  }, [clients, searchTerm, statusFilter, industryFilter, licenseTypeFilter, locationFilter, companyNameFilter, 
      minServices, maxServices, minContacts, maxContacts, minAssets, maxAssets, dateRangeFilter, endDateRangeFilter])

  const sortedClients = useMemo(() => {
    return [...filteredClients].sort((a, b) => {
      let aValue: any
      let bValue: any

      // Use appropriate sort settings based on view mode
      const currentSortBy = viewMode === "card" ? cardSortBy : sortBy
      const currentSortDirection = viewMode === "card" ? cardSortDirection : sortDirection

      switch (currentSortBy) {
        case "companyName":
          aValue = a.companyName.toLowerCase()
          bValue = b.companyName.toLowerCase()
          break
        case "industry":
          aValue = a.industry.toLowerCase()
          bValue = b.industry.toLowerCase()
          break
        case "status":
          aValue = a.status.toLowerCase()
          bValue = b.status.toLowerCase()
          break
        case "licenseType":
          aValue = a.licenseType.toLowerCase()
          bValue = b.licenseType.toLowerCase()
          break
        case "startDate":
          aValue = new Date(a.startDate).getTime()
          bValue = new Date(b.startDate).getTime()
          break
        case "endDate":
          aValue = new Date(a.endDate).getTime()
          bValue = new Date(b.endDate).getTime()
          break
        case "location":
          aValue = a.location.toLowerCase()
          bValue = b.location.toLowerCase()
          break
        case "contacts":
          aValue = a.contacts.length
          bValue = b.contacts.length
          break
        case "services":
          aValue = a.services.length
          bValue = b.services.length
          break
        case "assets":
          aValue = a.services?.reduce((total: number, service: any) => total + (service.assets?.length || 0), 0) || 0
          bValue = b.services?.reduce((total: number, service: any) => total + (service.assets?.length || 0), 0) || 0
          break
        default:
          aValue = a.companyName.toLowerCase()
          bValue = b.companyName.toLowerCase()
      }

      if (aValue < bValue) return currentSortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return currentSortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [filteredClients, viewMode, cardSortBy, cardSortDirection, sortBy, sortDirection])

  // Pagination calculations
  const paginationData = useMemo(() => {
    const totalItems = sortedClients.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedClients = sortedClients.slice(startIndex, endIndex)
    
    return { totalItems, totalPages, startIndex, endIndex, paginatedClients }
  }, [sortedClients, itemsPerPage, currentPage])

  const handleTableSort = useCallback((column: string) => {
    // This would need to be handled by the parent component
    setCurrentPage(1)
  }, [setCurrentPage])

  const handleCardSort = useCallback((sortOption: string) => {
    // This would need to be handled by the parent component
    setCurrentPage(1)
  }, [setCurrentPage])

  const handleAddClient = useCallback((clientData: any) => {
    // Generate sequential ID based on existing clients
    const maxId = clients.length > 0 ? Math.max(...clients.map(client => parseInt(client.id) || 0)) : 0
    const newId = (maxId + 1).toString()
    
    const newClient = {
      id: newId,
      ...clientData,
      logo: "/placeholder-logo.svg",
      assets: clientData.services?.reduce((total: number, service: any) => total + (service.assets?.length || 0), 0) || 0
    }
    setClients(prevClients => [...prevClients, newClient])
  }, [setClients, clients])

  const handleToggleStatus = useCallback((clientId: string) => {
    setClients(prevClients => prevClients.map(client => 
      client.id === clientId 
        ? { ...client, status: client.status === "active" ? "inactive" : "active" }
        : client
    ))
  }, [setClients])

  const handleViewClient = useCallback((client: any) => {
    setSelectedClient(client)
    setShowViewModal(true)
  }, [setSelectedClient, setShowViewModal])

  const handleCloseViewModal = useCallback(() => {
    setShowViewModal(false)
    setSelectedClient(null)
  }, [setShowViewModal, setSelectedClient])

  const handleEditClient = useCallback((client: any) => {
    setEditingClient(client)
    setShowEditModal(true)
  }, [setEditingClient, setShowEditModal])

  const handleCloseEditModal = useCallback(() => {
    setShowEditModal(false)
    setEditingClient(null)
  }, [setShowEditModal, setEditingClient])

  const handleUpdateClient = useCallback((updatedClientData: any) => {
    setClients(prevClients => prevClients.map(client => 
      client.id === editingClient?.id 
        ? { ...client, ...updatedClientData }
        : client
    ))
    setShowEditModal(false)
    setEditingClient(null)
    
    // Show success toast
    toast({
      title: "Client Updated Successfully! 🎉",
      description: `${updatedClientData.companyName} has been updated with ${updatedClientData.contacts?.length || 0} contact(s) and ${updatedClientData.services?.length || 0} service(s).`,
      duration: 5000,
      variant: "success",
    })
  }, [setClients, setShowEditModal, setEditingClient, editingClient, toast])

  const handleDeleteClient = useCallback((client: any) => {
    setClientToDelete(client)
    setShowDeleteModal(true)
  }, [setClientToDelete, setShowDeleteModal])

  const confirmDeleteClient = useCallback(() => {
    if (clientToDelete) {
      const clientName = clientToDelete.companyName
      setClients(prevClients => prevClients.filter(client => client.id !== clientToDelete.id))
      setShowDeleteModal(false)
      setClientToDelete(null)
      
      // Show success toast
      toast({
        title: "Client Deleted Successfully! 🗑️",
        description: `${clientName} and all associated data have been permanently removed from your client list.`,
        duration: 5000,
        variant: "success",
      })
    }
  }, [clientToDelete, setClients, setShowDeleteModal, setClientToDelete, toast])

  const cancelDeleteClient = useCallback(() => {
    setShowDeleteModal(false)
    setClientToDelete(null)
  }, [setShowDeleteModal, setClientToDelete])

  const handleExportClients = useCallback(() => {
    try {
      const exportData = {
        exportDate: new Date().toISOString(),
        version: "1.0",
        clients: clients.map(client => ({
          companyName: client.companyName,
          industry: client.industry,
          location: client.location,
          status: client.status,
          licenseType: client.licenseType,
          startDate: client.startDate,
          endDate: client.endDate,
          notes: client.notes,
          contacts: client.contacts,
          services: client.services
        }))
      }

      const jsonContent = JSON.stringify(exportData, null, 2)
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `clients_export_${new Date().toISOString().split('T')[0]}.json`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    }
  }, [clients])

  const handleImportButtonClick = useCallback(() => {
    // Trigger the hidden file input
    const fileInput = document.querySelector('input[type="file"][accept=".json"]') as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }, [])

  const handleImportClients = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const importData = JSON.parse(text)
        
        // Handle both new format (with metadata) and direct client array
        const clientsToImport = importData.clients || importData
        
        if (!Array.isArray(clientsToImport)) {
          throw new Error('Invalid JSON format. Expected an array of clients.')
        }

        // Generate sequential IDs for imported clients
        const maxExistingId = clients.length > 0 ? Math.max(...clients.map(client => parseInt(client.id) || 0)) : 0
        
        const importedClients = clientsToImport.map((client: any, index: number) => ({
          id: (maxExistingId + index + 1).toString(),
          companyName: client.companyName || '',
          industry: client.industry || '',
          location: client.location || '',
          status: client.status || 'active',
          licenseType: client.licenseType || 'Standard',
          startDate: client.startDate || new Date().toISOString().split('T')[0],
          endDate: client.endDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          notes: client.notes || '',
          logo: '/placeholder-logo.svg',
          contacts: Array.isArray(client.contacts) ? client.contacts : [],
          services: Array.isArray(client.services) ? client.services.map((service: any, serviceIndex: number) => ({
            id: service.id || (serviceIndex + 1).toString(),
            name: service.name || 'Service',
            frequency: service.frequency || 'Monthly',
            assets: Array.isArray(service.assets) ? service.assets : []
          })) : []
        }))

        setClients(prevClients => [...prevClients, ...importedClients])
        
        // Show success toast
        toast({
          title: "Clients Imported Successfully! 📥",
          description: `Successfully imported ${importedClients.length} client(s) from the JSON file.`,
          duration: 5000,
          variant: "success",
        })
      } catch (error) {
        console.error('Import failed:', error)
        toast({
          title: "Import Failed! ❌",
          description: "Please check the file format and try again. Make sure the JSON file contains valid client data.",
          duration: 5000,
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
    
    // Reset the input
    event.target.value = ''
  }, [setClients, toast])


  // Memoized summary statistics
  const summaryStats = useMemo(() => {
    const activeClients = clients.filter(c => c.status === 'active').length
    const inactiveClients = clients.filter(c => c.status === 'inactive').length
    const professionalClients = clients.filter(c => c.status === 'active' && c.services.length > 0).length
    const enterpriseClients = clients.filter(c => c.licenseType === 'Enterprise').length
    const standardClients = clients.filter(c => c.industry === 'Banking' || c.industry === 'Healthcare').length

    return {
      total: clients.length,
      active: activeClients,
      inactive: inactiveClients,
      professional: professionalClients,
      enterprise: enterpriseClients,
      standard: standardClients
    }
  }, [clients])

  const handleClearAdvancedFilters = useCallback(() => {
    // This would need to be handled by the parent component
  }, [])

  return {
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
  }
}
