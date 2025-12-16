import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MessageSquare, Clock, LifeBuoy, Settings, Eye, Edit, Trash2, CheckCircle2 } from "lucide-react"

interface TicketCardViewProps {
  paginatedTickets: any[]
  handleViewTicket: (ticket: any) => void
  handleEditTicket: (ticket: any) => void
  handleResolveTicket: (id: string) => void
  handleDeleteTicket: (ticket: any) => void
  getStatusBadge: (status: string) => React.ReactElement
  getPriorityBadge: (priority: string) => React.ReactElement
}

export const TicketCardView = ({
  paginatedTickets,
  handleViewTicket,
  handleEditTicket,
  handleResolveTicket,
  handleDeleteTicket,
  getStatusBadge,
  getPriorityBadge
}: TicketCardViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {paginatedTickets.map((ticket) => (
        <Card key={ticket.id} className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-8 w-8 rounded-full bg-cyan-50 border flex items-center justify-center shrink-0">
                  <LifeBuoy className="h-4 w-4 text-cyan-600" />
                </div>
                <h3 className="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors truncate" title={ticket.subject}>{ticket.subject}</h3>
              </div>
              <div className="flex items-center gap-2">
                {getPriorityBadge(ticket.priority)}
                {getStatusBadge(ticket.status)}
              </div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2" title={ticket.description}>{ticket.description}</p>
            </div>
            <div className="ml-2 shrink-0 flex items-start">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleViewTicket(ticket)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={ticket.status !== 'open'}
                    onClick={() => ticket.status === 'open' && handleEditTicket(ticket)}
                    className={ticket.status !== 'open' ? 'opacity-60 pointer-events-none' : ''}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  {ticket.status === 'completed' && (
                    <DropdownMenuItem onClick={() => handleResolveTicket(ticket.id)} className="text-green-600">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark Resolved
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => handleDeleteTicket(ticket)} className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {ticket.comments || 0} responses
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {new Date(ticket.updatedAt).toLocaleDateString('en-GB')}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}


