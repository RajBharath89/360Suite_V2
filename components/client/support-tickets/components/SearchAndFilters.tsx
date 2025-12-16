import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Grid3X3, List } from "lucide-react"

interface SearchAndFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  setCurrentPage: (page: number) => void
  viewMode: "table" | "card"
  setViewMode: (mode: "table" | "card") => void
  statusFilter: string
  setStatusFilter: (filter: string) => void
  priorityFilter: string
  setPriorityFilter: (filter: string) => void
  setShowAdvancedFilter: (show: boolean) => void
}

export const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  setCurrentPage,
  viewMode,
  setViewMode,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  setShowAdvancedFilter
}: SearchAndFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10 w-full"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
            className={viewMode === "table" ? "bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white shadow" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "card" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("card")}
            className={viewMode === "card" ? "bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white shadow" : ""}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>

        <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value); setCurrentPage(1) }}>
          <SelectTrigger className="w-full sm:w-40 h-9">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on_hold">On Hold</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={(value) => { setPriorityFilter(value); setCurrentPage(1) }}>
          <SelectTrigger className="w-full sm:w-40 h-9">
            <SelectValue placeholder="All Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
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


