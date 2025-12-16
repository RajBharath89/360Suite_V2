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
  roleFilter: string
  setRoleFilter: (filter: string) => void
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
  roleFilter,
  setRoleFilter,
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
            placeholder="Search users..."
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

        <Select value={roleFilter} onValueChange={(value) => {
          setRoleFilter(value)
          setCurrentPage(1)
        }}>
          <SelectTrigger className="w-full sm:w-40 h-9">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
            <SelectItem value="Tester">Tester</SelectItem>
            <SelectItem value="Client">Client</SelectItem>
          </SelectContent>
        </Select>

        {viewMode === "card" && (
          <Select value={`${cardSortBy}-${cardSortDirection}`} onValueChange={handleCardSort}>
            <SelectTrigger className="w-full sm:w-48 h-9">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fullName-asc">Full Name (A-Z)</SelectItem>
              <SelectItem value="fullName-desc">Full Name (Z-A)</SelectItem>
              <SelectItem value="role-asc">Role (A-Z)</SelectItem>
              <SelectItem value="role-desc">Role (Z-A)</SelectItem>
              <SelectItem value="status-asc">Status (A-Z)</SelectItem>
              <SelectItem value="status-desc">Status (Z-A)</SelectItem>
              <SelectItem value="email-asc">Email (A-Z)</SelectItem>
              <SelectItem value="email-desc">Email (Z-A)</SelectItem>
              <SelectItem value="lastActive-asc">Last Active (Oldest First)</SelectItem>
              <SelectItem value="lastActive-desc">Last Active (Newest First)</SelectItem>
              <SelectItem value="specializations-asc">Specializations (Fewest First)</SelectItem>
              <SelectItem value="specializations-desc">Specializations (Most First)</SelectItem>
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
