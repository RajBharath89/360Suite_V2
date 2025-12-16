import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  User,
  Mail,
  Phone,
  Shield,
  Users
} from "lucide-react"

// Memoized table row component
const UserTableRow = memo(({ 
  user, 
  onView, 
  onEdit, 
  onToggleStatus, 
  onDelete, 
  getStatusBadge, 
  getRoleBadge 
}: {
  user: any
  onView: (user: any) => void
  onEdit: (user: any) => void
  onToggleStatus: (id: string) => void
  onDelete: (user: any) => void
  getStatusBadge: (status: string) => React.ReactElement
  getRoleBadge: (role: string) => React.ReactElement
}) => (
  <UITableRow className="hover:bg-gray-50">
    <TableCell className="font-medium">
      <div className="text-sm text-gray-600">#{user.id}</div>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">{user.fullName}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </div>
    </TableCell>
    <TableCell>
      {getRoleBadge(user.role)}
    </TableCell>
    <TableCell className="text-center">
      <span className="text-sm font-medium">{user.specializations.length}</span>
    </TableCell>
    <TableCell>
      {getStatusBadge(user.status)}
    </TableCell>
    <TableCell className="text-sm text-gray-600">
      {user.reportingTo || 'No manager'}
    </TableCell>
    <TableCell className="text-sm text-gray-600">
      {new Date(user.lastActive).toLocaleDateString('en-GB')}
    </TableCell>
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onView(user)}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(user)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onToggleStatus(user.id)}
            className={user.status === "active" ? "text-red-600" : "text-green-600"}
          >
            {user.status === "active" ? (
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
            onClick={() => onDelete(user)}
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

interface UserTableViewProps {
  paginatedUsers: any[]
  sortBy: string
  sortDirection: "asc" | "desc"
  handleTableSort: (column: string) => void
  handleViewUser: (user: any) => void
  handleEditUser: (user: any) => void
  handleToggleStatus: (id: string) => void
  handleDeleteUser: (user: any) => void
  getStatusBadge: (status: string) => React.ReactElement
  getRoleBadge: (role: string) => React.ReactElement
}

export const UserTableView = ({
  paginatedUsers,
  sortBy,
  sortDirection,
  handleTableSort,
  handleViewUser,
  handleEditUser,
  handleToggleStatus,
  handleDeleteUser,
  getStatusBadge,
  getRoleBadge
}: UserTableViewProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <UITableRow>
            <TableHead className="w-[100px]">User ID</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50" 
              onClick={() => handleTableSort("fullName")}
            >
              <div className="flex items-center gap-2">
                User
                {sortBy === "fullName" && (
                  sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
                {sortBy !== "fullName" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50" 
              onClick={() => handleTableSort("role")}
            >
              <div className="flex items-center gap-2">
                Role
                {sortBy === "role" && (
                  sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
                {sortBy !== "role" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50" 
              onClick={() => handleTableSort("specializations")}
            >
              <div className="flex items-center gap-2">
                Specializations
                {sortBy === "specializations" && (
                  sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
                {sortBy !== "specializations" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
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
              onClick={() => handleTableSort("reportingTo")}
            >
              <div className="flex items-center gap-2">
                Reports To
                {sortBy === "reportingTo" && (
                  sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
                {sortBy !== "reportingTo" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50" 
              onClick={() => handleTableSort("lastActive")}
            >
              <div className="flex items-center gap-2">
                Last Active
                {sortBy === "lastActive" && (
                  sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
                {sortBy !== "lastActive" && <ArrowUpDown className="h-4 w-4 opacity-50" />}
              </div>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </UITableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user) => (
            <UserTableRow 
              key={user.id}
              user={user}
              onView={handleViewUser}
              onEdit={handleEditUser}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteUser}
              getStatusBadge={getStatusBadge}
              getRoleBadge={getRoleBadge}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
