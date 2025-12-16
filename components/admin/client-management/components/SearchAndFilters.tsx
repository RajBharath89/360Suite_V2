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
  industryFilter: string
  setIndustryFilter: (filter: string) => void
  cardSortBy: string
  cardSortDirection: "asc" | "desc"
  handleCardSort: (sortOption: string) => void
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
  industryFilter,
  setIndustryFilter,
  cardSortBy,
  cardSortDirection,
  handleCardSort,
  setShowAdvancedFilter
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
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select value={industryFilter} onValueChange={(value) => {
          setIndustryFilter(value)
          setCurrentPage(1)
        }}>
          <SelectTrigger className="w-full sm:w-40 h-9">
            <SelectValue placeholder="All Industries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Banking">Banking</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Retail">Retail</SelectItem>
            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
          </SelectContent>
        </Select>

        {viewMode === "card" && (
          <Select value={`${cardSortBy}-${cardSortDirection}`} onValueChange={handleCardSort}>
            <SelectTrigger className="w-full sm:w-48 h-9">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="companyName-asc">Company Name (A-Z)</SelectItem>
              <SelectItem value="companyName-desc">Company Name (Z-A)</SelectItem>
              <SelectItem value="industry-asc">Industry (A-Z)</SelectItem>
              <SelectItem value="industry-desc">Industry (Z-A)</SelectItem>
              <SelectItem value="status-asc">Status (A-Z)</SelectItem>
              <SelectItem value="status-desc">Status (Z-A)</SelectItem>
              <SelectItem value="licenseType-asc">License Type (A-Z)</SelectItem>
              <SelectItem value="licenseType-desc">License Type (Z-A)</SelectItem>
              <SelectItem value="location-asc">Location (A-Z)</SelectItem>
              <SelectItem value="location-desc">Location (Z-A)</SelectItem>
              <SelectItem value="startDate-asc">Start Date (Oldest First)</SelectItem>
              <SelectItem value="startDate-desc">Start Date (Newest First)</SelectItem>
              <SelectItem value="endDate-asc">End Date (Oldest First)</SelectItem>
              <SelectItem value="endDate-desc">End Date (Newest First)</SelectItem>
              <SelectItem value="contacts-asc">Contacts (Fewest First)</SelectItem>
              <SelectItem value="contacts-desc">Contacts (Most First)</SelectItem>
              <SelectItem value="services-asc">Services (Fewest First)</SelectItem>
              <SelectItem value="services-desc">Services (Most First)</SelectItem>
              <SelectItem value="assets-asc">Assets (Fewest First)</SelectItem>
              <SelectItem value="assets-desc">Assets (Most First)</SelectItem>
            </SelectContent>
          </Select>
        )}

        <Button variant="outline" size="sm" className="h-9" onClick={() => setShowAdvancedFilter(true)}>
          <Filter className="h-4 w-4 mr-2" />
          Advanced
        </Button>
      </div>
    </div>
  )
}
