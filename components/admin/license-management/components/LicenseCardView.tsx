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
  FileText,
  Shield,
  DollarSign,
  Calendar
} from "lucide-react"

// Memoized card component
const LicenseCard = memo(({ 
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
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="h-12 w-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
          <FileText className="h-6 w-6 text-purple-600" />
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(license.status)}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
        </div>
      </div>
      <div className="space-y-1">
        <CardTitle className="text-lg text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer">
          {license.licenseType}
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <span className="text-sm">License #{license.id}</span>
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">License Type</span>
          {getTypeBadge(license.licenseType)}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Version</span>
          <span className="font-medium">{license.version || "N/A"}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Contract Value</span>
          <span className="font-medium text-green-600">${license.contractValue.toLocaleString()}</span>
        </div>
      </div>
    </CardContent>
  </Card>
))

interface LicenseCardViewProps {
  paginatedLicenses: any[]
  handleViewLicense: (license: any) => void
  handleEditLicense: (license: any) => void
  handleToggleStatus: (id: string) => void
  handleDeleteLicense: (license: any) => void
  getStatusBadge: (status: string) => React.ReactElement
  getTypeBadge: (type: string) => React.ReactElement
}

export const LicenseCardView = ({
  paginatedLicenses,
  handleViewLicense,
  handleEditLicense,
  handleToggleStatus,
  handleDeleteLicense,
  getStatusBadge,
  getTypeBadge
}: LicenseCardViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paginatedLicenses.map((license) => (
        <LicenseCard 
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
    </div>
  )
}
