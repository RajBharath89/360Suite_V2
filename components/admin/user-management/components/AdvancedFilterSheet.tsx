import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AdvancedFilterSheetProps {
  showAdvancedFilter: boolean
  setShowAdvancedFilter: (show: boolean) => void
  roleFilter: string
  setRoleFilter: (filter: string) => void
  statusFilter: string
  setStatusFilter: (filter: string) => void
  specializationFilter: string
  setSpecializationFilter: (filter: string) => void
  reportingToFilter: string
  setReportingToFilter: (filter: string) => void
  minSpecializations: string
  setMinSpecializations: (value: string) => void
  maxSpecializations: string
  setMaxSpecializations: (value: string) => void
  dateRangeFilter: {start: string, end: string}
  setDateRangeFilter: (filter: {start: string, end: string}) => void
  handleClearAdvancedFilters: () => void
}

export const AdvancedFilterSheet = ({
  showAdvancedFilter,
  setShowAdvancedFilter,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  specializationFilter,
  setSpecializationFilter,
  reportingToFilter,
  setReportingToFilter,
  minSpecializations,
  setMinSpecializations,
  maxSpecializations,
  setMaxSpecializations,
  dateRangeFilter,
  setDateRangeFilter,
  handleClearAdvancedFilters
}: AdvancedFilterSheetProps) => {
  return (
    <Sheet open={showAdvancedFilter} onOpenChange={setShowAdvancedFilter}>
      <SheetContent className="w-[500px] max-w-none flex flex-col p-0">
        <SheetHeader className="px-4 pt-4 pb-2 flex-shrink-0">
          <SheetTitle className="text-2xl font-bold">Advanced Filters</SheetTitle>
          <SheetDescription>
            Use advanced filters to find users more precisely
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Role Filter */}
          <div className="space-y-2">
            <Label htmlFor="roleFilter">Role</Label>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger id="roleFilter">
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
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="statusFilter">Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="statusFilter">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Specialization Filter */}
          <div className="space-y-2">
            <Label htmlFor="specializationFilter">Specialization (Contains)</Label>
            <Input
              id="specializationFilter"
              placeholder="Enter specialization"
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
            />
          </div>

          {/* Reporting To Filter */}
          <div className="space-y-2">
            <Label htmlFor="reportingToFilter">Reports To (Contains)</Label>
            <Input
              id="reportingToFilter"
              placeholder="Enter manager name"
              value={reportingToFilter}
              onChange={(e) => setReportingToFilter(e.target.value)}
            />
          </div>

          {/* Specializations Count Range */}
          <div className="space-y-2">
            <Label>Number of Specializations</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Min"
                value={minSpecializations}
                onChange={(e) => setMinSpecializations(e.target.value)}
                min="0"
              />
              <span className="text-gray-500">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxSpecializations}
                onChange={(e) => setMaxSpecializations(e.target.value)}
                min="0"
              />
            </div>
          </div>

          {/* Last Active Date Range Filter */}
          <div className="space-y-2">
            <Label>Last Active Date Range</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="date"
                placeholder="Start Date"
                value={dateRangeFilter.start}
                onChange={(e) => setDateRangeFilter({...dateRangeFilter, start: e.target.value})}
              />
              <span className="text-gray-500">to</span>
              <Input
                type="date"
                placeholder="End Date"
                value={dateRangeFilter.end}
                onChange={(e) => setDateRangeFilter({...dateRangeFilter, end: e.target.value})}
              />
            </div>
          </div>

          {/* Active Filters Summary */}
          {(roleFilter !== "all" || statusFilter !== "all" || specializationFilter || reportingToFilter || minSpecializations || maxSpecializations || dateRangeFilter.start || dateRangeFilter.end) && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-sm mb-2 text-blue-900">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {roleFilter !== "all" && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Role: {roleFilter}
                  </Badge>
                )}
                {statusFilter !== "all" && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Status: {statusFilter}
                  </Badge>
                )}
                {specializationFilter && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Specialization: {specializationFilter}
                  </Badge>
                )}
                {reportingToFilter && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Reports To: {reportingToFilter}
                  </Badge>
                )}
                {(minSpecializations || maxSpecializations) && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Specializations: {minSpecializations || "0"}-{maxSpecializations || "∞"}
                  </Badge>
                )}
                {(dateRangeFilter.start || dateRangeFilter.end) && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Last Active: {dateRangeFilter.start || "Start"} to {dateRangeFilter.end || "End"}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="gap-2 px-4 pt-4 pb-4 flex-shrink-0 border-t bg-white">
          <Button 
            variant="outline" 
            onClick={handleClearAdvancedFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
          <Button 
            className="w-full bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white"
            onClick={() => setShowAdvancedFilter(false)}
          >
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
