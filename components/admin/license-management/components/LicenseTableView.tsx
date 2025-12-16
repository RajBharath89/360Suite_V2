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
  FileText,
  Shield,
  DollarSign,
  Calendar
} from "lucide-react"

// Memoized table row component
const LicenseTableRow = memo(({ 
  license, 
  onView, 
  onEdit, 
  onToggleStatus, 
  onDelete, 
  getStatusBadge, 
  getTypeBadge 
}: {
  license: any
  onView: (license: any) => void
  onEdit: (license: any) => void
  onToggleStatus: (id: string) => void
  onDelete: (license: any) => void
  getStatusBadge: (status: string) => React.ReactElement
  getTypeBadge: (type: string) => React.ReactElement
}) => (
  <UITableRow className="hover:bg-gray-50">
    <TableCell className="font-medium">
      <div className="text-sm text-gray-600">#{license.id}</div>
    </TableCell>
    <TableCell>
      {getTypeBadge(license.licenseType)}
    </TableCell>
    <TableCell>
      {getStatusBadge(license.status)}
    </TableCell>
    <TableCell className="text-sm text-gray-600">
      {license.version || "N/A"}
    </TableCell>
    <TableCell className="text-sm font-medium">
      ${license.contractValue.toLocaleString()}
    </TableCell>
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onView(license)}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(license)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onToggleStatus(license.id)}
            className={license.status === "active" ? "text-red-600" : "text-green-600"}
          >
            {license.status === "active" ? (
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
            onClick={() => onDelete(license)}
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

interface LicenseTableViewProps {
  paginatedLicenses: any[]
  sortBy: string
  sortDirection: "asc" | "desc"
  handleTableSort: (column: string) => void
  handleViewLicense: (license: any) => void
  handleEditLicense: (license: any) => void
  handleToggleStatus: (id: string) => void
  handleDeleteLicense: (license: any) => void
  getStatusBadge: (status: string) => React.ReactElement
  getTypeBadge: (type: string) => React.ReactElement
}

export const LicenseTableView = ({
  paginatedLicenses,
  sortBy,
  sortDirection,
  handleTableSort,
  handleViewLicense,
  handleEditLicense,
  handleToggleStatus,
  handleDeleteLicense,
  getStatusBadge,
  getTypeBadge
}: LicenseTableViewProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <UITableRow>
            <TableHead className="w-[100px]">License ID</TableHead>
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
            >
              <div className="flex items-center gap-2">
                Version
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50" 
              onClick={() => handleTableSort("contractValue")}
            >
              <div className="flex items-center gap-2">
                Contract Value
                {sortBy === "contractValue" && (
                  sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
                {sortBy !== "contractValue" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </UITableRow>
        </TableHeader>
        <TableBody>
          {paginatedLicenses.map((license) => (
            <LicenseTableRow 
              key={license.id}
              license={license}
              onView={handleViewLicense}
              onEdit={handleEditLicense}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteLicense}
              getStatusBadge={getStatusBadge}
              getTypeBadge={getTypeBadge}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
