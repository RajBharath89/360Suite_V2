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
  Building2,
  Shield,
  Settings,
  Key
} from "lucide-react"

// Memoized card component
const ClientCard = memo(({ 
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
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <Avatar className="h-12 w-12">
          <AvatarImage src={client.logo} />
          <AvatarFallback>
            <Building2 className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          {getStatusBadge(client.status)}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
        </div>
      </div>
      <div className="space-y-1">
        <CardTitle className="text-lg text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer">{client.companyName}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Shield className="h-4 w-4" />
          {client.industry} • {client.location}
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">License Type</span>
          {getLicenseBadge(client.licenseType)}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Services</span>
          <span className="font-medium">{client.services.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Assets</span>
          <span className="font-medium">
            {client.services?.reduce((total: number, service: any) => total + (service.assets?.length || 0), 0) || 0}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Contacts</span>
          <span className="font-medium">{client.contacts.length}</span>
        </div>
      </div>
    </CardContent>
  </Card>
))

interface ClientCardViewProps {
  paginatedClients: any[]
  handleViewClient: (client: any) => void
  handleEditClient: (client: any) => void
  handleToggleStatus: (id: string) => void
  handleDeleteClient: (client: any) => void
  handleGenerateCredentials: (client: any) => void
  getStatusBadge: (status: string) => React.ReactElement
  getLicenseBadge: (type: string) => React.ReactElement
}

export const ClientCardView = ({
  paginatedClients,
  handleViewClient,
  handleEditClient,
  handleToggleStatus,
  handleDeleteClient,
  handleGenerateCredentials,
  getStatusBadge,
  getLicenseBadge
}: ClientCardViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paginatedClients.map((client) => (
        <ClientCard 
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
    </div>
  )
}
