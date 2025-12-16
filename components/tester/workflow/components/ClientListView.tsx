import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, Building2, TrendingUp } from "lucide-react"

interface Client {
  id: string
  companyName: string
  industry: string
  status: string
  services: any[]
  overallProgress: number
}

interface ClientListViewProps {
  clients: Client[]
  onSelectClient: (clientId: string) => void
}

export function ClientListView({ clients, onSelectClient }: ClientListViewProps) {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null)

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
    <div className="space-y-4">
      {clients.map((client) => (
        <Card
          key={client.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            hoveredClient === client.id ? 'border-cyan-600 border-2' : ''
          }`}
          onMouseEnter={() => setHoveredClient(client.id)}
          onMouseLeave={() => setHoveredClient(null)}
          onClick={() => onSelectClient(client.id)}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-100 to-green-100 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-cyan-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{client.companyName}</CardTitle>
                  <CardDescription>{client.industry}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(client.overallProgress)}
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-semibold text-gray-900">{Math.round(client.overallProgress)}%</span>
              </div>
              <Progress value={client.overallProgress} className="h-2" />
              
              <div className="flex items-center justify-between text-sm pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>{client.services.length} Service{client.services.length !== 1 ? 's' : ''}</span>
                  </div>
                  <Badge variant="outline">{client.licenseType}</Badge>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
