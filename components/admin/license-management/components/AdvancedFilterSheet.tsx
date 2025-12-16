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
  typeFilter: string
  setTypeFilter: (filter: string) => void
  statusFilter: string
  setStatusFilter: (filter: string) => void
  minContractValue: string
  setMinContractValue: (value: string) => void
  maxContractValue: string
  setMaxContractValue: (value: string) => void
  startDateRange: string
  setStartDateRange: (value: string) => void
  endDateRange: string
  setEndDateRange: (value: string) => void
  handleClearAdvancedFilters: () => void
}

export const AdvancedFilterSheet = ({
  showAdvancedFilter,
  setShowAdvancedFilter,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  minContractValue,
  setMinContractValue,
  maxContractValue,
  setMaxContractValue,
  startDateRange,
  setStartDateRange,
  endDateRange,
  setEndDateRange,
  handleClearAdvancedFilters
}: AdvancedFilterSheetProps) => {
  return (
    <Sheet open={showAdvancedFilter} onOpenChange={setShowAdvancedFilter}>
      <SheetContent className="w-[500px] max-w-none flex flex-col p-0">
        <SheetHeader className="px-4 pt-4 pb-2 flex-shrink-0">
          <SheetTitle className="text-2xl font-bold">Advanced Filters</SheetTitle>
          <SheetDescription>
            Use advanced filters to find licenses more precisely
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
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contract Value Range */}
          <div className="space-y-2">
            <Label>Contract Value ($)</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Min"
                value={minContractValue}
                onChange={(e) => setMinContractValue(e.target.value)}
                min="0"
              />
              <span className="text-gray-500">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxContractValue}
                onChange={(e) => setMaxContractValue(e.target.value)}
                min="0"
              />
            </div>
          </div>

          {/* Active Filters Summary */}
          {(statusFilter !== "all" || minContractValue || maxContractValue) && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-sm mb-2 text-blue-900">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {statusFilter !== "all" && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Status: {statusFilter}
                  </Badge>
                )}
                {(minContractValue || maxContractValue) && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Value: ${minContractValue || "0"}-${maxContractValue || "∞"}
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
