import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CheckCircle2, Clock, AlertCircle, XCircle, Send, Upload, FileText, 
  MessageSquare, User, Calendar, ChevronDown, ChevronUp, FilePlus, 
  Expand, Shrink
} from "lucide-react"
import { ServiceTimeline, Stage } from "../types"

interface TimelineViewProps {
  timeline: ServiceTimeline | null
  serviceName: string
  onUpdateStatus: (stageId: number, status: string, progress?: number) => void
  onAssignUser: (stageId: number, userId: string, role: string) => void
  onAddComment: (stageId: number, comment: string) => void
  onUploadFile: (stageId: number, file: File) => void
  onGenerateReport: () => void
  onSubmitForReview: (stageId: number) => void
  onApprove: (stageId: number) => void
  onReject: (stageId: number, reason: string) => void
  onClientFeedback: (satisfied: boolean, feedback?: string) => void
}

export function TimelineView({
  timeline,
  serviceName,
  onUpdateStatus,
  onAssignUser,
  onAddComment,
  onUploadFile,
  onGenerateReport,
  onSubmitForReview,
  onApprove,
  onReject,
  onClientFeedback
}: TimelineViewProps) {
  const [expandedStage, setExpandedStage] = useState<number | null>(timeline?.currentStageId || null)
  const [allExpanded, setAllExpanded] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [clientFeedback, setClientFeedback] = useState("")

  if (!timeline) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-500">No timeline data available</p>
        </CardContent>
      </Card>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />
      case 'blocked':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case 'overdue':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-emerald-500 bg-emerald-50'
      case 'in-progress':
        return 'border-cyan-500 bg-cyan-50'
      case 'blocked':
        return 'border-amber-500 bg-amber-50'
      case 'overdue':
        return 'border-rose-500 bg-rose-50'
      default:
        return 'border-gray-300 bg-gray-50'
    }
  }

  const getNodeColor = (status: string, stageId: number) => {
    // Check if this stage is waiting for previous stage to complete
    const isWaitingForPrevious = stageId > 1 && timeline?.stages.find(s => s.id === stageId - 1)?.statuses[0]?.status !== 'completed'
    
    if (isWaitingForPrevious && status === 'pending') {
      return 'bg-gray-300 border-gray-400'
    }
    
    switch (status) {
      case 'completed':
        return 'bg-emerald-500 border-emerald-500'
      case 'in-progress':
        return 'bg-cyan-500 border-cyan-500'
      case 'blocked':
        return 'bg-amber-500 border-amber-500'
      case 'overdue':
        return 'bg-rose-500 border-rose-500'
      default:
        return 'bg-white border-gray-300'
    }
  }

  const getConnectorColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500'
      case 'in-progress':
        return 'bg-cyan-500'
      case 'blocked':
        return 'bg-amber-500'
      case 'overdue':
        return 'bg-rose-500'
      default:
        return 'bg-gray-300'
    }
  }

  const getStatusBadge = (status: string, stageId: number) => {
    // Check if this stage is waiting for previous stage to complete
    const isWaitingForPrevious = stageId > 1 && timeline?.stages.find(s => s.id === stageId - 1)?.statuses[0]?.status !== 'completed'
    
    if (isWaitingForPrevious && status === 'pending') {
      return <Badge className="bg-gray-100 text-gray-600 border-gray-200">Awaiting Stage {stageId - 1}</Badge>
    }
    
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Completed</Badge>
      case 'in-progress':
        return <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200">In Progress</Badge>
      case 'blocked':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Blocked</Badge>
      case 'overdue':
        return <Badge className="bg-rose-100 text-rose-800 border-rose-200">Overdue</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Pending</Badge>
    }
  }

  const handleCommentSubmit = (stageId: number) => {
    if (commentText.trim()) {
      onAddComment(stageId, commentText)
      setCommentText("")
    }
  }

  const handleFileUpload = (stageId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onUploadFile(stageId, file)
    }
  }

  const handleExpandCollapseAll = () => {
    if (allExpanded) {
      // Collapse all stages
      setExpandedStage(null)
      setAllExpanded(false)
    } else {
      // Expand all stages
      const allStageIds = timeline?.stages.map(stage => stage.id) || []
      setExpandedStage(allStageIds[0] || null) // Set first stage as expanded for visual feedback
      setAllExpanded(true)
    }
  }

  const handleStageClick = (stageId: number) => {
    if (allExpanded) {
      // If all are expanded, just toggle this specific stage
      setExpandedStage(expandedStage === stageId ? null : stageId)
    } else {
      // Normal behavior - toggle individual stage
      setExpandedStage(expandedStage === stageId ? null : stageId)
    }
  }

  const renderStageActions = (stage: Stage, isExpanded: boolean) => {
    const status = stage.statuses[0]?.status || 'pending'
    const stageId = stage.id

    // Check if previous stage is completed (for sequential validation)
    const canStart = stageId === 1 || (stageId > 1 && timeline?.stages.find(s => s.id === stageId - 1)?.statuses[0]?.status === 'completed')
    const canComplete = status === 'in-progress' && canStart

    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {/* Standard Actions for Most Stages */}
        {status !== 'completed' && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateStatus(stageId, 'in-progress')}
              disabled={!canStart}
              className={!canStart ? 'opacity-50 cursor-not-allowed' : ''}
            >
              <Clock className="h-4 w-4 mr-1" />
              Start
            </Button>
            
            {status === 'in-progress' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateStatus(stageId, 'completed')}
                disabled={!canComplete}
                className={!canComplete ? 'opacity-50 cursor-not-allowed' : ''}
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Complete
              </Button>
            )}
          </>
        )}

        {/* Stage 6: Task Execution Specific Actions */}
        {stageId === 6 && status === 'in-progress' && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FilePlus className="h-4 w-4 mr-1" />
                Add Finding
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Finding</DialogTitle>
                <DialogDescription>Document a security finding with evidence and POC</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <input className="w-full border rounded-md p-2 mt-1" placeholder="e.g., SQL Injection Vulnerability" />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea className="mt-1" placeholder="Detailed description of the vulnerability" />
                </div>
                <div>
                  <label className="text-sm font-medium">Severity</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="evidence-upload" className="text-sm font-medium">Evidence</label>
                  <input type="file" id="evidence-upload" multiple className="w-full mt-1" />
                </div>
                <div>
                  <label htmlFor="poc-upload" className="text-sm font-medium">Proof of Concept</label>
                  <input type="file" id="poc-upload" multiple className="w-full mt-1" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>Cancel</Button>
                <Button onClick={() => {}}>Add Finding</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Stage 7: Report Generation */}
        {stageId === 7 && status === 'in-progress' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onGenerateReport()}
          >
            <FileText className="h-4 w-4 mr-1" />
            Generate Report
          </Button>
        )}

        {/* Stage 8: Submit for Review */}
        {stageId === 8 && status === 'completed' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSubmitForReview(stageId)}
          >
            <Send className="h-4 w-4 mr-1" />
            Submit for Review
          </Button>
        )}

        {/* Stage 9: Manager Review Actions */}
        {stageId === 9 && status === 'in-progress' && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onApprove(stageId)}
              className="text-green-700 hover:text-green-800"
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-700 hover:text-red-800">
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reject Report</DialogTitle>
                  <DialogDescription>Provide a reason for rejection</DialogDescription>
                </DialogHeader>
                <Textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter rejection reason..."
                />
                <DialogFooter>
                  <Button variant="outline" onClick={() => setRejectionReason("")}>Cancel</Button>
                  <Button onClick={() => {
                    onReject(stageId, rejectionReason)
                    setRejectionReason("")
                  }}>Reject</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}

        {/* Stage 10: Client Review Actions */}
        {stageId === 10 && status === 'in-progress' && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-green-700 hover:text-green-800">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Satisfied
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Mark as Satisfied</DialogTitle>
                  <DialogDescription>Confirm that you are satisfied with the report</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {}}>Cancel</Button>
                  <Button onClick={() => onClientFeedback(true)}>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-700 hover:text-red-800">
                  <XCircle className="h-4 w-4 mr-1" />
                  Provide Feedback
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Provide Feedback</DialogTitle>
                  <DialogDescription>Share your concerns or issues with the report</DialogDescription>
                </DialogHeader>
                <Textarea
                  value={clientFeedback}
                  onChange={(e) => setClientFeedback(e.target.value)}
                  placeholder="Enter your feedback..."
                />
                <DialogFooter>
                  <Button variant="outline" onClick={() => setClientFeedback("")}>Cancel</Button>
                  <Button onClick={() => {
                    onClientFeedback(false, clientFeedback)
                    setClientFeedback("")
                  }}>Submit Feedback</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}

        {/* Comments and Attachments */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleStageClick(stageId)}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          {isExpanded ? 'Hide' : 'Show'} Details
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{serviceName}</h2>
            <p className="text-gray-600 mt-1">Version {timeline.version} • Overall Progress: {Math.round(timeline.overallProgress)}%</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExpandCollapseAll}
            className="flex items-center gap-2"
          >
            {allExpanded ? (
              <>
                <Shrink className="h-4 w-4" />
                Collapse All
              </>
            ) : (
              <>
                <Expand className="h-4 w-4" />
                Expand All
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-semibold text-gray-900">{Math.round(timeline.overallProgress)}%</span>
          </div>
          <Progress value={timeline.overallProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-200"></div>
        
        <div className="space-y-4">
          {timeline.stages.map((stage, index) => {
            const status = stage.statuses[0]?.status || 'pending'
            const isExpanded = allExpanded || expandedStage === stage.id
            const isCurrent = stage.id === timeline.currentStageId
            const isLast = index === timeline.stages.length - 1
            const prevStage = index > 0 ? timeline.stages[index - 1] : null
            const prevStatus = prevStage?.statuses[0]?.status || 'pending'

            return (
              <div key={stage.id} className="relative">

                {/* Timeline Node */}
                <div className="absolute left-4 top-6 z-10">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    getNodeColor(status, stage.id)
                  } ${isCurrent ? 'ring-2 ring-cyan-400 shadow-lg' : ''} hover:scale-110 ${
                    stage.id > 1 && timeline?.stages.find(s => s.id === stage.id - 1)?.statuses[0]?.status !== 'completed' && status === 'pending' 
                      ? 'opacity-50' : ''
                  }`}>
                    {status === 'completed' && <CheckCircle2 className="h-2.5 w-2.5 text-white" />}
                    {status === 'in-progress' && <Clock className="h-2.5 w-2.5 text-white" />}
                    {status === 'blocked' && <AlertCircle className="h-2.5 w-2.5 text-white" />}
                    {status === 'overdue' && <XCircle className="h-2.5 w-2.5 text-white" />}
                    {status === 'pending' && stage.id > 1 && timeline?.stages.find(s => s.id === stage.id - 1)?.statuses[0]?.status !== 'completed' && (
                      <Clock className="h-2.5 w-2.5 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Stage Content */}
                <div className="ml-16">
                  <Card 
                    className={`transition-all cursor-pointer hover:shadow-lg ${
                      isCurrent ? 'ring-2 ring-cyan-600 shadow-lg' : ''
                    } ${isExpanded ? 'shadow-lg' : ''} bg-white/80 backdrop-blur border border-gray-200`}
                    onClick={() => handleStageClick(stage.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900 text-base">
                              Stage {stage.id}: {stage.icon} {stage.name}
                            </h3>
                            {getStatusBadge(status, stage.id)}
                            {isCurrent && <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200">Current</Badge>}
                          </div>
                          
                          {/* Stage Info */}
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                            {stage.statuses[0]?.assignedTo && (
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{stage.statuses[0].assignedTo}</span>
                              </div>
                            )}
                            {stage.statuses[0]?.completedAt && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>Completed {new Date(stage.statuses[0].completedAt).toLocaleDateString()}</span>
                              </div>
                            )}
                            {stage.statuses[0]?.dueDate && !stage.statuses[0].completedAt && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>Due {new Date(stage.statuses[0].dueDate).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>

                          {/* Progress for Stage 6 */}
                          {stage.id === 6 && status === 'in-progress' && (
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Task Completion</span>
                                <span className="font-semibold text-gray-900">65%</span>
                              </div>
                              <Progress value={65} className="h-2" />
                            </div>
                          )}

                          {/* Comments and Attachments Count - Always show */}
                          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{stage.statuses[0]?.comments?.length || 0} comments</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              <span>{stage.statuses[0]?.attachments?.length || 0} attachments</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStageClick(stage.id)
                          }}
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </div>

                      {/* Stage Actions - Only show when expanded */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t">
                          {renderStageActions(stage, isExpanded)}
                        </div>
                      )}
                    </CardContent>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="px-4 pb-4 space-y-4">
                        {/* Comments */}
                        <div className="rounded-md border border-gray-200 bg-gray-50/60 p-3">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Comments</h4>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {stage.statuses[0]?.comments?.map((comment) => (
                              <div key={comment.id} className="p-2 bg-gray-50 rounded-md">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium">{comment.author}</span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(comment.timestamp).toLocaleString()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">{comment.content}</p>
                              </div>
                            ))}
                            {(!stage.statuses[0]?.comments || stage.statuses[0].comments.length === 0) && (
                              <p className="text-sm text-gray-500">No comments yet</p>
                            )}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Textarea
                              placeholder="Add a comment..."
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              className="min-h-[60px]"
                            />
                            <Button onClick={() => handleCommentSubmit(stage.id)}>
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Attachments */}
                        <div className="rounded-md border border-gray-200 bg-gray-50/60 p-3">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Attachments</h4>
                          <div className="space-y-2">
                            {stage.statuses[0]?.attachments?.map((attachment) => (
                              <div key={attachment.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{attachment.name}</p>
                                  <p className="text-xs text-gray-500">{attachment.size} • {attachment.uploadedBy}</p>
                                </div>
                              </div>
                            ))}
                            {(!stage.statuses[0]?.attachments || stage.statuses[0].attachments.length === 0) && (
                              <p className="text-sm text-gray-500">No attachments yet</p>
                            )}
                          </div>
                          <div className="mt-2">
                            <input
                              type="file"
                              id={`file-upload-${stage.id}`}
                              className="hidden"
                              onChange={(e) => handleFileUpload(stage.id, e)}
                            />
                            <label htmlFor={`file-upload-${stage.id}`}>
                              <Button variant="outline" size="sm" asChild>
                                <span>
                                  <Upload className="h-4 w-4 mr-1" />
                                  Upload File
                                </span>
                              </Button>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
