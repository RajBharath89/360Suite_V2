import { ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BreadcrumbNavProps {
  currentView: 'clients' | 'services' | 'timeline'
  clientName?: string
  serviceName?: string
  onNavigate: (view: 'clients' | 'services' | 'timeline') => void
}

export function BreadcrumbNav({ currentView, clientName, serviceName, onNavigate }: BreadcrumbNavProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigate('clients')}
        className="h-8 px-2"
      >
        <Home className="h-4 w-4" />
        <span className="ml-1">Clients</span>
      </Button>
      
      {currentView === 'services' || currentView === 'timeline' ? (
        <>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('services')}
            className="h-8 px-2 font-medium text-gray-900 hover:text-cyan-600"
          >
            {clientName || 'Client'}
          </Button>
        </>
      ) : null}
      
      {currentView === 'timeline' ? (
        <>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="font-medium text-gray-900">{serviceName || 'Service'}</span>
        </>
      ) : null}
    </div>
  )
}
