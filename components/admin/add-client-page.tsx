"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { 
  Plus, 
  X, 
  Upload, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  FileText,
  Shield,
  Calendar,
  DollarSign,
  Paperclip,
  Image,
  File,
  CheckCircle,
  Home,
  ChevronRight,
  Save
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
}

interface FileAsset {
  name: string
  size: string
  type: string
  file: File
}

interface Service {
  id: string
  name: string
  frequency: string
  assets: (string | FileAsset)[]
}

interface AddClientPageProps {
  onBack: () => void
  onSave: (clientData: any) => void
  existingClients?: any[]
  editingClient?: any
  isEditMode?: boolean
  isViewMode?: boolean
}

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

const industryOptions = [
  "Technology",
  "Banking",
  "Healthcare", 
  "Retail",
  "Manufacturing",
  "Government",
  "Education",
  "Finance",
  "Insurance",
  "Other"
]

const licenseTypes = [
  "Standard",
  "Professional", 
  "Enterprise",
  "Premium"
]

export default function AddClientPage({ onBack, onSave, existingClients = [], editingClient, isEditMode = false, isViewMode = false }: AddClientPageProps) {
  const [step, setStep] = useState(1)
  const { toast } = useToast()
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "", email: "", phone: "" }
  ])
  const [services, setServices] = useState<Service[]>([])
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    location: "",
    notes: "",
    licenseType: "",
    startDate: "",
    endDate: "",
    autoRenewal: false,
    isExtension: false,
    extensionDays: ""
  })

  useEffect(() => {
    if ((isEditMode || isViewMode) && editingClient) {
      setFormData({
        companyName: editingClient.companyName || "",
        industry: editingClient.industry || "",
        location: editingClient.location || "",
        notes: editingClient.notes || "",
        licenseType: editingClient.licenseType || "",
        startDate: editingClient.startDate || "",
        endDate: editingClient.endDate || "",
        autoRenewal: editingClient.autoRenewal || false,
        isExtension: editingClient.isExtension || false,
        extensionDays: editingClient.extensionDays || ""
      })
      
      if (editingClient.contacts && editingClient.contacts.length > 0) {
        setContacts(editingClient.contacts.map((contact: any, index: number) => ({
          id: (index + 1).toString(),
          name: contact.name || "",
          email: contact.email || "",
          phone: contact.phone || ""
        })))
      } else {
        setContacts([{ id: "1", name: "", email: "", phone: "" }])
      }
      
      if (editingClient.services && editingClient.services.length > 0) {
        setServices(editingClient.services.map((service: any, index: number) => ({
          id: (index + 1).toString(),
          name: typeof service === 'string' ? service : (service.name || service),
          frequency: typeof service === 'string' ? "Monthly" : (service.frequency || "Monthly"),
          assets: typeof service === 'string' ? [] : (service.assets || [])
        })))
      } else {
        setServices([])
      }
    }
  }, [isEditMode, isViewMode, editingClient])

  const handleAddContact = () => {
    const newContact: Contact = {
      id: Date.now().toString(),
      name: "",
      email: "",
      phone: ""
    }
    setContacts([...contacts, newContact])
  }

  const handleRemoveContact = (id: string) => {
    if (contacts.length > 1) {
      setContacts(contacts.filter(contact => contact.id !== id))
    }
  }

  const handleContactChange = (id: string, field: keyof Contact, value: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ))
  }

  const handleAddService = () => {
    if (services.length > 0) {
      const lastService = services[services.length - 1]
      if (!lastService.name || !lastService.frequency) {
        return
      }
    }
    
    const newService: Service = {
      id: Date.now().toString(),
      name: "",
      frequency: "",
      assets: []
    }
    setServices([...services, newService])
  }

  const handleRemoveService = (id: string) => {
    setServices(services.filter(service => service.id !== id))
  }

  const handleServiceChange = (id: string, field: keyof Service, value: string | string[] | (string | FileAsset)[]) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ))
  }

  const handleAddAsset = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId)
    if (service) {
      const newAssets = [...service.assets, ""]
      handleServiceChange(serviceId, "assets", newAssets)
    }
  }

  const handleRemoveAsset = (serviceId: string, assetIndex: number) => {
    const service = services.find(s => s.id === serviceId)
    if (service) {
      const newAssets = service.assets.filter((_, index) => index !== assetIndex)
      handleServiceChange(serviceId, "assets", newAssets)
    }
  }

  const handleAssetChange = (serviceId: string, assetIndex: number, value: string) => {
    const service = services.find(s => s.id === serviceId)
    if (service) {
      const newAssets = [...service.assets]
      newAssets[assetIndex] = value
      handleServiceChange(serviceId, "assets", newAssets)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const isClientNameDuplicate = () => {
    if (!formData.companyName) return false
    return existingClients.some(client => 
      client.id !== editingClient?.id && 
      client.companyName.toLowerCase() === formData.companyName.toLowerCase()
    )
  }

  const isContactDuplicate = (contactEmail: string, currentContactId: string) => {
    if (!contactEmail) return false
    return contacts.some(contact => 
      contact.id !== currentContactId && 
      contact.email.toLowerCase() === contactEmail.toLowerCase()
    )
  }

  const handleSave = () => {
    const clientData = {
      ...formData,
      contacts: contacts.filter(contact => contact.name && contact.email),
      services: services.filter(service => service.name),
      status: "active"
    }
    onSave(clientData)
    
    toast({
      title: isEditMode ? "Client Updated Successfully!" : "Client Added Successfully!",
      description: `${formData.companyName} has been ${isEditMode ? "updated" : "added to your client list"} with ${contacts.length} contact(s) and ${services.length} service(s).`,
      duration: 5000,
    })
    
    onBack()
  }

  const handleLoadSample = () => {
    setFormData({
      companyName: "Acme Security Corp",
      industry: "Technology",
      location: "San Francisco, CA",
      notes: "High-priority client with multiple security requirements. Requires quarterly assessments.",
      licenseType: "Enterprise",
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      autoRenewal: true,
      isExtension: false,
      extensionDays: ""
    })

    setContacts([
      { id: "1", name: "John Smith", email: "john.smith@acme.com", phone: "+1-555-0123" },
      { id: "2", name: "Sarah Johnson", email: "sarah.johnson@acme.com", phone: "+1-555-0124" }
    ])

    setServices([
      {
        id: "1",
        name: "Penetration Testing",
        frequency: "Quarterly",
        assets: ["192.168.1.0/24", "app.acme.com", "api.acme.com"]
      },
      {
        id: "2", 
        name: "Vulnerability Assessment",
        frequency: "Monthly",
        assets: ["10.0.0.0/8", "admin.acme.com"]
      }
    ])
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.companyName && formData.industry && formData.location && !isClientNameDuplicate()
      case 2:
        return contacts.some(contact => contact.name && contact.email)
      case 3:
        return true
      case 4:
        return formData.licenseType && formData.startDate && formData.endDate
      default:
        return false
    }
  }

  const getTitle = () => {
    if (isViewMode) return "View Client"
    if (isEditMode) return "Edit Client"
    return "Add New Client"
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
              Clients
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
                onClick={handleSave} 
                disabled={!isStepValid()}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isEditMode ? "Update" : "Save"} Client
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
              Step {step} of 4: {step === 1 ? "Company Information" : step === 2 ? "Contact Details" : step === 3 ? "Services & Assets" : "License Information"}
            </p>
          </div>

          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  step === s 
                    ? "bg-cyan-600 text-white" 
                    : s < step 
                      ? "bg-cyan-100 text-cyan-700" 
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {s === 1 ? "Company" : s === 2 ? "Contacts" : s === 3 ? "Services" : "License"}
              </button>
            ))}
          </div>

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-cyan-600" />
                  Company Information
                </CardTitle>
                <CardDescription>Basic company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      placeholder="Enter company name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      disabled={isViewMode}
                    />
                    {isClientNameDuplicate() && (
                      <p className="text-red-500 text-xs">This company name already exists</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => setFormData({ ...formData, industry: value })}
                      disabled={isViewMode}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industryOptions.map((industry) => (
                          <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="City, State/Country"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes about the client..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    disabled={isViewMode}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-cyan-600" />
                  Contact Details
                </CardTitle>
                <CardDescription>Add one or more contacts for this client</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contacts.map((contact, index) => (
                  <div key={contact.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Contact {index + 1}</span>
                      {contacts.length > 1 && !isViewMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveContact(contact.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Name *</Label>
                        <Input
                          placeholder="Contact name"
                          value={contact.name}
                          onChange={(e) => handleContactChange(contact.id, "name", e.target.value)}
                          disabled={isViewMode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          placeholder="Email address"
                          value={contact.email}
                          onChange={(e) => handleContactChange(contact.id, "email", e.target.value)}
                          disabled={isViewMode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          placeholder="Phone number"
                          value={contact.phone}
                          onChange={(e) => handleContactChange(contact.id, "phone", e.target.value)}
                          disabled={isViewMode}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {!isViewMode && (
                  <Button variant="outline" onClick={handleAddContact} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Contact
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-cyan-600" />
                  Services & Assets
                </CardTitle>
                <CardDescription>Configure services for this client</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.map((service, index) => (
                  <div key={service.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Service {index + 1}</span>
                      {!isViewMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveService(service.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Service Type *</Label>
                        <Select
                          value={service.name}
                          onValueChange={(value) => handleServiceChange(service.id, "name", value)}
                          disabled={isViewMode}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Frequency *</Label>
                        <Select
                          value={service.frequency}
                          onValueChange={(value) => handleServiceChange(service.id, "frequency", value)}
                          disabled={isViewMode}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            {frequencyOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Assets</Label>
                      {service.assets.map((asset, assetIndex) => (
                        <div key={assetIndex} className="flex gap-2">
                          <Input
                            placeholder="IP address, domain, or URL"
                            value={typeof asset === 'string' ? asset : asset.name}
                            onChange={(e) => handleAssetChange(service.id, assetIndex, e.target.value)}
                            disabled={isViewMode}
                          />
                          {!isViewMode && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveAsset(service.id, assetIndex)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      {!isViewMode && (
                        <Button variant="outline" size="sm" onClick={() => handleAddAsset(service.id)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Asset
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {!isViewMode && (
                  <Button variant="outline" onClick={handleAddService} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                )}
                {services.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No services added yet. Click "Add Service" to get started.</p>
                )}
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-cyan-600" />
                  License Information
                </CardTitle>
                <CardDescription>Configure license details for this client</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>License Type *</Label>
                    <Select
                      value={formData.licenseType}
                      onValueChange={(value) => setFormData({ ...formData, licenseType: value })}
                      disabled={isViewMode}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select license type" />
                      </SelectTrigger>
                      <SelectContent>
                        {licenseTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date *</Label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Switch
                      checked={formData.autoRenewal}
                      onCheckedChange={(checked) => setFormData({ ...formData, autoRenewal: checked })}
                      disabled={isViewMode}
                    />
                    <Label>Auto-renewal</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              Previous
            </Button>
            <Button 
              onClick={() => setStep(Math.min(4, step + 1))}
              disabled={step === 4 || !isStepValid()}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
