"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { LifeBuoy, Users, FileText, CheckCircle, Paperclip, ArrowLeft, ChevronRight, Home } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const ticketFormSchema = z.object({
  client: z.string(),
  services: z.array(z.string()).min(1, "Select at least one service"),
  subject: z.string().min(5).max(120),
  category: z.enum(["bug", "request", "access", "billing", "other"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  recipient: z.enum(["Admin", "Manager", "Both"]),
  description: z.string().min(10),
  dueDate: z.string().optional(),
  confidential: z.boolean().default(false),
  attachments: z.any().optional()
})

type TicketFormValues = z.infer<typeof ticketFormSchema>

interface AddTicketPageProps {
  onBack: () => void
  onSave: (data: TicketFormValues) => void
  defaultClient: string
  availableServices: string[]
  editingTicket?: any
  isEditMode?: boolean
  isViewMode?: boolean
}

export default function TesterAddTicketPage({
  onBack,
  onSave,
  defaultClient,
  availableServices,
  editingTicket,
  isEditMode = false,
  isViewMode = false
}: AddTicketPageProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [newService, setNewService] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [messages, setMessages] = useState<Array<{ author: "Admin" | "Tester"; text: string; timestamp: string }>>([])

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      client: defaultClient,
      services: [],
      subject: "",
      category: "bug",
      priority: "medium",
      recipient: "Manager",
      description: "",
      dueDate: "",
      confidential: false
    }
  })

  useEffect(() => {
    if (editingTicket) {
      form.reset({
        client: defaultClient,
        services: editingTicket.services || [],
        subject: editingTicket.subject || "",
        category: editingTicket.category || "bug",
        priority: editingTicket.priority || "medium",
        recipient: editingTicket.recipient || "Manager",
        description: editingTicket.description || "",
        dueDate: editingTicket.dueDate || "",
        confidential: !!editingTicket.confidential
      })
      setSelectedServices(editingTicket.services || [])
      const initialMessages = (editingTicket.messages as Array<{ author: "Admin" | "Tester"; text: string; timestamp: string }>) || []
      setMessages(initialMessages)
    } else {
      form.reset({
        client: defaultClient,
        services: [],
        subject: "",
        category: "bug",
        priority: "medium",
        recipient: "Manager",
        description: "",
        dueDate: "",
        confidential: false
      })
      setSelectedServices([])
      setMessages([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingTicket, defaultClient])

  const handleAddService = () => {
    if (newService && !selectedServices.includes(newService)) {
      const updated = [...selectedServices, newService]
      setSelectedServices(updated)
      form.setValue("services", updated)
      setNewService("")
    }
  }

  const onSubmit = async (data: TicketFormValues) => {
    if (isViewMode) return
    setIsSubmitting(true)
    try {
      await onSave(data)
      onBack()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendReply = () => {
    const trimmed = replyText.trim()
    if (!trimmed) return
    const newMsg = { author: "Tester" as const, text: trimmed, timestamp: new Date().toISOString() }
    setMessages([...(messages || []), newMsg])
    setReplyText("")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <button 
          onClick={onBack} 
          className="flex items-center gap-1 hover:text-cyan-600 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Dashboard</span>
        </button>
        <ChevronRight className="h-4 w-4 mx-2" />
        <button 
          onClick={onBack} 
          className="hover:text-cyan-600 transition-colors"
        >
          Support Tickets
        </button>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900 font-medium">
          {isViewMode ? "View Ticket" : isEditMode ? "Edit Ticket" : "New Ticket"}
        </span>
      </div>

      <Card className="h-28 bg-gradient-to-r from-cyan-50 via-teal-50 to-green-50 border-cyan-200 shadow-lg">
        <CardContent className="p-3 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onBack}
                className="h-10 w-10 rounded-full hover:bg-white/50"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>
              <div className="h-14 w-14 border-2 border-white shadow-md rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center">
                <LifeBuoy className="h-7 w-7 text-cyan-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isViewMode ? "View Ticket" : isEditMode ? "Edit Ticket" : "New Support Ticket"}
                </h1>
                <p className="text-gray-600 text-sm">
                  {isViewMode ? "View ticket details and conversation" : isEditMode ? "Update ticket details" : "Fill in the ticket details below"}
                </p>
              </div>
            </div>
            {!isViewMode && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={onBack}>
                  Cancel
                </Button>
                <Button 
                  onClick={form.handleSubmit(onSubmit)} 
                  disabled={isSubmitting || !form.formState.isValid}
                  className="bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white hover:from-[#0a7c71] hover:to-[#0784a0]"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {isEditMode ? "Update Ticket" : "Create Ticket"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-cyan-600" />
                  Client & Services
                </CardTitle>
                <CardDescription>Client is auto-selected; choose affected services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <FormControl>
                        <Input {...field} disabled readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Select value={newService} onValueChange={setNewService} disabled={isViewMode}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select service to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableServices
                        .filter((s) => !selectedServices.includes(s))
                        .map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {!isViewMode && (
                    <Button type="button" size="sm" onClick={handleAddService}>Add</Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedServices.map((s, i) => (
                    <span key={`${s}-${i}`} className="px-2 py-1 text-sm border rounded-md bg-gray-50">{s}</span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-cyan-600" />
                  Ticket Details
                </CardTitle>
                <CardDescription>Provide a clear summary and description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject *</FormLabel>
                        <FormControl>
                          <Input placeholder="Short summary" {...field} disabled={isViewMode} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={isViewMode}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bug">Bug</SelectItem>
                            <SelectItem value="request">Request</SelectItem>
                            <SelectItem value="access">Access</SelectItem>
                            <SelectItem value="billing">Billing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={isViewMode}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recipient"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Send To *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={isViewMode}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Target recipient" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="Both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[120px]" placeholder="Full details" {...field} disabled={isViewMode} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} disabled={isViewMode} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confidential"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confidential</FormLabel>
                        <div className="flex items-center gap-2">
                          <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isViewMode} />
                          <span className="text-sm text-gray-600">Contains sensitive data</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {!isViewMode && (
                  <div className="space-y-2">
                    <Label>Attachments</Label>
                    <div className="flex items-center gap-3">
                      <Input type="file" multiple />
                      <Button type="button" variant="outline" size="sm">
                        <Paperclip className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </form>
        </Form>

        {isViewMode && (
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Responses</CardTitle>
              <CardDescription>Conversation between Admin and Tester</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {messages && messages.length > 0 ? (
                  messages.map((m, idx) => (
                    <div key={idx} className={`flex ${m.author === "Tester" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm shadow ${m.author === "Tester" ? "bg-cyan-50 border border-cyan-100" : "bg-gray-50 border"}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium ${m.author === "Tester" ? "text-cyan-700" : "text-gray-700"}`}>{m.author}</span>
                          <span className="text-xs text-gray-500">{new Date(m.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-gray-800 whitespace-pre-wrap">{m.text}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-600">No responses yet.</div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Your reply</Label>
                <Textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Type your reply..." className="min-h-[80px]" />
                <div className="flex justify-end">
                  <Button type="button" onClick={handleSendReply} className="bg-cyan-600 text-white hover:bg-cyan-700">Send Reply</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {isViewMode && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={onBack}>
            Back to Tickets
          </Button>
        </div>
      )}
    </div>
  )
}
