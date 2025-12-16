"use client"

import { useEffect, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Workflow, Home, ChevronRight } from "lucide-react"
import { useWorkflow } from "@/components/admin/workflow/hooks/useWorkflow"
import { BreadcrumbNav } from "@/components/admin/workflow/components/BreadcrumbNav"
import { ServiceListView } from "@/components/admin/workflow/components/ServiceListView"
import { TimelineView } from "@/components/admin/workflow/components/TimelineView"

interface ClientWorkflowProps {
  onBack?: () => void
}

export default function ClientWorkflow({ onBack }: ClientWorkflowProps) {
  const workflow = useWorkflow()

  // Auto-select the single client and start at services view
  const singleClientId = useMemo(() => workflow.clients[0]?.id || null, [workflow.clients])

  useEffect(() => {
    if (workflow.currentView === 'clients' && singleClientId) {
      workflow.selectClient(singleClientId)
    }
  }, [workflow, singleClientId, workflow.currentView])

  const getClientName = () => {
    if (!workflow.currentClientId) return ""
    const client = workflow.clients.find(c => c.id === workflow.currentClientId)
    return client?.companyName || ""
  }

  const getServiceName = () => {
    if (!workflow.currentServiceId) return ""
    const service = workflow.currentClientServices.find(s => s.id === workflow.currentServiceId)
    return service?.name || ""
  }

  const handleNavigate = useCallback((view: 'clients' | 'services' | 'timeline') => {
    switch (view) {
      case 'clients':
      case 'services':
        // Always keep the user on the single client's services list
        if (workflow.currentClientId) {
          workflow.selectClient(workflow.currentClientId)
        } else if (singleClientId) {
          workflow.selectClient(singleClientId)
        }
        break
      case 'timeline':
        // No-op; timeline is controlled by selecting a service
        break
    }
  }, [workflow, singleClientId])

  return (
    <div className="p-6 space-y-6">
      {onBack && (
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <button 
            onClick={onBack} 
            className="flex items-center gap-1 hover:text-cyan-600 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </button>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">Workflow</span>
        </div>
      )}

      {/* Banner Card */}
      <Card className="h-28 bg-gradient-to-r from-cyan-50 via-teal-50 to-green-50 border-cyan-200 shadow-lg">
        <CardContent className="p-3 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 border-2 border-white shadow-md rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center">
                <Workflow className="h-7 w-7 text-cyan-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Workflow Management</h1>
                <p className="text-gray-600 text-sm">Track and manage your service workflow</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breadcrumb for Services/Timeline only */}
      <BreadcrumbNav
        currentView={workflow.currentView === 'clients' ? 'services' : workflow.currentView}
        clientName={getClientName()}
        serviceName={getServiceName()}
        onNavigate={handleNavigate}
      />

      {/* Services List or Timeline */}
      {workflow.currentView !== 'timeline' ? (
        <ServiceListView
          services={workflow.currentClientServices}
          clientName={getClientName()}
          onSelectService={workflow.selectService}
        />
      ) : (
        <TimelineView
          timeline={workflow.currentTimeline}
          serviceName={getServiceName()}
          onUpdateStatus={(stageId, status, progress) =>
            workflow.updateStageStatus(
              workflow.currentServiceId!,
              workflow.currentClientId!,
              stageId,
              status as 'pending' | 'in-progress' | 'completed' | 'blocked' | 'overdue',
              progress
            )
          }
          onAssignUser={(stageId, userId, role) =>
            workflow.assignUser(
              workflow.currentServiceId!,
              workflow.currentClientId!,
              stageId,
              userId,
              role as 'admin' | 'manager' | 'tester' | 'client'
            )
          }
          onAddComment={(stageId, comment) =>
            workflow.addComment(
              workflow.currentServiceId!,
              workflow.currentClientId!,
              stageId,
              comment
            )
          }
          onUploadFile={(stageId, file) =>
            workflow.uploadAttachment(
              workflow.currentServiceId!,
              workflow.currentClientId!,
              stageId,
              file
            )
          }
          onGenerateReport={() =>
            workflow.generateReport(
              workflow.currentServiceId!,
              workflow.currentClientId!
            )
          }
          onSubmitForReview={(stageId) =>
            workflow.submitForReview(
              workflow.currentServiceId!,
              workflow.currentClientId!,
              stageId
            )
          }
          onApprove={(stageId) =>
            workflow.approveStage(
              workflow.currentServiceId!,
              workflow.currentClientId!,
              stageId
            )
          }
          onReject={(stageId, reason) =>
            workflow.rejectStage(
              workflow.currentServiceId!,
              workflow.currentClientId!,
              stageId,
              reason
            )
          }
          onClientFeedback={(satisfied, feedback) =>
            workflow.clientSatisfaction(
              workflow.currentServiceId!,
              workflow.currentClientId!,
              satisfied,
              feedback
            )
          }
        />
      )}
    </div>
  )
}
