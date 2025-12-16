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
  licenseTypeFilter: string
  setLicenseTypeFilter: (filter: string) => void
  companyNameFilter: string
  setCompanyNameFilter: (filter: string) => void
  locationFilter: string
  setLocationFilter: (filter: string) => void
  minServices: string
  setMinServices: (value: string) => void
  maxServices: string
  setMaxServices: (value: string) => void
  minContacts: string
  setMinContacts: (value: string) => void
  maxContacts: string
  setMaxContacts: (value: string) => void
  minAssets: string
  setMinAssets: (value: string) => void
  maxAssets: string
  setMaxAssets: (value: string) => void
  dateRangeFilter: {start: string, end: string}
  setDateRangeFilter: (filter: {start: string, end: string}) => void
  endDateRangeFilter: {start: string, end: string}
  setEndDateRangeFilter: (filter: {start: string, end: string}) => void
  handleClearAdvancedFilters: () => void
}

export const AdvancedFilterSheet = ({
  showAdvancedFilter,
  setShowAdvancedFilter,
  licenseTypeFilter,
  setLicenseTypeFilter,
  companyNameFilter,
  setCompanyNameFilter,
  locationFilter,
  setLocationFilter,
  minServices,
  setMinServices,
  maxServices,
  setMaxServices,
  minContacts,
  setMinContacts,
  maxContacts,
  setMaxContacts,
  minAssets,
  setMinAssets,
  maxAssets,
  setMaxAssets,
  dateRangeFilter,
  setDateRangeFilter,
  endDateRangeFilter,
  setEndDateRangeFilter,
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
          {/* License Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="licenseTypeFilter">License Type</Label>
            <Select value={licenseTypeFilter} onValueChange={setLicenseTypeFilter}>
              <SelectTrigger id="licenseTypeFilter">
                <SelectValue placeholder="All License Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All License Types</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Company Name Filter */}
          <div className="space-y-2">
            <Label htmlFor="companyNameFilter">Company Name (Contains)</Label>
            <Input
              id="companyNameFilter"
              placeholder="Enter company name"
              value={companyNameFilter}
              onChange={(e) => setCompanyNameFilter(e.target.value)}
            />
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <Label htmlFor="locationFilter">Location (Contains)</Label>
            <Input
              id="locationFilter"
              placeholder="Enter city, state, or country"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
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

          {/* Contacts Count Range */}
          <div className="space-y-2">
            <Label>Number of Contacts</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Min"
                value={minContacts}
                onChange={(e) => setMinContacts(e.target.value)}
                min="0"
              />
              <span className="text-gray-500">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxContacts}
                onChange={(e) => setMaxContacts(e.target.value)}
                min="0"
              />
            </div>
          </div>

          {/* Assets Count Range */}
          <div className="space-y-2">
            <Label>Number of Assets</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Min"
                value={minAssets}
                onChange={(e) => setMinAssets(e.target.value)}
                min="0"
              />
              <span className="text-gray-500">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxAssets}
                onChange={(e) => setMaxAssets(e.target.value)}
                min="0"
              />
            </div>
          </div>

          {/* Start Date Range Filter */}
          <div className="space-y-2">
            <Label>Start Date Range</Label>
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

          {/* End Date Range Filter */}
          <div className="space-y-2">
            <Label>End Date Range</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="date"
                placeholder="Start Date"
                value={endDateRangeFilter.start}
                onChange={(e) => setEndDateRangeFilter({...endDateRangeFilter, start: e.target.value})}
              />
              <span className="text-gray-500">to</span>
              <Input
                type="date"
                placeholder="End Date"
                value={endDateRangeFilter.end}
                onChange={(e) => setEndDateRangeFilter({...endDateRangeFilter, end: e.target.value})}
              />
            </div>
          </div>

          {/* Active Filters Summary */}
          {(licenseTypeFilter !== "all" || companyNameFilter || locationFilter || minServices || maxServices || minContacts || maxContacts || minAssets || maxAssets || dateRangeFilter.start || dateRangeFilter.end || endDateRangeFilter.start || endDateRangeFilter.end) && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-sm mb-2 text-blue-900">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {licenseTypeFilter !== "all" && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    License: {licenseTypeFilter}
                  </Badge>
                )}
                {companyNameFilter && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Company: {companyNameFilter}
                  </Badge>
                )}
                {locationFilter && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Location: {locationFilter}
                  </Badge>
                )}
                {(minServices || maxServices) && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Services: {minServices || "0"}-{maxServices || "∞"}
                  </Badge>
                )}
                {(minContacts || maxContacts) && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Contacts: {minContacts || "0"}-{maxContacts || "∞"}
                  </Badge>
                )}
                {(minAssets || maxAssets) && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Assets: {minAssets || "0"}-{maxAssets || "∞"}
                  </Badge>
                )}
                {(dateRangeFilter.start || dateRangeFilter.end) && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Start Date: {dateRangeFilter.start || "Start"} to {dateRangeFilter.end || "End"}
                  </Badge>
                )}
                {(endDateRangeFilter.start || endDateRangeFilter.end) && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    End Date: {endDateRangeFilter.start || "Start"} to {endDateRangeFilter.end || "End"}
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
