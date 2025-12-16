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
  Key
} from "lucide-react"

// Memoized table row component
const ClientTableRow = memo(({ 
  client, 
  onView, 
  onEdit, 
  onToggleStatus, 
  onDelete,
  onGenerateCredentials,
  getStatusBadge, 
  getLicenseBadge 
}: {
  client: any
  onView: (client: any) => void
  onEdit: (client: any) => void
  onToggleStatus: (id: string) => void
  onDelete: (client: any) => void
  onGenerateCredentials: (client: any) => void
  getStatusBadge: (status: string) => React.ReactElement
  getLicenseBadge: (type: string) => React.ReactElement
}) => (
  <UITableRow className="hover:bg-gray-50">
    <TableCell className="font-medium">
      <div className="text-sm text-gray-600">#{client.id}</div>
    </TableCell>
    <TableCell>
      <div>
        <div className="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">{client.companyName}</div>
        <div className="text-sm text-gray-500 mt-1">
          {client.contacts.length > 0 ? client.contacts[0].name : 'No contact assigned'}
        </div>
      </div>
    </TableCell>
    <TableCell>
      <Badge variant="outline" className="bg-gray-100 text-gray-800">
        {client.industry}
      </Badge>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{client.services.length}</span>
        <span className="text-xs text-gray-500">
          ({client.services?.reduce((total: number, service: any) => total + (service.assets?.length || 0), 0) || 0} assets)
        </span>
      </div>
    </TableCell>
    <TableCell>
      {getLicenseBadge(client.licenseType)}
    </TableCell>
    <TableCell>
      {getStatusBadge(client.status)}
    </TableCell>
    <TableCell className="text-sm text-gray-600">
      {new Date(client.startDate).toLocaleDateString('en-GB')}
    </TableCell>
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onView(client)}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(client)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onGenerateCredentials(client)}>
            <Key className="h-4 w-4 mr-2" />
            Generate Credentials
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onToggleStatus(client.id)}
            className={client.status === "active" ? "text-red-600" : "text-green-600"}
          >
            {client.status === "active" ? (
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
            onClick={() => onDelete(client)}
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

interface ClientTableViewProps {
  paginatedClients: any[]
  sortBy: string
  sortDirection: "asc" | "desc"
  handleTableSort: (column: string) => void
  handleViewClient: (client: any) => void
  handleEditClient: (client: any) => void
  handleToggleStatus: (id: string) => void
  handleDeleteClient: (client: any) => void
  handleGenerateCredentials: (client: any) => void
  getStatusBadge: (status: string) => React.ReactElement
  getLicenseBadge: (type: string) => React.ReactElement
}

export const ClientTableView = ({
  paginatedClients,
  sortBy,
  sortDirection,
  handleTableSort,
  handleViewClient,
  handleEditClient,
  handleToggleStatus,
  handleDeleteClient,
  handleGenerateCredentials,
  getStatusBadge,
  getLicenseBadge
}: ClientTableViewProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <UITableRow>
            <TableHead className="w-[100px]">Client ID</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50" 
              onClick={() => handleTableSort("companyName")}
            >
              <div className="flex items-center gap-2">
                Company
                {sortBy === "companyName" && (
                  sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
                {sortBy !== "companyName" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50" 
              onClick={() => handleTableSort("industry")}
            >
              <div className="flex items-center gap-2">
                Industry
                {sortBy === "industry" && (
                  sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
                {sortBy !== "industry" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50" 
              onClick={() => handleTableSort("services")}
            >
              <div className="flex items-center gap-2">
                Service
                {sortBy === "services" && (
                  sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
                {sortBy !== "services" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50" 
              onClick={() => handleTableSort("licenseType")}
            >
              <div className="flex items-center gap-2">
                License Type
                {sortBy === "licenseType" && (
                  sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
                {sortBy !== "licenseType" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50" 
              onClick={() => handleTableSort("status")}
            >
              <div className="flex items-center gap-2">
                Status
                {sortBy === "status" && (
                  sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
                {sortBy !== "status" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50" 
              onClick={() => handleTableSort("startDate")}
            >
              <div className="flex items-center gap-2">
                Created
                {sortBy === "startDate" && (
                  sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
                {sortBy !== "startDate" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </UITableRow>
        </TableHeader>
        <TableBody>
          {paginatedClients.map((client) => (
            <ClientTableRow 
              key={client.id}
              client={client}
              onView={handleViewClient}
              onEdit={handleEditClient}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteClient}
              onGenerateCredentials={handleGenerateCredentials}
              getStatusBadge={getStatusBadge}
              getLicenseBadge={getLicenseBadge}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
