import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PaginationControlsProps {
  startIndex: number
  endIndex: number
  totalItems: number
  currentPage: number
  totalPages: number
  itemsPerPage: number
  setItemsPerPage: (n: number) => void
  setCurrentPage: (n: number) => void
}

export const PaginationControls = ({
  startIndex,
  endIndex,
  totalItems,
  currentPage,
  totalPages,
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage
}: PaginationControlsProps) => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="text-sm text-gray-600">Showing {startIndex + 1} to {endIndex} of {totalItems} items</div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show:</span>
          <Select value={String(itemsPerPage)} onValueChange={(v) => setItemsPerPage(Number(v))}>
            <SelectTrigger className="w-16 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20].map((n) => (
                <SelectItem key={n} value={String(n)}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            ‹
          </Button>
          <div className="px-3 py-2 border rounded-md bg-white text-sm">{currentPage}</div>
          <Button variant="outline" size="icon" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            ›
          </Button>
        </div>
      </div>
    </div>
  )
}


