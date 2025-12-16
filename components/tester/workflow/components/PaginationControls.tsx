import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationControlsProps {
  startIndex: number
  endIndex: number
  totalItems: number
  currentPage: number
  totalPages: number
  itemsPerPage: number
  setItemsPerPage: (items: number) => void
  setCurrentPage: (page: number) => void
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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <div className="text-sm text-gray-600">
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} items
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages || 1}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show:</span>
          <Select value={itemsPerPage.toString()} onValueChange={(value) => {
            setItemsPerPage(parseInt(value))
            setCurrentPage(1)
          }}>
            <SelectTrigger className="h-8 w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                aria-label="Go to first page"
              >
                <ChevronsLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                aria-label="Go to previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            
            {/* Page numbers */}
            {totalPages > 0 && (() => {
              const pages = []
              let start = Math.max(1, currentPage - 2)
              let end = Math.min(totalPages, currentPage + 2)
              
              // Adjust if we're near the start or end
              if (currentPage <= 2) {
                end = Math.min(totalPages, 5)
              } else if (currentPage >= totalPages - 1) {
                start = Math.max(1, totalPages - 4)
                end = totalPages
              }
              
              for (let pageNum = start; pageNum <= end; pageNum++) {
                pages.push(
                  <PaginationItem key={`page-${pageNum}`}>
                    <PaginationLink 
                      onClick={() => setCurrentPage(pageNum)}
                      isActive={currentPage === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              }
              return pages
            })()}
            
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(Math.min(totalPages || 1, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                aria-label="Go to next page"
              >
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(totalPages || 1)}
                className={currentPage === (totalPages || 1) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                aria-label="Go to last page"
              >
                <ChevronsRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
