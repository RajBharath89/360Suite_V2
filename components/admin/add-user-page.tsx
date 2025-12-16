"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  X, 
  User, 
  Shield,
  Users,
  Crown,
  UserCheck,
  CheckCircle,
  XCircle,
  Home,
  ChevronRight,
  Save
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"

const userFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  experience: z.string().min(1, "Experience is required"),
  role: z.enum(["Admin", "Manager", "Tester", "Client"], {
    required_error: "Please select a role",
  }),
  status: z.enum(["active", "inactive"], {
    required_error: "Please select a status",
  }),
  specializations: z.array(z.string()).min(1, "At least one specialization is required"),
  reportingTo: z.string().min(1, "Reports to is required"),
  clientMapping: z.array(z.string()).optional(),
  notes: z.string().optional(),
})

type UserFormValues = z.infer<typeof userFormSchema>

interface AddUserPageProps {
  onBack: () => void
  onSave: (userData: UserFormValues) => void
  existingUsers?: any[]
  editingUser?: any
  isEditMode?: boolean
  isViewMode?: boolean
}

export default function AddUserPage({
  onBack,
  onSave,
  existingUsers = [],
  editingUser,
  isEditMode = false,
  isViewMode = false
}: AddUserPageProps) {
  const { toast } = useToast()
  const [specializations, setSpecializations] = useState<string[]>([])
  const [newSpecialization, setNewSpecialization] = useState("")
  const [clientMapping, setClientMapping] = useState<string[]>([])
  const [newClientMapping, setNewClientMapping] = useState("")
  const [selectedRole, setSelectedRole] = useState("Tester")

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      experience: "",
      role: "Tester",
      status: "active",
      specializations: [],
      reportingTo: "",
      clientMapping: [],
      notes: "",
    },
  })

  const experienceOptions = [
    "Entry Level (0-1 years)",
    "Junior (1-2 years)",
    "Mid Level (2-5 years)",
    "Senior (5-8 years)",
    "Lead (8-12 years)",
    "Principal (12+ years)"
  ]

  const availableSpecializations = [
    "Network Red Teaming",
    "Web Application Security",
    "API Security",
    "Server Hardening",
    "Cloud Security",
    "External Attack Surface Monitor",
    "Phishing Simulation",
    "Team Leadership",
    "Client Relations",
    "Project Management",
    "Risk Assessment"
  ]

  const availableManagers = existingUsers
    .filter(user => (user.role === "Manager" || user.role === "Admin") && user.id !== editingUser?.id)
    .map(user => ({ id: user.id, name: user.fullName }))

  const availableClients = [
    "TechCorp Solutions",
    "FinanceFirst Bank",
    "HealthCare Plus",
    "RetailMax Corp",
    "Manufacturing Inc"
  ]

  useEffect(() => {
    if (editingUser) {
      form.reset({
        fullName: editingUser.fullName || "",
        email: editingUser.email || "",
        phone: editingUser.phone || "",
        experience: editingUser.experience || "",
        role: editingUser.role || "Tester",
        status: editingUser.status || "active",
        specializations: editingUser.specializations || [],
        reportingTo: editingUser.reportingTo ? existingUsers.find(u => u.fullName === editingUser.reportingTo)?.id || "none" : "none",
        clientMapping: editingUser.clientMapping || [],
        notes: editingUser.notes || "",
      })
      setSpecializations(editingUser.specializations || [])
      setClientMapping(editingUser.clientMapping || [])
      setSelectedRole(editingUser.role || "Tester")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingUser])

  const handleAddSpecialization = (spec: string) => {
    if (spec && !specializations.includes(spec)) {
      const updatedSpecializations = [...specializations, spec]
      setSpecializations(updatedSpecializations)
      form.setValue("specializations", updatedSpecializations)
    }
  }

  const handleRemoveSpecialization = (specialization: string) => {
    const updatedSpecializations = specializations.filter(s => s !== specialization)
    setSpecializations(updatedSpecializations)
    form.setValue("specializations", updatedSpecializations)
  }

  const handleAddClientMapping = (client: string) => {
    if (client && !clientMapping.includes(client)) {
      const updatedClientMapping = [...clientMapping, client]
      setClientMapping(updatedClientMapping)
      form.setValue("clientMapping", updatedClientMapping)
    }
  }

  const handleRemoveClientMapping = (client: string) => {
    const updatedClientMapping = clientMapping.filter(c => c !== client)
    setClientMapping(updatedClientMapping)
    form.setValue("clientMapping", updatedClientMapping)
  }

  const handleLoadSample = () => {
    const sampleData = {
      fullName: "John Smith",
      email: "john.smith@company.com",
      phone: "+1-555-0123",
      experience: "Senior (5-8 years)",
      role: "Manager" as const,
      status: "active" as const,
      specializations: ["Penetration Testing", "Vulnerability Assessment", "Team Leadership"],
      reportingTo: "none",
      clientMapping: ["TechCorp Solutions", "FinanceFirst Bank"],
      notes: "Experienced security professional with strong leadership skills."
    }
    
    form.reset(sampleData)
    setSpecializations(sampleData.specializations)
    setClientMapping(sampleData.clientMapping)
    setSelectedRole(sampleData.role)
  }

  const onSubmit = (data: UserFormValues) => {
    if (isViewMode) return

    const processedData = {
      ...data,
      reportingTo: data.reportingTo === "none" ? "" : existingUsers.find(u => u.id === data.reportingTo)?.fullName || ""
    }
    onSave(processedData)
    
    toast({
      title: isEditMode ? "User Updated Successfully!" : "User Added Successfully!",
      description: `${data.fullName} has been ${isEditMode ? "updated" : "added to your team"}.`,
      duration: 5000,
    })
    
    onBack()
  }

  const getTitle = () => {
    if (isViewMode) return "View User"
    if (isEditMode) return "Edit User"
    return "Add New User"
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-shrink-0 bg-white border-b px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
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
              Users
            </button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">{getTitle()}</span>
          </div>
          {!isViewMode && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleLoadSample}>
                Load Sample
              </Button>
              <Button variant="outline" onClick={onBack}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={form.handleSubmit(onSubmit)}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isEditMode ? "Update" : "Save"} User
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{getTitle()}</h1>
            <p className="text-gray-500 text-sm mt-1">
              {isViewMode 
                ? "View user details and information"
                : isEditMode 
                  ? "Update user information and settings"
                  : "Fill in the details to add a new user to your team"
              }
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-cyan-600" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>Essential user details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full name" {...field} disabled={isViewMode} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email address" {...field} disabled={isViewMode} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} disabled={isViewMode} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value} disabled={isViewMode}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {experienceOptions.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role *</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value)
                              setSelectedRole(value)
                            }}
                            value={field.value}
                            disabled={isViewMode}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Admin">
                                <div className="flex items-center gap-2">
                                  <Crown className="h-4 w-4 text-red-600" />
                                  Admin
                                </div>
                              </SelectItem>
                              <SelectItem value="Manager">
                                <div className="flex items-center gap-2">
                                  <UserCheck className="h-4 w-4 text-blue-600" />
                                  Manager
                                </div>
                              </SelectItem>
                              <SelectItem value="Tester">
                                <div className="flex items-center gap-2">
                                  <Shield className="h-4 w-4 text-green-600" />
                                  Tester
                                </div>
                              </SelectItem>
                              <SelectItem value="Client">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-purple-600" />
                                  Client
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value} disabled={isViewMode}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  Active
                                </div>
                              </SelectItem>
                              <SelectItem value="inactive">
                                <div className="flex items-center gap-2">
                                  <XCircle className="h-4 w-4 text-gray-600" />
                                  Inactive
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="reportingTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reports To *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={isViewMode}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select manager" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None (Top Level)</SelectItem>
                            {availableManagers.map((manager) => (
                              <SelectItem key={manager.id} value={manager.id}>{manager.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-cyan-600" />
                    Specializations
                  </CardTitle>
                  <CardDescription>Add specialization areas for this user</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {specializations.map((spec) => (
                      <Badge key={spec} variant="secondary" className="flex items-center gap-1">
                        {spec}
                        {!isViewMode && (
                          <button type="button" onClick={() => handleRemoveSpecialization(spec)}>
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {!isViewMode && (
                    <Select onValueChange={handleAddSpecialization}>
                      <SelectTrigger>
                        <SelectValue placeholder="Add specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSpecializations
                          .filter(s => !specializations.includes(s))
                          .map((spec) => (
                            <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-cyan-600" />
                    Client Mapping
                  </CardTitle>
                  <CardDescription>Assign clients to this user</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {clientMapping.map((client) => (
                      <Badge key={client} variant="secondary" className="flex items-center gap-1">
                        {client}
                        {!isViewMode && (
                          <button type="button" onClick={() => handleRemoveClientMapping(client)}>
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {!isViewMode && (
                    <Select onValueChange={handleAddClientMapping}>
                      <SelectTrigger>
                        <SelectValue placeholder="Add client" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableClients
                          .filter(c => !clientMapping.includes(c))
                          .map((client) => (
                            <SelectItem key={client} value={client}>{client}</SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Additional Notes</CardTitle>
                  <CardDescription>Any additional information about this user</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Add any notes or additional information..."
                            {...field}
                            disabled={isViewMode}
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
