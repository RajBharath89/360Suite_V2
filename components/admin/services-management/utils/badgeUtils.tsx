import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Code, Users, FileCheck, Shield } from "lucide-react"

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

export const getCategoryBadge = (category: string) => {
  switch (category) {
    case "Technical":
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          <Code className="h-3 w-3 mr-1" />
          Technical
        </Badge>
      )
    case "Management":
      return (
        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
          <Users className="h-3 w-3 mr-1" />
          Management
        </Badge>
      )
    case "Compliance":
      return (
        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
          <FileCheck className="h-3 w-3 mr-1" />
          Compliance
        </Badge>
      )
    default:
      return <Badge variant="outline">{category}</Badge>
  }
}
