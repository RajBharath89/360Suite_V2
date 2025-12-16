import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, Shield, ExternalLink } from "lucide-react"
import { ServiceSearchAndFilters } from "./ServiceSearchAndFilters"
import { PaginationControls } from "./PaginationControls"

interface Service {
  id: string
  name: string
  frequency: string
  assets: string[]
  progress: number
  currentStage: number
  status: string
  timeline?: any
}

interface ServiceListViewProps {
  services: Service[]
  clientName: string
  onSelectService: (serviceId: string) => void
}

export function ServiceListView({ services, clientName, onSelectService }: ServiceListViewProps) {
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  
  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [frequencyFilter, setFrequencyFilter] = useState("all")
  const [cardSortBy, setCardSortBy] = useState("name")
  const [cardSortDirection, setCardSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>
      case 'blocked':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Blocked</Badge>
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Pending</Badge>
    }
  }

  const getStageName = (stageId: number) => {
    const stageNames = [
      "Client Onboarding",
      "Client Assignment",
      "Client Review",
      "Service Assessment",
      "Task Assignment",
      "Pre-Task Assessment",
      "Task Execution",
      "Report Generation",
      "Self-Review",
      "Manager Review",
      "Client Review"
    ]
    return stageNames[stageId] || "Unknown"
  }

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let filtered = services

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.frequency.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(service => service.status === statusFilter)
    }

    // Frequency filter
    if (frequencyFilter !== 'all') {
      filtered = filtered.filter(service => service.frequency === frequencyFilter)
    }

    return filtered
  }, [services, searchTerm, statusFilter, frequencyFilter])

  // Sort services
  const sortedServices = useMemo(() => {
    const sorted = [...filteredServices].sort((a, b) => {
      let aValue: any = a[cardSortBy as keyof typeof a]
      let bValue: any = b[cardSortBy as keyof typeof b]

      if (cardSortBy === 'assets') {
        aValue = a.assets.length
        bValue = b.assets.length
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
  }, [filteredServices, cardSortBy, cardSortDirection])

  // Pagination
  const paginationData = useMemo(() => {
    const totalItems = sortedServices.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedServices = sortedServices.slice(startIndex, endIndex)

    return {
      totalItems,
      totalPages,
      startIndex,
      endIndex,
      paginatedServices
    }
  }, [sortedServices, currentPage, itemsPerPage])

  // Card sort handler
  const handleCardSort = useCallback((sortOption: string) => {
    const [field, direction] = sortOption.split('-')
    setCardSortBy(field)
    setCardSortDirection(direction as "asc" | "desc")
    setCurrentPage(1)
  }, [])

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{clientName}</h2>
        <p className="text-gray-600 mt-1">Select a service to view its workflow timeline</p>
      </div>

      {/* Main Content Card */}
      <Card>
        <CardContent className="px-4 pt-0 pb-0">
          {/* Search and Filter Section */}
          <ServiceSearchAndFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            frequencyFilter={frequencyFilter}
            setFrequencyFilter={setFrequencyFilter}
            cardSortBy={cardSortBy}
            cardSortDirection={cardSortDirection}
            handleCardSort={handleCardSort}
            setShowAdvancedFilter={setShowAdvancedFilter}
          />

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginationData.paginatedServices.map((service) => (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  hoveredService === service.id ? 'border-cyan-600 border-2' : ''
                }`}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                onClick={() => onSelectService(service.id)}
              >
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-cyan-600" />
                      </div>
                      {getStatusBadge(service.status)}
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">Frequency: {service.frequency}</p>
                    </div>
                    
                    {service.timeline && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-semibold text-gray-900">{Math.round(service.progress)}%</span>
                        </div>
                        <Progress value={service.progress} className="h-2" />
                        <p className="text-xs text-gray-500">
                          Current Stage: {getStageName(service.currentStage)}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        {service.assets.length} Asset{service.assets.length !== 1 ? 's' : ''}
                      </Badge>
                      {service.timeline?.assignedManager && (
                        <Badge variant="outline" className="text-xs">
                          Manager: {service.timeline.assignedManager}
                        </Badge>
                      )}
                      {service.timeline?.assignedTester && (
                        <Badge variant="outline" className="text-xs">
                          Tester: {service.timeline.assignedTester}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
    </div>
  )
}
