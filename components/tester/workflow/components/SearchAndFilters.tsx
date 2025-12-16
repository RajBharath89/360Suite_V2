import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface SearchAndFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  setCurrentPage: (page: number) => void
  statusFilter: string
  setStatusFilter: (filter: string) => void
  managerFilter: string
  setManagerFilter: (filter: string) => void
  cardSortBy: string
  cardSortDirection: "asc" | "desc"
  handleCardSort: (sortOption: string) => void
  setShowAdvancedFilter: (show: boolean) => void
  managers: string[]
}

export const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  setCurrentPage,
  statusFilter,
  setStatusFilter,
  managerFilter,
  setManagerFilter,
  cardSortBy,
  cardSortDirection,
  handleCardSort,
  setShowAdvancedFilter,
  managers
}: SearchAndFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search clients..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>

        <Select value={managerFilter} onValueChange={(value) => {
          setManagerFilter(value)
          setCurrentPage(1)
        }}>
          <SelectTrigger className="w-full sm:w-40 h-9">
            <SelectValue placeholder="All Managers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Managers</SelectItem>
            {managers.map(manager => (
              <SelectItem key={manager} value={manager}>{manager}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={`${cardSortBy}-${cardSortDirection}`} onValueChange={handleCardSort}>
          <SelectTrigger className="w-full sm:w-48 h-9">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="companyName-asc">Company Name (A-Z)</SelectItem>
            <SelectItem value="companyName-desc">Company Name (Z-A)</SelectItem>
            <SelectItem value="industry-asc">Industry (A-Z)</SelectItem>
            <SelectItem value="industry-desc">Industry (Z-A)</SelectItem>
            <SelectItem value="overallProgress-asc">Progress (Low to High)</SelectItem>
            <SelectItem value="overallProgress-desc">Progress (High to Low)</SelectItem>
            <SelectItem value="services-asc">Services (Fewest First)</SelectItem>
            <SelectItem value="services-desc">Services (Most First)</SelectItem>
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
