import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Crown, UserCheck, Shield, User } from "lucide-react"

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
        <Badge className="bg-gray-100 text-gray-800 border-gray-200">
          <XCircle className="h-3 w-3 mr-1" />
          Inactive
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export const getRoleBadge = (role: string) => {
  switch (role) {
    case "Admin":
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">
          <Crown className="h-3 w-3 mr-1" />
          Admin
        </Badge>
      )
    case "Manager":
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          <UserCheck className="h-3 w-3 mr-1" />
          Manager
        </Badge>
      )
    case "Tester":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <Shield className="h-3 w-3 mr-1" />
          Tester
        </Badge>
      )
    case "Client":
      return (
        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
          <User className="h-3 w-3 mr-1" />
          Client
        </Badge>
      )
    default:
      return <Badge variant="outline">{role}</Badge>
  }
}
