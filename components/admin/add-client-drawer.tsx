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
  CheckCircle
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

interface AddClientDrawerProps {
  isOpen: boolean
  onClose: () => void
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

export default function AddClientDrawer({ isOpen, onClose, onSave, existingClients = [], editingClient, isEditMode = false, isViewMode = false }: AddClientDrawerProps) {
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

  // Populate form when editing or viewing
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
      
      // Set contacts
      if (editingClient.contacts && editingClient.contacts.length > 0) {
        setContacts(editingClient.contacts.map((contact: any, index: number) => ({
          id: (index + 1).toString(),
          name: contact.name || "",
          email: contact.email || "",
          phone: contact.phone || ""
        })))
      } else {
        // If no contacts, set default empty contact
        setContacts([{ id: "1", name: "", email: "", phone: "" }])
      }
      
      // Set services
      if (editingClient.services && editingClient.services.length > 0) {
        setServices(editingClient.services.map((service: any, index: number) => ({
          id: (index + 1).toString(),
          name: typeof service === 'string' ? service : (service.name || service),
          frequency: typeof service === 'string' ? "Monthly" : (service.frequency || "Monthly"),
          assets: typeof service === 'string' ? [] : (service.assets || [])
        })))
      } else {
        // If no services, set empty array
        setServices([])
      }
    } else if (!isEditMode && !isViewMode) {
      // Reset form when not in edit or view mode
      setFormData({
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
      setContacts([{ id: "1", name: "", email: "", phone: "" }])
      setServices([])
    }
  }, [isEditMode, isViewMode, editingClient, isOpen])

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
    // Check if current service has required fields
    if (services.length > 0) {
      const lastService = services[services.length - 1]
      if (!lastService.name || !lastService.frequency) {
        return // Don't add new service if current one is incomplete
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

  const handleAddFileAsset = (serviceId: string) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      files.forEach(file => {
        const fileAsset = {
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type,
          file: file
        }
        const service = services.find(s => s.id === serviceId)
        if (service) {
          const newAssets = [...service.assets, fileAsset]
          handleServiceChange(serviceId, "assets", newAssets)
        }
      })
    }
    input.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const isCurrentServiceComplete = () => {
    if (services.length === 0) return true // Allow adding first service
    const lastService = services[services.length - 1]
    return lastService.name && lastService.frequency
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

  const isContactPhoneDuplicate = (contactPhone: string, currentContactId: string) => {
    if (!contactPhone) return false
    return contacts.some(contact => 
      contact.id !== currentContactId && 
      contact.phone && contact.phone.toLowerCase() === contactPhone.toLowerCase()
    )
  }

  const isServiceDuplicate = (serviceName: string, frequency: string, currentServiceId?: string) => {
    if (!serviceName || !frequency) return false
    return services.some(service => 
      service.id !== currentServiceId && 
      service.name === serviceName && 
      service.frequency === frequency
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
    
    // Show success toast
    toast({
      title: isEditMode ? "Client Updated Successfully! 🎉" : "Client Added Successfully! 🎉",
      description: `${formData.companyName} has been ${isEditMode ? "updated" : "added to your client list"} with ${contacts.length} contact(s) and ${services.length} service(s).`,
      duration: 5000,
      variant: "success",
    })
    
    handleClose()
  }

  const handleClose = () => {
    setStep(1)
    setContacts([{ id: "1", name: "", email: "", phone: "" }])
    setServices([])
    setFormData({
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
    onClose()
  }

  const handleClear = () => {
    setStep(1)
    setContacts([{ id: "1", name: "", email: "", phone: "" }])
    setServices([])
    setFormData({
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
  }

  const handleLoadSample = () => {
    // Fill sample company data
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

    // Fill sample contacts
    setContacts([
      { id: "1", name: "John Smith", email: "john.smith@acme.com", phone: "+1-555-0123" },
      { id: "2", name: "Sarah Johnson", email: "sarah.johnson@acme.com", phone: "+1-555-0124" }
    ])

    // Fill sample services
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
      },
      {
        id: "3",
        name: "Compliance Audit",
        frequency: "Annually", 
        assets: ["compliance.acme.com"]
      }
    ])
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.companyName && formData.industry && formData.location && !isClientNameDuplicate()
      case 2:
        return contacts.some(contact => contact.name && contact.email) && 
               !contacts.some(contact => contact.email && isContactDuplicate(contact.email, contact.id)) &&
               !contacts.some(contact => contact.phone && isContactPhoneDuplicate(contact.phone, contact.id))
      case 3:
        return !services.some(service => 
          service.name && service.frequency && isServiceDuplicate(service.name, service.frequency, service.id)
        )
      case 4:
        return formData.licenseType && formData.startDate && formData.endDate && 
               (!formData.isExtension || (formData.extensionDays && parseInt(formData.extensionDays) > 0))
      default:
        return false
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent 
        className="w-[50vw] sm:w-[50vw] max-w-none"
        style={{ width: '50vw', maxWidth: 'none' }}
      >
        <SheetHeader>
          <div className="flex justify-between items-start">
            <div>
              <SheetTitle className="text-2xl font-bold">
                {isViewMode ? "View Client" : isEditMode ? "Edit Client" : "Add New Client"}
              </SheetTitle>
              <SheetDescription>
                Step {step} of 4: {step === 1 ? "Company Information" : step === 2 ? "Contact Details" : step === 3 ? "Services & Assets" : "License Information"}
              </SheetDescription>
            </div>
            {!isViewMode && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLoadSample}
                className="ml-4"
              >
                Load Sample
              </Button>
            )}
          </div>
        </SheetHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          {[
            { number: 1, label: "Company", icon: "🏢" },
            { number: 2, label: "Contacts", icon: "👥" },
            { number: 3, label: "Services", icon: "⚙️" },
            { number: 4, label: "License", icon: "📄" }
          ].map((stepInfo) => (
            <div key={stepInfo.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                  step >= stepInfo.number 
                    ? "border-cyan-600 bg-cyan-50 text-cyan-600" 
                    : "border-gray-300 bg-white text-gray-500"
                }`}>
                  <span className="text-lg">{stepInfo.icon}</span>
                </div>
                <span className={`text-xs mt-1 font-medium ${
                  step >= stepInfo.number ? "text-cyan-600" : "text-gray-500"
                }`}>
                  {stepInfo.label}
                </span>
              </div>
              {stepInfo.number < 4 && (
                <div className={`w-12 h-0.5 ml-4 ${
                  step > stepInfo.number ? "bg-cyan-600" : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Company Information */}
        {step === 1 && (
          <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </CardTitle>
                <CardDescription>Basic company details and information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                          placeholder="Enter company name"
                          className={isClientNameDuplicate() ? "border-red-300 focus:border-red-500" : ""}
                          readOnly={isViewMode}
                        />
                    {isClientNameDuplicate() && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <X className="h-4 w-4" />
                        This company name already exists. Please choose a different name.
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})} disabled={isViewMode}>
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
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="City, State, Country"
                    readOnly={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Additional notes about the client"
                    rows={3}
                    readOnly={isViewMode}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Contact Details */}
        {step === 2 && (
          <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>Add contact persons for this client</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contacts.map((contact, index) => (
                  <div key={contact.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Contact Person {index + 1}</h4>
                      {contacts.length > 1 && !isViewMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveContact(contact.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input
                          value={contact.name}
                          onChange={(e) => handleContactChange(contact.id, "name", e.target.value)}
                          placeholder="Enter full name"
                          readOnly={isViewMode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          value={contact.email}
                          onChange={(e) => handleContactChange(contact.id, "email", e.target.value)}
                          placeholder="Enter email address"
                          className={isContactDuplicate(contact.email, contact.id) ? "border-red-300 focus:border-red-500" : ""}
                          readOnly={isViewMode}
                        />
                        {isContactDuplicate(contact.email, contact.id) && contact.email && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <X className="h-4 w-4" />
                            This email already exists in this client. Please use a different email.
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          value={contact.phone}
                          onChange={(e) => handleContactChange(contact.id, "phone", e.target.value)}
                          placeholder="Enter phone number"
                          className={isContactPhoneDuplicate(contact.phone, contact.id) ? "border-red-300 focus:border-red-500" : ""}
                          readOnly={isViewMode}
                        />
                        {isContactPhoneDuplicate(contact.phone, contact.id) && contact.phone && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <X className="h-4 w-4" />
                            This phone number already exists in this client. Please use a different phone number.
                          </p>
                        )}
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
          </div>
        )}

        {/* Step 3: Services & Assets */}
        {step === 3 && (
          <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Services & Assets
                </CardTitle>
                <CardDescription>Configure services and their associated assets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {services.map((service, index) => (
                  <div key={service.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Service {index + 1}</h4>
                      {!isViewMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveService(service.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Service Type *</Label>
                        <Select value={service.name} onValueChange={(value) => handleServiceChange(service.id, "name", value)} disabled={isViewMode}>
                          <SelectTrigger className={
                            !service.name ? "border-red-300" : 
                            isServiceDuplicate(service.name, service.frequency, service.id) ? "border-red-300" : ""
                          }>
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceOptions.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {!service.name && (
                          <p className="text-sm text-red-600">Service type is required</p>
                        )}
                        {isServiceDuplicate(service.name, service.frequency, service.id) && service.name && service.frequency && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <X className="h-4 w-4" />
                            This service with the same frequency already exists. Please choose a different combination.
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Frequency *</Label>
                        <Select value={service.frequency} onValueChange={(value) => handleServiceChange(service.id, "frequency", value)} disabled={isViewMode}>
                          <SelectTrigger className={
                            !service.frequency ? "border-red-300" : 
                            isServiceDuplicate(service.name, service.frequency, service.id) ? "border-red-300" : ""
                          }>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            {frequencyOptions.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {!service.frequency && (
                          <p className="text-sm text-red-600">Frequency is required</p>
                        )}
                        {isServiceDuplicate(service.name, service.frequency, service.id) && service.name && service.frequency && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <X className="h-4 w-4" />
                            This service with the same frequency already exists. Please choose a different combination.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Assets</Label>
                      <div className="space-y-2">
                        {service.assets.map((asset, assetIndex) => (
                          <div key={assetIndex} className="flex gap-2">
                            <div className="flex-1">
                              {typeof asset === 'string' ? (
                                <Input
                                  value={asset}
                                  onChange={(e) => handleAssetChange(service.id, assetIndex, e.target.value)}
                                  placeholder="Enter asset (e.g., IP address, domain, server name)"
                                  readOnly={isViewMode}
                                />
                              ) : (
                                <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                                  <File className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-700">{(asset as FileAsset).name}</span>
                                  <span className="text-xs text-gray-500">({(asset as FileAsset).size})</span>
                                </div>
                              )}
                            </div>
                            {!isViewMode && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveAsset(service.id, assetIndex)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        {!isViewMode && (
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddAsset(service.id)}
                              className="flex-1"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Text Asset
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddFileAsset(service.id)}
                              className="flex-1"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload File
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {!isViewMode && (
                  <Button 
                    variant="outline" 
                    onClick={handleAddService} 
                    className="w-full"
                    disabled={!isCurrentServiceComplete()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {isCurrentServiceComplete() ? "Add Service" : "Complete current service first"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: License Information */}
        {step === 4 && (
          <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  License & Contract Details
                </CardTitle>
                <CardDescription>Configure license type and contract terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="licenseType">License Type *</Label>
                    <Select value={formData.licenseType} onValueChange={(value) => setFormData({...formData, licenseType: value})} disabled={isViewMode}>
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      readOnly={isViewMode}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      readOnly={isViewMode}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="autoRenewal"
                      checked={formData.autoRenewal}
                      onCheckedChange={(checked) => setFormData({...formData, autoRenewal: !!checked})}
                      disabled={isViewMode}
                    />
                    <Label htmlFor="autoRenewal" className="text-sm font-medium">
                      Enable Auto-Renewal
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500">
                    License will automatically renew before expiration
                  </p>
                </div>
                
                {/* License Extension Option */}
                <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isExtension"
                      checked={formData.isExtension}
                      onCheckedChange={(checked) => setFormData({...formData, isExtension: !!checked})}
                      disabled={isViewMode}
                    />
                    <Label htmlFor="isExtension" className="text-sm font-medium">
                      This is a license extension
                    </Label>
                  </div>
                  
                  {formData.isExtension && (
                    <div className="space-y-2">
                      <Label htmlFor="extensionDays">Extension Duration (Days) *</Label>
                      <Input
                        id="extensionDays"
                        type="number"
                        min="1"
                        value={formData.extensionDays}
                        onChange={(e) => setFormData({...formData, extensionDays: e.target.value})}
                        placeholder="Enter number of days to extend"
                        className="border-blue-200 focus:border-blue-400"
                        readOnly={isViewMode}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <SheetFooter className="flex justify-end">
          <div className="flex gap-2 ml-auto">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            {!isViewMode && (
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
            )}
            <Button variant="outline" onClick={handleClose}>
              {isViewMode ? "Close" : "Cancel"}
            </Button>
            {isViewMode ? (
              step < 4 && (
                <Button 
                  onClick={() => setStep(step + 1)}
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  Next
                </Button>
              )
            ) : (
              step < 4 ? (
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
                  {isEditMode ? "Update Client" : "Add Client"}
                </Button>
              )
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
