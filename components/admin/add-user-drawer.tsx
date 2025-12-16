"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { 
  Plus, 
  X, 
  Upload, 
  User, 
  Mail, 
  Phone, 
  Shield,
  Calendar,
  Users,
  Crown,
  UserCheck,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Form validation schema
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

interface AddUserDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSave: (userData: UserFormValues) => void
  existingUsers?: any[]
  editingUser?: any
  isEditMode?: boolean
  isViewMode?: boolean
}

export default function AddUserDrawer({
  isOpen,
  onClose,
  onSave,
  existingUsers = [],
  editingUser,
  isEditMode = false,
  isViewMode = false
}: AddUserDrawerProps) {
  const [specializations, setSpecializations] = useState<string[]>([])
  const [newSpecialization, setNewSpecialization] = useState("")
  const [clientMapping, setClientMapping] = useState<string[]>([])
  const [newClientMapping, setNewClientMapping] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedRole, setSelectedRole] = useState("Tester")

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
    fullName: "",
    email: "",
    phone: "",
      role: "Tester",
    status: "active",
      specializations: [],
    reportingTo: "",
      clientMapping: [],
    notes: "",
    },
  })

  // Watch form values for validation
  const watchedValues = form.watch()
  const isFormValid = form.formState.isValid

  // Available experience levels
  const experienceOptions = [
    "Entry Level (0-1 years)",
    "Junior (1-2 years)",
    "Mid Level (2-5 years)",
    "Senior (5-8 years)",
    "Lead (8-12 years)",
    "Principal (12+ years)"
  ]

  // Available specializations
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

  // Available managers for reporting
  const availableManagers = existingUsers
    .filter(user => (user.role === "Manager" || user.role === "Admin") && user.id !== editingUser?.id)
    .map(user => ({ id: user.id, name: user.fullName }))

  // Available clients for mapping
  const availableClients = [
    "TechCorp Solutions",
    "FinanceFirst Bank",
    "HealthCare Plus",
    "RetailMax Corp",
    "Manufacturing Inc"
  ]

  // Reset form when drawer opens/closes or editing user changes
  useEffect(() => {
    if (isOpen) {
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
      } else {
        form.reset({
        fullName: "",
        email: "",
        phone: "",
      experience: "",
      role: "Tester",
        status: "active",
      specializations: [],
      reportingTo: "none",
      clientMapping: [],
        notes: "",
      })
      setSpecializations([])
        setClientMapping([])
    }
    }
  }, [isOpen, editingUser, form])

  const handleAddSpecialization = () => {
    if (newSpecialization.trim() && !specializations.includes(newSpecialization.trim())) {
      const updatedSpecializations = [...specializations, newSpecialization.trim()]
      setSpecializations(updatedSpecializations)
      form.setValue("specializations", updatedSpecializations)
      setNewSpecialization("")
    }
  }

  const handleRemoveSpecialization = (specialization: string) => {
    const updatedSpecializations = specializations.filter(s => s !== specialization)
    setSpecializations(updatedSpecializations)
    form.setValue("specializations", updatedSpecializations)
  }

  const handleAddClientMapping = () => {
    if (newClientMapping.trim() && !clientMapping.includes(newClientMapping.trim())) {
      const updatedClientMapping = [...clientMapping, newClientMapping.trim()]
      setClientMapping(updatedClientMapping)
      form.setValue("clientMapping", updatedClientMapping)
      setNewClientMapping("")
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

  const onSubmit = async (data: UserFormValues) => {
    if (isViewMode) return

    setIsSubmitting(true)
    try {
      // Convert "none" back to empty string for reportingTo
      const processedData = {
        ...data,
        reportingTo: data.reportingTo === "none" ? "" : existingUsers.find(u => u.id === data.reportingTo)?.fullName || ""
      }
      await onSave(processedData)
    onClose()
    } catch (error) {
      console.error("Error saving user:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Crown className="h-4 w-4 text-red-600" />
      case "Manager":
        return <UserCheck className="h-4 w-4 text-blue-600" />
      case "Tester":
        return <Shield className="h-4 w-4 text-green-600" />
      case "Client":
        return <User className="h-4 w-4 text-purple-600" />
      default:
        return <User className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusIcon = (status: string) => {
    return status === "active" ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-gray-600" />
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        className="w-[50vw] sm:w-[50vw] max-w-none flex flex-col p-0"
        style={{ width: '50vw', maxWidth: 'none' }}
      >
        <SheetHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                {isViewMode ? (
                  <>
                    <User className="h-6 w-6 text-cyan-600" />
                    View User
                  </>
                ) : isEditMode ? (
                  <>
                    <User className="h-6 w-6 text-cyan-600" />
                    Edit User
                  </>
                ) : (
                  <>
                    <User className="h-6 w-6 text-cyan-600" />
                    Add New User
                  </>
                )}
              </SheetTitle>
              <SheetDescription>
                {isViewMode 
                  ? "View user details and information"
                  : isEditMode 
                    ? "Update user information and settings"
                    : "Fill in the details to add a new user to your team"
                }
              </SheetDescription>
            </div>
            {!isViewMode && !isEditMode && (
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={handleLoadSample}
                className="text-xs"
              >
                Load Sample
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
            <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-cyan-600" />
                  Basic Information
                </CardTitle>
                  <CardDescription>
                    Essential user details and contact information
                  </CardDescription>
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
                    <Input
                      placeholder="Enter full name"
                              {...field}
                              disabled={isViewMode}
                            />
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
                    <Input
                      type="email"
                      placeholder="Enter email address"
                              {...field}
                              disabled={isViewMode}
                            />
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
                    <Input
                      placeholder="Enter phone number"
                              {...field}
                              disabled={isViewMode}
                            />
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
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={isViewMode}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {experienceOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
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
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={isViewMode}
                          >
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
              </CardContent>
            </Card>

              {/* Specializations */}
            <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-cyan-600" />
                  Specializations
                </CardTitle>
                  <CardDescription>
                    Add user's areas of expertise and specializations
                  </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                      {!isViewMode && (
                    <div className="flex gap-2">
                      <Select
                        value={newSpecialization}
                        onValueChange={setNewSpecialization}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select specialization to add" />
                          </SelectTrigger>
                          <SelectContent>
                          {availableSpecializations
                            .filter(spec => !specializations.includes(spec))
                            .map((specialization) => (
                              <SelectItem key={specialization} value={specialization}>
                                {specialization}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                        type="button"
                        onClick={handleAddSpecialization}
                        disabled={!newSpecialization.trim()}
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {specializations.map((specialization, index) => (
                      <Badge
                        key={`${specialization}-${index}`}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {specialization}
                        {!isViewMode && (
                          <Button
                            type="button"
                          variant="ghost"
                          size="sm"
                            className="h-4 w-4 p-0 hover:bg-red-100"
                            onClick={() => handleRemoveSpecialization(specialization)}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                      )}
                      </Badge>
                    ))}
                      </div>

                  {specializations.length === 0 && (
                    <p className="text-sm text-gray-500 italic">
                      No specializations added yet
                    </p>
                )}
              </CardContent>
            </Card>

              {/* Reporting Structure */}
            <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-cyan-600" />
                    Reporting Structure
                </CardTitle>
                  <CardDescription>
                    Define reporting relationships
                  </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="reportingTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reports To</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isViewMode}
                        >
                          <FormControl>
                          <SelectTrigger>
                              <SelectValue placeholder="Select manager" />
                          </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">No Manager</SelectItem>
                            {availableManagers.map((manager) => (
                              <SelectItem key={manager.id} value={manager.id}>
                                {manager.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </CardContent>
            </Card>

              {/* Additional Information */}
            <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-cyan-600" />
                    Additional Information
                </CardTitle>
                  <CardDescription>
                    Additional notes and information about the user
                  </CardDescription>
              </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add any additional notes or information..."
                            className="min-h-[100px]"
                            {...field}
                        disabled={isViewMode}
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

            {!isViewMode && (
          <SheetFooter className="gap-2 px-6 pt-4 pb-6 flex-shrink-0 border-t bg-white">
            <Button variant="outline" onClick={onClose} className="w-full">
              Cancel
              </Button>
                <Button 
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting || !isFormValid}
              className="w-full bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white hover:from-[#0a7c71] hover:to-[#0784a0] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {isEditMode ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {isEditMode ? "Update User" : "Add User"}
                </>
              )}
                </Button>
          </SheetFooter>
        )}

        {isViewMode && (
          <SheetFooter className="gap-2 px-6 pt-4 pb-6 flex-shrink-0 border-t bg-white">
            <Button variant="outline" onClick={onClose} className="w-full">
              Close
            </Button>
        </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}