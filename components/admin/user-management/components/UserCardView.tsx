import { memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  User,
  Settings,
  Mail,
  Phone,
  Shield,
  Users
} from "lucide-react"

// Memoized card component
const UserCard = memo(({ 
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
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          {getStatusBadge(user.status)}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
        </div>
      </div>
      <div className="space-y-1">
        <CardTitle className="text-lg text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer">{user.fullName}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Mail className="h-4 w-4" />
          {user.email}
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Role</span>
          <span className="font-medium">{user.role}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Phone</span>
          <span className="font-medium">{user.phone}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Specializations</span>
          <span className="font-medium">{user.specializations.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Reports To</span>
          <span className="font-medium">{user.reportingTo || 'No manager'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last Active</span>
          <span className="font-medium">{new Date(user.lastActive).toLocaleDateString('en-GB')}</span>
        </div>
      </div>
    </CardContent>
  </Card>
))

interface UserCardViewProps {
  paginatedUsers: any[]
  handleViewUser: (user: any) => void
  handleEditUser: (user: any) => void
  handleToggleStatus: (id: string) => void
  handleDeleteUser: (user: any) => void
  getStatusBadge: (status: string) => React.ReactElement
  getRoleBadge: (role: string) => React.ReactElement
}

export const UserCardView = ({
  paginatedUsers,
  handleViewUser,
  handleEditUser,
  handleToggleStatus,
  handleDeleteUser,
  getStatusBadge,
  getRoleBadge
}: UserCardViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paginatedUsers.map((user) => (
        <UserCard 
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
    </div>
  )
}
