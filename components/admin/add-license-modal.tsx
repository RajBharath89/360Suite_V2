"use client"

import { useState } from "react"
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
  Building2, 
  Mail, 
  Phone, 
  FileText,
  Shield,
  Calendar,
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle
} from "lucide-react"

interface AddLicenseModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (licenseData: any) => void
}

const licenseTypes = [
  { value: "Standard", label: "Standard", price: "$15,000", features: ["Basic security assessment", "Monthly reports", "Email support"] },
  { value: "Professional", label: "Professional", price: "$25,000", features: ["Advanced security testing", "Quarterly reports", "Priority support", "Compliance assistance"] },
  { value: "Enterprise", label: "Enterprise", price: "$50,000", features: ["Comprehensive security suite", "Custom reporting", "Dedicated support", "Full compliance", "Incident response"] },
  { value: "Premium", label: "Premium", price: "$75,000", features: ["All Enterprise features", "24/7 support", "Custom integrations", "Executive reporting", "Risk management"] }
]

const serviceOptions = [
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
  "Security Training"
]

const frequencyOptions = [
  "Monthly",
  "Quarterly",
  "Semi-Annually",
  "Annually",
  "One-Time",
  "As Needed"
]

export default function AddLicenseModal({ isOpen, onClose, onSave }: AddLicenseModalProps) {
  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    licenseType: "",
    startDate: "",
    endDate: "",
    contractValue: "",
    autoRenewal: false,
    notes: ""
  })

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

  const handleSave = () => {
    const licenseData = {
      ...formData,
      services: selectedServices,
      status: "active",
      daysRemaining: Math.ceil((new Date(formData.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
      renewalStatus: "valid",
      lastRenewal: formData.startDate,
      nextRenewal: formData.endDate,
      clientLogo: "/placeholder-logo.svg"
    }
    onSave(licenseData)
    handleClose()
  }

  const handleClose = () => {
    setStep(1)
    setSelectedServices([])
    setFormData({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      licenseType: "",
      startDate: "",
      endDate: "",
      contractValue: "",
      autoRenewal: false,
      notes: ""
    })
    onClose()
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.clientName && formData.clientEmail && formData.licenseType
      case 2:
        return selectedServices.length > 0
      case 3:
        return formData.startDate && formData.endDate
      default:
        return false
    }
  }

  const getSelectedLicenseType = () => {
    return licenseTypes.find(lt => lt.value === formData.licenseType)
  }

  const calculateContractValue = () => {
    const licenseType = getSelectedLicenseType()
    if (licenseType) {
      return licenseType.price
    }
    return formData.contractValue
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New License</DialogTitle>
          <DialogDescription>
            Step {step} of 3: {step === 1 ? "Client & License Type" : step === 2 ? "Services Selection" : "Contract Details"}
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

        {/* Step 1: Client & License Type */}
        {step === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Client Information
                </CardTitle>
                <CardDescription>Basic client details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name *</Label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                      placeholder="Enter client company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">Contact Email *</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                      placeholder="Enter contact email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientPhone">Contact Phone</Label>
                    <Input
                      id="clientPhone"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                      placeholder="Enter contact phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseType">License Type *</Label>
                    <Select value={formData.licenseType} onValueChange={(value) => setFormData({...formData, licenseType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select license type" />
                      </SelectTrigger>
                      <SelectContent>
                        {licenseTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center justify-between w-full">
                              <span>{type.label}</span>
                              <span className="text-sm text-gray-500 ml-2">{type.price}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {formData.licenseType && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">{getSelectedLicenseType()?.label} License</span>
                      <Badge className="bg-blue-100 text-blue-800">{getSelectedLicenseType()?.price}</Badge>
                    </div>
                    <div className="space-y-1">
                      {getSelectedLicenseType()?.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-blue-700">
                          <CheckCircle className="h-3 w-3" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Services Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Services Selection
                </CardTitle>
                <CardDescription>Select the services included in this license</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {serviceOptions.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={selectedServices.includes(service)}
                        onCheckedChange={() => handleServiceToggle(service)}
                      />
                      <Label 
                        htmlFor={service}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedServices.length > 0 && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-900 mb-2">Selected Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedServices.map((service) => (
                        <Badge key={service} variant="outline" className="text-xs bg-green-100 text-green-800 border-green-300">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Contract Details */}
        {step === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Contract Details
                </CardTitle>
                <CardDescription>Configure contract terms and pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contractValue">Contract Value</Label>
                    <Input
                      id="contractValue"
                      value={formData.contractValue || calculateContractValue()}
                      onChange={(e) => setFormData({...formData, contractValue: e.target.value})}
                      placeholder="Enter contract value"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Auto Renewal</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoRenewal"
                        checked={formData.autoRenewal}
                        onCheckedChange={(checked) => setFormData({...formData, autoRenewal: !!checked})}
                      />
                      <Label htmlFor="autoRenewal">Enable automatic renewal</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Any additional notes about this license"
                    rows={3}
                  />
                </div>
                
                {/* Contract Summary */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Contract Summary</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Client:</span>
                      <span className="font-medium">{formData.clientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>License Type:</span>
                      <span className="font-medium">{formData.licenseType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Services:</span>
                      <span className="font-medium">{selectedServices.length} selected</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">
                        {formData.startDate && formData.endDate 
                          ? `${new Date(formData.startDate).toLocaleDateString()} - ${new Date(formData.endDate).toLocaleDateString()}`
                          : "Not set"
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Value:</span>
                      <span className="font-medium">{formData.contractValue || calculateContractValue()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Auto Renewal:</span>
                      <span className="font-medium">{formData.autoRenewal ? "Enabled" : "Disabled"}</span>
                    </div>
                  </div>
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
                Create License
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
