import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface AdvancedFilterSheetProps {
  showAdvancedFilter: boolean
  setShowAdvancedFilter: (b: boolean) => void
  statusFilter: string
  setStatusFilter: (v: string) => void
  priorityFilter: string
  setPriorityFilter: (v: string) => void
  categoryFilter?: string
  setCategoryFilter?: (v: string) => void
  recipientFilter?: string
  setRecipientFilter?: (v: string) => void
  updatedDateRange?: { start: string; end: string }
  setUpdatedDateRange?: (v: { start: string; end: string }) => void
  handleClearAdvancedFilters: () => void
}

export const AdvancedFilterSheet = ({
  showAdvancedFilter,
  setShowAdvancedFilter,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  categoryFilter = "all",
  setCategoryFilter,
  recipientFilter = "all",
  setRecipientFilter,
  updatedDateRange = { start: "", end: "" },
  setUpdatedDateRange,
  handleClearAdvancedFilters
}: AdvancedFilterSheetProps) => {
  return (
    <Sheet open={showAdvancedFilter} onOpenChange={setShowAdvancedFilter}>
      <SheetContent className="w-[500px] max-w-none flex flex-col p-0">
        <SheetHeader className="px-4 pt-4 pb-2 flex-shrink-0">
          <SheetTitle className="text-2xl font-bold">Advanced Filters</SheetTitle>
          <SheetDescription>Use advanced filters to find tickets more precisely</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
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
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
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
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter && setCategoryFilter(v)}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="bug">Bug</SelectItem>
                <SelectItem value="request">Request</SelectItem>
                <SelectItem value="access">Access</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Recipient</Label>
            <Select value={recipientFilter} onValueChange={(v) => setRecipientFilter && setRecipientFilter(v)}>
              <SelectTrigger>
                <SelectValue placeholder="All Recipients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Recipients</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Updated Date Range</Label>
            <div className="flex gap-2 items-center">
              <Input type="date" value={updatedDateRange.start} onChange={(e) => setUpdatedDateRange && setUpdatedDateRange({ ...updatedDateRange, start: e.target.value })} />
              <span className="text-gray-500">to</span>
              <Input type="date" value={updatedDateRange.end} onChange={(e) => setUpdatedDateRange && setUpdatedDateRange({ ...updatedDateRange, end: e.target.value })} />
            </div>
          </div>

          {(statusFilter !== "all" || priorityFilter !== "all" || categoryFilter !== "all" || recipientFilter !== "all" || updatedDateRange.start || updatedDateRange.end) && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-sm mb-2 text-blue-900">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {statusFilter !== "all" && <Badge variant="secondary" className="bg-blue-100 text-blue-800">Status: {statusFilter}</Badge>}
                {priorityFilter !== "all" && <Badge variant="secondary" className="bg-blue-100 text-blue-800">Priority: {priorityFilter}</Badge>}
                {categoryFilter !== "all" && <Badge variant="secondary" className="bg-blue-100 text-blue-800">Category: {categoryFilter}</Badge>}
                {recipientFilter !== "all" && <Badge variant="secondary" className="bg-blue-100 text-blue-800">Recipient: {recipientFilter}</Badge>}
                {(updatedDateRange.start || updatedDateRange.end) && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Updated: {updatedDateRange.start || "Start"} to {updatedDateRange.end || "End"}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
        <SheetFooter className="gap-2 px-4 pt-4 pb-4 flex-shrink-0 border-t bg-white">
          <Button variant="outline" onClick={handleClearAdvancedFilters} className="w-full">Clear All Filters</Button>
          <Button className="w-full bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white" onClick={() => setShowAdvancedFilter(false)}>Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}


