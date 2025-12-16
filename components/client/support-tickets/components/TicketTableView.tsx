import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow as UITableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Edit, Trash2, Settings, ArrowUpDown, ArrowUp, ArrowDown, CheckCircle2, LifeBuoy } from "lucide-react"

const TicketTableRow = memo(({ ticket, onView, onEdit, onResolve, onDelete, getStatusBadge, getPriorityBadge }: any) => (
  <UITableRow className="hover:bg-gray-50">
    <TableCell className="font-medium">
      <div className="text-sm text-gray-600">#{ticket.id}</div>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-cyan-50 border flex items-center justify-center">
          <LifeBuoy className="h-4 w-4 text-cyan-600" />
        </div>
        <div>
          <div className="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">{ticket.subject}</div>
          <div className="text-sm text-gray-500">{ticket.category}</div>
        </div>
      </div>
    </TableCell>
    <TableCell>
      {getPriorityBadge(ticket.priority)}
    </TableCell>
    <TableCell>
      {getStatusBadge(ticket.status)}
    </TableCell>
    <TableCell className="text-sm text-gray-600">
      {ticket.recipient}
    </TableCell>
    <TableCell className="text-sm text-gray-600">
      {new Date(ticket.updatedAt).toLocaleDateString('en-GB')}
    </TableCell>
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onView(ticket)}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={ticket.status !== 'open'}
            onClick={() => ticket.status === 'open' && onEdit(ticket)}
            className={ticket.status !== 'open' ? 'opacity-60 pointer-events-none' : ''}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          {ticket.status === 'completed' && (
            <DropdownMenuItem onClick={() => onResolve(ticket.id)} className="text-green-600">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark Resolved
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => onDelete(ticket)} className="text-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </UITableRow>
))

interface TicketTableViewProps {
  paginatedTickets: any[]
  sortBy: string
  sortDirection: "asc" | "desc"
  handleTableSort: (column: string) => void
  handleViewTicket: (ticket: any) => void
  handleEditTicket: (ticket: any) => void
  handleResolveTicket: (id: string) => void
  handleDeleteTicket: (ticket: any) => void
  getStatusBadge: (status: string) => React.ReactElement
  getPriorityBadge: (priority: string) => React.ReactElement
}

export const TicketTableView = ({
  paginatedTickets,
  sortBy,
  sortDirection,
  handleTableSort,
  handleViewTicket,
  handleEditTicket,
  handleResolveTicket,
  handleDeleteTicket,
  getStatusBadge,
  getPriorityBadge
}: TicketTableViewProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <UITableRow>
            <TableHead className="w-[100px]">Ticket ID</TableHead>
            <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleTableSort("subject")}>
              <div className="flex items-center gap-2">
                Subject
                {sortBy === "subject" && (sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
                {sortBy !== "subject" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleTableSort("priority")}>
              <div className="flex items-center gap-2">
                Priority
                {sortBy === "priority" && (sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
                {sortBy !== "priority" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleTableSort("status")}>
              <div className="flex items-center gap-2">
                Status
                {sortBy === "status" && (sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
                {sortBy !== "status" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleTableSort("updatedAt")}>
              <div className="flex items-center gap-2">
                Last Updated
                {sortBy === "updatedAt" && (sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
                {sortBy !== "updatedAt" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </UITableRow>
        </TableHeader>
        <TableBody>
          {paginatedTickets.map((ticket) => (
            <TicketTableRow
              key={ticket.id}
              ticket={ticket}
              onView={handleViewTicket}
              onEdit={handleEditTicket}
              onResolve={handleResolveTicket}
              onDelete={handleDeleteTicket}
              getStatusBadge={getStatusBadge}
              getPriorityBadge={getPriorityBadge}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


