import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface ServiceSearchAndFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  setCurrentPage: (page: number) => void
  statusFilter: string
  setStatusFilter: (filter: string) => void
  frequencyFilter: string
  setFrequencyFilter: (filter: string) => void
  cardSortBy: string
  cardSortDirection: "asc" | "desc"
  handleCardSort: (sortOption: string) => void
  setShowAdvancedFilter: (show: boolean) => void
}

export const ServiceSearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  setCurrentPage,
  statusFilter,
  setStatusFilter,
  frequencyFilter,
  setFrequencyFilter,
  cardSortBy,
  cardSortDirection,
  handleCardSort,
  setShowAdvancedFilter
}: ServiceSearchAndFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10 w-full"
          />
        </div>

        <Select value={statusFilter} onValueChange={(value) => {
          setStatusFilter(value)
          setCurrentPage(1)
        }}>
          <SelectTrigger className="w-full sm:w-40 h-9">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>

        <Select value={frequencyFilter} onValueChange={(value) => {
          setFrequencyFilter(value)
          setCurrentPage(1)
        }}>
          <SelectTrigger className="w-full sm:w-40 h-9">
            <SelectValue placeholder="All Frequencies" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Frequencies</SelectItem>
            <SelectItem value="Monthly">Monthly</SelectItem>
            <SelectItem value="Quarterly">Quarterly</SelectItem>
            <SelectItem value="Semi-Annually">Semi-Annually</SelectItem>
            <SelectItem value="Annually">Annually</SelectItem>
          </SelectContent>
        </Select>

        <Select value={`${cardSortBy}-${cardSortDirection}`} onValueChange={handleCardSort}>
          <SelectTrigger className="w-full sm:w-48 h-9">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Service Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Service Name (Z-A)</SelectItem>
            <SelectItem value="frequency-asc">Frequency (A-Z)</SelectItem>
            <SelectItem value="frequency-desc">Frequency (Z-A)</SelectItem>
            <SelectItem value="progress-asc">Progress (Low to High)</SelectItem>
            <SelectItem value="progress-desc">Progress (High to Low)</SelectItem>
            <SelectItem value="assets-asc">Assets (Fewest First)</SelectItem>
            <SelectItem value="assets-desc">Assets (Most First)</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" className="h-9" onClick={() => setShowAdvancedFilter(true)}>
          <Filter className="h-4 w-4 mr-2" />
          Advanced
        </Button>
      </div>
    </div>
  )
}
