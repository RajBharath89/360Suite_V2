import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Shield, FileText, Star } from "lucide-react"

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </Badge>
      )
    case "inactive":
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          Inactive
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export const getTypeBadge = (type: string) => {
  switch (type) {
    case "Enterprise":
      return (
        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
          <Shield className="h-3 w-3 mr-1" />
          Enterprise
        </Badge>
      )
    case "Professional":
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          <FileText className="h-3 w-3 mr-1" />
          Professional
        </Badge>
      )
    case "Standard":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Standard
        </Badge>
      )
    case "Premium":
      return (
        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
          <Star className="h-3 w-3 mr-1" />
          Premium
        </Badge>
      )
    default:
      return <Badge variant="outline">{type}</Badge>
  }
}
