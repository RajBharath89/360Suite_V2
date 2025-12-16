import { memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  BookOpen
} from "lucide-react"

// Memoized card component
const ServiceCard = memo(({ 
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
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="h-12 w-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-purple-600" />
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(service.status)}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
        </div>
      </div>
      <div className="space-y-1">
        <CardTitle className="text-lg text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer">
          {service.name}
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <span className="text-sm">Service #{service.id}</span>
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Category</span>
          {getCategoryBadge(service.category)}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Status</span>
          {getStatusBadge(service.status)}
        </div>
        <div className="text-sm">
          <span className="text-gray-600">Description:</span>
          <p className="text-gray-800 mt-1 line-clamp-2">{service.description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
))

interface ServiceCardViewProps {
  paginatedServices: any[]
  handleViewService: (service: any) => void
  handleEditService: (service: any) => void
  handleToggleStatus: (id: string) => void
  handleDeleteService: (service: any) => void
  getStatusBadge: (status: string) => React.ReactElement
  getCategoryBadge: (category: string) => React.ReactElement
}

export const ServiceCardView = ({
  paginatedServices,
  handleViewService,
  handleEditService,
  handleToggleStatus,
  handleDeleteService,
  getStatusBadge,
  getCategoryBadge
}: ServiceCardViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paginatedServices.map((service) => (
        <ServiceCard 
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
    </div>
  )
}
