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
import {
  Eye,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Settings,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  BookOpen
} from "lucide-react"

// Memoized table row component
const ServiceTableRow = memo(({ 
  service, 
  onView, 
  onEdit, 
  onToggleStatus, 
  onDelete, 
  getStatusBadge, 
  getCategoryBadge 
}: {
  service: any
  onView: (service: any) => void
  onEdit: (service: any) => void
  onToggleStatus: (id: string) => void
  onDelete: (service: any) => void
  getStatusBadge: (status: string) => React.ReactElement
  getCategoryBadge: (category: string) => React.ReactElement
}) => (
  <UITableRow className="hover:bg-gray-50">
    <TableCell className="font-medium">
      <div className="text-sm text-gray-600">#{service.id}</div>
    </TableCell>
    <TableCell className="font-medium">
      {service.name}
    </TableCell>
    <TableCell>
      {getStatusBadge(service.status)}
    </TableCell>
    <TableCell>
      {getCategoryBadge(service.category)}
    </TableCell>
    <TableCell className="text-sm text-gray-600 max-w-xs truncate">
      {service.description}
    </TableCell>
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onView(service)}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(service)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onToggleStatus(service.id)}
            className={service.status === "active" ? "text-red-600" : "text-green-600"}
          >
            {service.status === "active" ? (
              <>
                <PowerOff className="h-4 w-4 mr-2" />
                Deactivate
              </>
            ) : (
              <>
                <Power className="h-4 w-4 mr-2" />
                Activate
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onDelete(service)}
            className="text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </UITableRow>
))

interface ServiceTableViewProps {
  paginatedServices: any[]
  handleViewService: (service: any) => void
  handleEditService: (service: any) => void
  handleToggleStatus: (id: string) => void
  handleDeleteService: (service: any) => void
  getStatusBadge: (status: string) => React.ReactElement
  getCategoryBadge: (category: string) => React.ReactElement
}

export const ServiceTableView = ({
  paginatedServices,
  handleViewService,
  handleEditService,
  handleToggleStatus,
  handleDeleteService,
  getStatusBadge,
  getCategoryBadge
}: ServiceTableViewProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <UITableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </UITableRow>
        </TableHeader>
        <TableBody>
          {paginatedServices.map((service) => (
            <ServiceTableRow 
              key={service.id}
              service={service}
              onView={handleViewService}
              onEdit={handleEditService}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteService}
              getStatusBadge={getStatusBadge}
              getCategoryBadge={getCategoryBadge}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
