"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Plus, 
  X, 
  User, 
  Mail, 
  Phone, 
  Shield,
  Users,
  Crown,
  UserCheck,
  Settings
} from "lucide-react"

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (userData: any) => void
}

const roleOptions = [
  { value: "Admin", label: "Admin", icon: Crown, description: "Full system access and user management" },
  { value: "Manager", label: "Manager", icon: UserCheck, description: "Client assignment and report approval" },
  { value: "Tester", label: "Tester", icon: Shield, description: "Task execution and report generation" },
  { value: "Client", label: "Client", icon: User, description: "View reports and progress" }
]

const specializationOptions = [
  "Penetration Testing",
  "Vulnerability Assessment",
  "Compliance Audit",
  "Security Assessment",
  "HIPAA Compliance",
  "PCI Compliance",
  "Network Security",
  "Web Application Security",
  "Mobile Security",
  "Cloud Security",
  "Incident Response",
  "Security Training",
  "Team Leadership",
  "Project Management",
  "Client Relations",
  "DevSecOps",
  "Risk Assessment",
  "Security Architecture",
  "Forensics",
  "Compliance"
]

export default function AddUserModal({ isOpen, onClose, onSave }: AddUserModalProps) {
  const [step, setStep] = useState(1)
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([])
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    reportingTo: "",
    clientMapping: [] as string[]
  })

  const handleSpecializationToggle = (specialization: string) => {
    setSelectedSpecializations(prev => 
      prev.includes(specialization) 
        ? prev.filter(s => s !== specialization)
        : [...prev, specialization]
    )
  }

  const handleSave = () => {
    const userData = {
      ...formData,
      specializations: selectedSpecializations,
      status: "active",
      lastActive: new Date().toISOString(),
      avatar: "/placeholder-user.jpg"
    }
    onSave(userData)
    handleClose()
  }

  const handleClose = () => {
    setStep(1)
    setSelectedSpecializations([])
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      role: "",
      reportingTo: "",
      clientMapping: []
    })
    onClose()
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email && formData.role
      case 2:
        return true // Specializations are optional
      case 3:
        return formData.role !== "Admin" || formData.reportingTo // Admin doesn't need reporting to
      default:
        return false
    }
  }

  const getRoleIcon = (role: string) => {
    const roleOption = roleOptions.find(r => r.value === role)
    return roleOption ? roleOption.icon : User
  }

  const getRoleDescription = (role: string) => {
    const roleOption = roleOptions.find(r => r.value === role)
    return roleOption ? roleOption.description : ""
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New User</DialogTitle>
          <DialogDescription>
            Step {step} of 3: {step === 1 ? "Basic Information" : step === 2 ? "Specializations" : "Reporting & Assignment"}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? "bg-cyan-600 text-white" 
                  : "bg-gray-200 text-gray-600"
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-8 h-0.5 ml-2 ${
                  step > stepNumber ? "bg-cyan-600" : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>Personal details and role assignment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            <div className="flex items-center gap-2">
                              <role.icon className="h-4 w-4" />
                              {role.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {formData.role && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      {React.createElement(getRoleIcon(formData.role), { className: "h-4 w-4 text-blue-600" })}
                      <span className="font-medium text-blue-900">{formData.role} Role</span>
                    </div>
                    <p className="text-sm text-blue-700">{getRoleDescription(formData.role)}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Specializations */}
        {step === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Specializations
                </CardTitle>
                <CardDescription>Select areas of expertise (optional but recommended)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {specializationOptions.map((specialization) => (
                    <div key={specialization} className="flex items-center space-x-2">
                      <Checkbox
                        id={specialization}
                        checked={selectedSpecializations.includes(specialization)}
                        onCheckedChange={() => handleSpecializationToggle(specialization)}
                      />
                      <Label 
                        htmlFor={specialization}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {specialization}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedSpecializations.length > 0 && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-900 mb-2">Selected Specializations:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedSpecializations.map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs bg-green-100 text-green-800 border-green-300">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Reporting & Assignment */}
        {step === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Reporting & Assignment
                </CardTitle>
                <CardDescription>Configure reporting structure and client assignments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.role !== "Admin" && (
                  <div className="space-y-2">
                    <Label htmlFor="reportingTo">Reports To</Label>
                    <Select value={formData.reportingTo} onValueChange={(value) => setFormData({...formData, reportingTo: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reporting manager" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="John Smith">John Smith (Admin)</SelectItem>
                        <SelectItem value="Sarah Johnson">Sarah Johnson (Manager)</SelectItem>
                        <SelectItem value="Mike Chen">Mike Chen (Manager)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {formData.role === "Manager" && (
                  <div className="space-y-2">
                    <Label>Client Assignments</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="techcorp" />
                        <Label htmlFor="techcorp">TechCorp Solutions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="financefirst" />
                        <Label htmlFor="financefirst">FinanceFirst Bank</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="healthcare" />
                        <Label htmlFor="healthcare">HealthCare Plus</Label>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Select clients this manager will be responsible for</p>
                  </div>
                )}

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Settings className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-900">Next Steps</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    After creating the user, you can assign specific permissions and configure additional settings in the user management section.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <DialogFooter className="flex justify-between">
          <div>
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            {step < 3 ? (
              <Button 
                onClick={() => setStep(step + 1)}
                disabled={!isStepValid()}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSave}
                disabled={!isStepValid()}
                className="bg-green-600 hover:bg-green-700"
              >
                Create User
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
