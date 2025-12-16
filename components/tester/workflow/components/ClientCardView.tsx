import { memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Building2 } from "lucide-react"

// Memoized card component
const ClientCard = memo(({ 
  client, 
  onSelect, 
  getStatusBadge
}: {
  client: any
  onSelect: (clientId: string) => void
  getStatusBadge: (progress: number) => React.ReactElement
}) => (
  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect(client.id)}>
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-100 to-green-100 flex items-center justify-center">
          <Building2 className="h-6 w-6 text-cyan-600" />
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(client.overallProgress)}
        </div>
      </div>
      <div className="space-y-1">
        <CardTitle className="text-lg text-cyan-600 hover:text-cyan-700 transition-colors">{client.companyName}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Building2 className="h-4 w-4" />
          {client.industry}
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Overall Progress</span>
          <span className="font-medium">{Math.round(client.overallProgress)}%</span>
        </div>
        <Progress value={client.overallProgress} className="h-2" />
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Services</span>
          <span className="font-medium">{client.services.length}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">License Type</span>
          <Badge variant="outline">{client.licenseType}</Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Status</span>
          <span className="font-medium">{client.status}</span>
        </div>
      </div>
    </CardContent>
  </Card>
))

interface ClientCardViewProps {
  paginatedClients: any[]
  onSelectClient: (clientId: string) => void
}

export const ClientCardView = ({
  paginatedClients,
  onSelectClient
}: ClientCardViewProps) => {
  const getStatusBadge = (progress: number) => {
    if (progress >= 100) {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
    } else if (progress > 0) {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>
    } else {
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Pending</Badge>
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paginatedClients.map((client) => (
        <ClientCard 
          key={client.id}
          client={client}
          onSelect={onSelectClient}
          getStatusBadge={getStatusBadge}
        />
      ))}
    </div>
  )
}
