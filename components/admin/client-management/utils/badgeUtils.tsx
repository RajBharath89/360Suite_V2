import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>
    case "inactive":
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200"><XCircle className="h-3 w-3 mr-1" />Inactive</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export const getLicenseBadge = (type: string) => {
  switch (type) {
    case "Enterprise":
      return <Badge className="bg-purple-100 text-purple-800 border-purple-200">{type}</Badge>
    case "Professional":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{type}</Badge>
    case "Standard":
      return <Badge className="bg-green-100 text-green-800 border-green-200">{type}</Badge>
    default:
      return <Badge variant="outline">{type}</Badge>
  }
}
