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
  isOpen: boolean
  onClose: () => void
  statusFilter: string
  setStatusFilter: (filter: string) => void
  categoryFilter: string
  setCategoryFilter: (filter: string) => void
  handleClearFilters: () => void
}

export const AdvancedFilterSheet = ({
  isOpen,
  onClose,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  handleClearFilters
}: AdvancedFilterSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[500px] max-w-none flex flex-col p-0">
        <SheetHeader className="px-4 pt-4 pb-2 flex-shrink-0">
          <SheetTitle className="text-2xl font-bold">Advanced Filters</SheetTitle>
          <SheetDescription>
            Use advanced filters to find services more precisely
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

          {/* Category Filter */}
          <div className="space-y-2">
            <Label htmlFor="categoryFilter">Category</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger id="categoryFilter">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Management">Management</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters Summary */}
          {(statusFilter !== "all" || categoryFilter !== "all") && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-sm mb-2 text-blue-900">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {statusFilter !== "all" && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Status: {statusFilter}
                  </Badge>
                )}
                {categoryFilter !== "all" && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Category: {categoryFilter}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="gap-2 px-4 pt-4 pb-4 flex-shrink-0 border-t bg-white">
          <Button 
            variant="outline" 
            onClick={handleClearFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
          <Button 
            className="w-full bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white"
            onClick={onClose}
          >
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
