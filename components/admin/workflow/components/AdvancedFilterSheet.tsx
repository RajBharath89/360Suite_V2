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
  statusFilter: string
  setStatusFilter: (filter: string) => void
  managerFilter: string
  setManagerFilter: (filter: string) => void
  industryFilter: string
  setIndustryFilter: (filter: string) => void
  locationFilter: string
  setLocationFilter: (filter: string) => void
  licenseTypeFilter: string
  setLicenseTypeFilter: (filter: string) => void
  minServices: string
  setMinServices: (value: string) => void
  maxServices: string
  setMaxServices: (value: string) => void
  minProgress: string
  setMinProgress: (value: string) => void
  maxProgress: string
  setMaxProgress: (value: string) => void
  dateRangeFilter: {start: string, end: string}
  setDateRangeFilter: (filter: {start: string, end: string}) => void
  managers: string[]
  handleClearAdvancedFilters: () => void
}

export const AdvancedFilterSheet = ({
  showAdvancedFilter,
  setShowAdvancedFilter,
  statusFilter,
  setStatusFilter,
  managerFilter,
  setManagerFilter,
  industryFilter,
  setIndustryFilter,
  locationFilter,
  setLocationFilter,
  licenseTypeFilter,
  setLicenseTypeFilter,
  minServices,
  setMinServices,
  maxServices,
  setMaxServices,
  minProgress,
  setMinProgress,
  maxProgress,
  setMaxProgress,
  dateRangeFilter,
  setDateRangeFilter,
  managers,
  handleClearAdvancedFilters
}: AdvancedFilterSheetProps) => {
  return (
    <Sheet open={showAdvancedFilter} onOpenChange={setShowAdvancedFilter}>
      <SheetContent className="w-[500px] max-w-none flex flex-col p-0">
        <SheetHeader className="px-4 pt-4 pb-2 flex-shrink-0">
          <SheetTitle className="text-2xl font-bold">Advanced Filters</SheetTitle>
          <SheetDescription>
            Use advanced filters to find clients more precisely
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Manager Filter */}
          <div className="space-y-2">
            <Label htmlFor="managerFilter">Manager</Label>
            <Select value={managerFilter} onValueChange={setManagerFilter}>
              <SelectTrigger id="managerFilter">
                <SelectValue placeholder="All Managers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Managers</SelectItem>
                {managers.map(manager => (
                  <SelectItem key={manager} value={manager}>{manager}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Industry Filter */}
          <div className="space-y-2">
            <Label htmlFor="industryFilter">Industry (Contains)</Label>
            <Input
              id="industryFilter"
              placeholder="Enter industry"
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
            />
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <Label htmlFor="locationFilter">Location (Contains)</Label>
            <Input
              id="locationFilter"
              placeholder="Enter location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>

          {/* License Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="licenseTypeFilter">License Type</Label>
            <Select value={licenseTypeFilter} onValueChange={setLicenseTypeFilter}>
              <SelectTrigger id="licenseTypeFilter">
                <SelectValue placeholder="All License Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All License Types</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Services Count Range */}
          <div className="space-y-2">
            <Label>Number of Services</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Min"
                value={minServices}
                onChange={(e) => setMinServices(e.target.value)}
                min="0"
              />
              <span className="text-gray-500">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxServices}
                onChange={(e) => setMaxServices(e.target.value)}
                min="0"
              />
            </div>
          </div>

          {/* Progress Range */}
          <div className="space-y-2">
            <Label>Overall Progress (%)</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Min"
                value={minProgress}
                onChange={(e) => setMinProgress(e.target.value)}
                min="0"
                max="100"
              />
              <span className="text-gray-500">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxProgress}
                onChange={(e) => setMaxProgress(e.target.value)}
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* Contract Date Range Filter */}
          <div className="space-y-2">
            <Label>Contract Date Range</Label>
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
          {(statusFilter !== "all" || managerFilter !== "all" || industryFilter || locationFilter || licenseTypeFilter !== "all" || minServices || maxServices || minProgress || maxProgress || dateRangeFilter.start || dateRangeFilter.end) && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-sm mb-2 text-blue-900">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {statusFilter !== "all" && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Status: {statusFilter}
                  </Badge>
                )}
                {managerFilter !== "all" && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Manager: {managerFilter}
                  </Badge>
                )}
                {industryFilter && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Industry: {industryFilter}
                  </Badge>
                )}
                {locationFilter && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Location: {locationFilter}
                  </Badge>
                )}
                {licenseTypeFilter !== "all" && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    License: {licenseTypeFilter}
                  </Badge>
                )}
                {(minServices || maxServices) && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Services: {minServices || "0"}-{maxServices || "∞"}
                  </Badge>
                )}
                {(minProgress || maxProgress) && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Progress: {minProgress || "0"}%-{maxProgress || "100"}%
                  </Badge>
                )}
                {(dateRangeFilter.start || dateRangeFilter.end) && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Contract: {dateRangeFilter.start || "Start"} to {dateRangeFilter.end || "End"}
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
