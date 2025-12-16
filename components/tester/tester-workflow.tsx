"use client"

import { useState, useMemo, useCallback } from "react"
import { useWorkflow } from "./workflow/hooks/useWorkflow"
import { BreadcrumbNav } from "./workflow/components/BreadcrumbNav"
import { WorkflowFilters } from "./workflow/components/WorkflowFilters"
import { ServiceListView } from "./workflow/components/ServiceListView"
import { TimelineView } from "./workflow/components/TimelineView"
import { SearchAndFilters } from "./workflow/components/SearchAndFilters"
import { ClientCardView } from "./workflow/components/ClientCardView"
import { SummaryCards } from "./workflow/components/SummaryCards"
import { PaginationControls } from "./workflow/components/PaginationControls"
import { AdvancedFilterSheet } from "./workflow/components/AdvancedFilterSheet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockUsers } from "./workflow/data/mockWorkflowData"
import { Workflow } from "lucide-react"

export default function TesterWorkflow() {
  const workflow = useWorkflow()
  
  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [managerFilter, setManagerFilter] = useState("all")
  const [cardSortBy, setCardSortBy] = useState("companyName")
  const [cardSortDirection, setCardSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false)
  
  // Advanced filter states
  const [industryFilter, setIndustryFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [licenseTypeFilter, setLicenseTypeFilter] = useState("all")
  const [minServices, setMinServices] = useState("")
  const [maxServices, setMaxServices] = useState("")
  const [minProgress, setMinProgress] = useState("")
  const [maxProgress, setMaxProgress] = useState("")
  const [dateRangeFilter, setDateRangeFilter] = useState<{start: string, end: string}>({start: "", end: ""})

  const handleFilterChange = (filter: string, value: string) => {
    if (value === 'all') {
      workflow.updateFilters({ [filter]: undefined })
    } else {
      workflow.updateFilters({ [filter]: value })
    }
  }

  const getClientName = () => {
    if (!workflow.currentClientId) return ''
    const client = workflow.clients.find(c => c.id === workflow.currentClientId)
    return client?.companyName || ''
  }

  const getServiceName = () => {
    if (!workflow.currentServiceId) return ''
    const service = workflow.currentClientServices.find(s => s.id === workflow.currentServiceId)
    return service?.name || ''
  }

  // Filter and sort clients - Only show clients with stages
  const filteredClients = useMemo(() => {
    // First filter: Only show clients that have services with timeline data (stages)
    let filtered = workflow.clients.filter(client => 
      client.services.some(service => service.timeline !== undefined)
    )

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.industry.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(client => {
        if (statusFilter === 'active') return client.overallProgress > 0 && client.overallProgress < 100
        if (statusFilter === 'completed') return client.overallProgress >= 100
        if (statusFilter === 'blocked') return client.status === 'blocked'
        if (statusFilter === 'overdue') return client.status === 'overdue'
        return true
      })
    }

    // Manager filter
    if (managerFilter !== 'all') {
      filtered = filtered.filter(client => {
        return client.services.some(service => service.timeline?.assignedManager === managerFilter)
      })
    }

    // Industry filter
    if (industryFilter) {
      filtered = filtered.filter(client =>
        client.industry.toLowerCase().includes(industryFilter.toLowerCase())
      )
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter(client =>
        client.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    // License type filter
    if (licenseTypeFilter !== 'all') {
      filtered = filtered.filter(client => client.licenseType === licenseTypeFilter)
    }

    // Services count range filter
    if (minServices || maxServices) {
      filtered = filtered.filter(client => {
        const serviceCount = client.services.length
        const min = minServices ? parseInt(minServices) : 0
        const max = maxServices ? parseInt(maxServices) : Infinity
        return serviceCount >= min && serviceCount <= max
      })
    }

    // Progress range filter
    if (minProgress || maxProgress) {
      filtered = filtered.filter(client => {
        const progress = client.overallProgress
        const min = minProgress ? parseFloat(minProgress) : 0
        const max = maxProgress ? parseFloat(maxProgress) : 100
        return progress >= min && progress <= max
      })
    }

    // Date range filter
    if (dateRangeFilter.start || dateRangeFilter.end) {
      filtered = filtered.filter(client => {
        const startDate = client.startDate
        const endDate = client.endDate
        
        if (dateRangeFilter.start && startDate < dateRangeFilter.start) return false
        if (dateRangeFilter.end && endDate > dateRangeFilter.end) return false
        
        return true
      })
    }

    return filtered
  }, [workflow.clients, searchTerm, statusFilter, managerFilter, industryFilter, locationFilter, licenseTypeFilter, minServices, maxServices, minProgress, maxProgress, dateRangeFilter])

  // Sort clients
  const sortedClients = useMemo(() => {
    const sorted = [...filteredClients].sort((a, b) => {
      let aValue: any = a[cardSortBy as keyof typeof a]
      let bValue: any = b[cardSortBy as keyof typeof b]

      if (cardSortBy === 'services') {
        aValue = a.services.length
        bValue = b.services.length
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (cardSortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return sorted
  }, [filteredClients, cardSortBy, cardSortDirection])

  // Pagination
  const paginationData = useMemo(() => {
    const totalItems = sortedClients.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedClients = sortedClients.slice(startIndex, endIndex)

    return {
      totalItems,
      totalPages,
      startIndex,
      endIndex,
      paginatedClients
    }
  }, [sortedClients, currentPage, itemsPerPage])

  // Summary statistics - Only count clients with stages
  const summaryStats = useMemo(() => {
    // Only count clients that have services with timeline data (stages)
    const clientsWithStages = workflow.clients.filter(client => 
      client.services.some(service => service.timeline !== undefined)
    )
    
    const total = clientsWithStages.length
    const active = clientsWithStages.filter(c => c.overallProgress > 0 && c.overallProgress < 100).length
    const completed = clientsWithStages.filter(c => c.overallProgress >= 100).length
    const inProgress = clientsWithStages.filter(c => c.overallProgress > 0 && c.overallProgress < 100).length
    const blocked = clientsWithStages.filter(c => c.status === 'blocked').length
    const overdue = clientsWithStages.filter(c => c.status === 'overdue').length

    return { total, active, completed, inProgress, blocked, overdue }
  }, [workflow.clients])

  // Card sort handler
  const handleCardSort = useCallback((sortOption: string) => {
    const [field, direction] = sortOption.split('-')
    setCardSortBy(field)
    setCardSortDirection(direction as "asc" | "desc")
    setCurrentPage(1)
  }, [])

  // Clear advanced filters handler
  const handleClearAdvancedFilters = useCallback(() => {
    setIndustryFilter("")
    setLocationFilter("")
    setLicenseTypeFilter("all")
    setMinServices("")
    setMaxServices("")
    setMinProgress("")
    setMaxProgress("")
    setDateRangeFilter({start: "", end: ""})
    setCurrentPage(1)
  }, [])

  const renderCurrentView = () => {
    switch (workflow.currentView) {
      case 'clients':
        return (
          <ClientCardView
            paginatedClients={paginationData.paginatedClients}
            onSelectClient={workflow.selectClient}
          />
        )
      case 'services':
        return (
          <ServiceListView
            services={workflow.currentClientServices}
            clientName={getClientName()}
            onSelectService={workflow.selectService}
          />
        )
      case 'timeline':
        return (
          <TimelineView
            timeline={workflow.currentTimeline}
            serviceName={getServiceName()}
            onUpdateStatus={(stageId, status, progress) => 
              workflow.updateStageStatus(
                workflow.currentServiceId!,
                workflow.currentClientId!,
                stageId,
                status as 'pending' | 'in-progress' | 'completed' | 'blocked' | 'overdue',
                progress
              )
            }
            onAssignUser={(stageId, userId, role) =>
              workflow.assignUser(
                workflow.currentServiceId!,
                workflow.currentClientId!,
                stageId,
                userId,
                role as 'admin' | 'manager' | 'tester' | 'client'
              )
            }
            onAddComment={(stageId, comment) =>
              workflow.addComment(
                workflow.currentServiceId!,
                workflow.currentClientId!,
                stageId,
                comment
              )
            }
            onUploadFile={(stageId, file) =>
              workflow.uploadAttachment(
                workflow.currentServiceId!,
                workflow.currentClientId!,
                stageId,
                file
              )
            }
            onGenerateReport={() =>
              workflow.generateReport(
                workflow.currentServiceId!,
                workflow.currentClientId!
              )
            }
            onSubmitForReview={(stageId) =>
              workflow.submitForReview(
                workflow.currentServiceId!,
                workflow.currentClientId!,
                stageId
              )
            }
            onApprove={(stageId) =>
              workflow.approveStage(
                workflow.currentServiceId!,
                workflow.currentClientId!,
                stageId
              )
            }
            onReject={(stageId, reason) =>
              workflow.rejectStage(
                workflow.currentServiceId!,
                workflow.currentClientId!,
                stageId,
                reason
              )
            }
            onClientFeedback={(satisfied, feedback) =>
              workflow.clientSatisfaction(
                workflow.currentServiceId!,
                workflow.currentClientId!,
                satisfied,
                feedback
              )
            }
          />
        )
      default:
        return null
    }
  }

  const handleNavigation = (view: 'clients' | 'services' | 'timeline') => {
    switch (view) {
      case 'clients':
        workflow.navigateToClients()
        break
      case 'services':
        // Navigate back to services view for current client
        if (workflow.currentClientId) {
          workflow.selectClient(workflow.currentClientId)
        }
        break
      case 'timeline':
        // Timeline view doesn't need a separate navigation handler
        break
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
                <Workflow className="h-7 w-7 text-cyan-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Workflow Management</h1>
                <p className="text-gray-600 text-sm">Track and manage client-service workflow progress</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards - Only show in client list view */}
      {workflow.currentView === 'clients' && (
        <SummaryCards summaryStats={summaryStats} />
      )}

      {/* Breadcrumb Navigation - Only show in client list view */}
      {workflow.currentView === 'clients' && (
        <BreadcrumbNav
          currentView={workflow.currentView}
          clientName={getClientName()}
          serviceName={getServiceName()}
          onNavigate={handleNavigation}
        />
        )}

        {/* Instruction Text - Only show in client list view */}
        {workflow.currentView === 'clients' && (
          <p className="text-gray-600">Select a client to view its services and workflow</p>
        )}

      {/* Main Content Card - Only show in client list view */}
      {workflow.currentView === 'clients' && (
        <Card>
          <CardContent className="px-4 pt-0 pb-0">
            {/* Search and Filter Section */}
            <SearchAndFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setCurrentPage={setCurrentPage}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              managerFilter={managerFilter}
              setManagerFilter={setManagerFilter}
              cardSortBy={cardSortBy}
              cardSortDirection={cardSortDirection}
              handleCardSort={handleCardSort}
              setShowAdvancedFilter={setShowAdvancedFilter}
              managers={mockUsers.managers}
            />

            {/* Results */}
            {renderCurrentView()}

            {/* Pagination Controls */}
            <PaginationControls
              startIndex={paginationData.startIndex}
              endIndex={paginationData.endIndex}
              totalItems={paginationData.totalItems}
              currentPage={currentPage}
              totalPages={paginationData.totalPages}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </CardContent>
        </Card>
      )}

      {/* Breadcrumb Navigation for other views (Services, Timeline) */}
      {workflow.currentView !== 'clients' && (
        <BreadcrumbNav
          currentView={workflow.currentView}
          clientName={getClientName()}
          serviceName={getServiceName()}
          onNavigate={handleNavigation}
        />
      )}

      {/* Other Views (Services, Timeline) */}
      {workflow.currentView !== 'clients' && renderCurrentView()}

      {/* Advanced Filter Sheet */}
      <AdvancedFilterSheet
        showAdvancedFilter={showAdvancedFilter}
        setShowAdvancedFilter={setShowAdvancedFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        managerFilter={managerFilter}
        setManagerFilter={setManagerFilter}
        industryFilter={industryFilter}
        setIndustryFilter={setIndustryFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        licenseTypeFilter={licenseTypeFilter}
        setLicenseTypeFilter={setLicenseTypeFilter}
        minServices={minServices}
        setMinServices={setMinServices}
        maxServices={maxServices}
        setMaxServices={setMaxServices}
        minProgress={minProgress}
        setMinProgress={setMinProgress}
        maxProgress={maxProgress}
        setMaxProgress={setMaxProgress}
        dateRangeFilter={dateRangeFilter}
        setDateRangeFilter={setDateRangeFilter}
        managers={mockUsers.managers}
        handleClearAdvancedFilters={handleClearAdvancedFilters}
      />
    </div>
  )
}
