"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  ArrowLeft, 
  User, 
  Lock, 
  Camera, 
  Shield, 
  Calendar, 
  Mail, 
  Phone,
  Building,
  MapPin,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Bell,
  Moon,
  Sun,
  Globe,
  Home,
  ChevronRight,
  Ticket,
  Settings,
  Star,
  FileText,
  Clock,
  MessageSquare,
  Edit,
  Save,
  X,
  Receipt,
  Users
} from "lucide-react"

interface ClientProfileProps {
  onBack: () => void
}

const licenseData = {
  type: "Enterprise",
  status: "Active",
  contractValue: "$45,000",
  startDate: "02/11/2024",
  renewalDate: "02/11/2026",
  services: 9,
  activeServices: 6,
  features: [
    "Unlimited security assessments",
    "24/7 Priority support",
    "Dedicated account manager",
    "Custom reporting",
    "API access",
    "Advanced analytics"
  ]
}

const profileData = {
  companyName: "Pon Pure Chemicals India Pvt Ltd",
  email: "security@ponpure.com",
  phone: "+91 44 2345 6789",
  alternatePhone: "+91 98765 43210",
  address: "No. 123, Industrial Estate, Guindy, Chennai - 600032",
  city: "Chennai",
  state: "Tamil Nadu",
  country: "India",
  pincode: "600032",
  industry: "Chemical Manufacturing",
  gstNumber: "33AABCP1234A1ZV",
  contactPerson: "Rajesh Kumar",
  contactRole: "CISO",
  contactEmail: "rajesh.kumar@ponpure.com",
  contactPhone: "+91 98765 43210"
}

const ticketsData = [
  { id: "TKT-001", subject: "Request for additional scope", status: "Open", priority: "High", date: "Dec 10, 2025" },
  { id: "TKT-002", subject: "Clarification on finding #5", status: "In Progress", priority: "Medium", date: "Dec 8, 2025" },
  { id: "TKT-003", subject: "Report download issue", status: "Resolved", priority: "Low", date: "Dec 5, 2025" },
  { id: "TKT-004", subject: "Schedule change request", status: "Resolved", priority: "Medium", date: "Dec 1, 2025" },
]

const reviewsData = [
  { id: 1, service: "Network Red Teaming", rating: 5, comment: "Excellent thorough assessment. Team was very professional.", date: "Nov 15, 2025" },
  { id: 2, service: "Cloud Security Assessment", rating: 4, comment: "Good coverage of cloud infrastructure vulnerabilities.", date: "Oct 20, 2025" },
  { id: 3, service: "API Security Assessment", rating: 5, comment: "Found critical issues we missed. Very impressed.", date: "Sep 10, 2025" },
]

export default function ClientProfile({ onBack }: ClientProfileProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showPdfPasswordDialog, setShowPdfPasswordDialog] = useState(false)
  const [showAvatarDialog, setShowAvatarDialog] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  
  const [pdfPassword, setPdfPassword] = useState("")
  const [confirmPdfPassword, setConfirmPdfPassword] = useState("")
  const [pdfPasswordError, setPdfPasswordError] = useState("")
  const [pdfPasswordSuccess, setPdfPasswordSuccess] = useState(false)
  
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [notifications, setNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  
  const [editableProfile, setEditableProfile] = useState({ ...profileData })

  const avatarOptions = [
    { id: "pp", label: "PP", color: "bg-cyan-600" },
    { id: "pc", label: "PC", color: "bg-blue-600" },
    { id: "pon", label: "PO", color: "bg-green-600" },
    { id: "chem", label: "CH", color: "bg-purple-600" },
  ]

  const handlePasswordChange = () => {
    setPasswordError("")
    setPasswordSuccess(false)

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required")
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    setPasswordSuccess(true)
    setTimeout(() => {
      setShowPasswordDialog(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setPasswordSuccess(false)
    }, 2000)
  }

  const handlePdfPasswordChange = () => {
    setPdfPasswordError("")
    setPdfPasswordSuccess(false)

    if (!pdfPassword || !confirmPdfPassword) {
      setPdfPasswordError("All fields are required")
      return
    }

    if (pdfPassword.length < 6) {
      setPdfPasswordError("PDF password must be at least 6 characters")
      return
    }

    if (pdfPassword !== confirmPdfPassword) {
      setPdfPasswordError("Passwords do not match")
      return
    }

    setPdfPasswordSuccess(true)
    setTimeout(() => {
      setShowPdfPasswordDialog(false)
      setPdfPassword("")
      setConfirmPdfPassword("")
      setPdfPasswordSuccess(false)
    }, 2000)
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveAvatar = () => {
    setShowAvatarDialog(false)
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-cyan-100 text-cyan-700"
      case "In Progress":
        return "bg-amber-100 text-amber-700"
      case "Resolved":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700"
      case "Medium":
        return "bg-amber-100 text-amber-700"
      case "Low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-gray-50">
        <div className="flex-shrink-0 bg-white border-b px-4 md:px-6 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <button 
              onClick={onBack} 
              className="flex items-center gap-1 hover:text-cyan-600 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">Profile & Settings</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-cyan-600 text-white flex items-center justify-center text-2xl font-bold">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      "PP"
                    )}
                  </div>
                  <button 
                    onClick={() => setShowAvatarDialog(true)}
                    className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Camera className="h-3 w-3 text-gray-600" />
                  </button>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{profileData.companyName}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {licenseData.type} License
                    </Badge>
                    <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-100">
                      {licenseData.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
                <TabsTrigger value="tickets" className="gap-2">
                  <Ticket className="h-4 w-4" />
                  <span className="hidden sm:inline">Tickets</span>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="gap-2">
                  <Star className="h-4 w-4" />
                  <span className="hidden sm:inline">Reviews</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Building className="h-5 w-5 text-cyan-600" />
                          Company Information
                        </CardTitle>
                        <CardDescription>Your organization details</CardDescription>
                      </div>
                      {!isEditing ? (
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                          <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700" onClick={handleSaveProfile}>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company Name</Label>
                          <Input 
                            value={editableProfile.companyName} 
                            onChange={(e) => setEditableProfile({...editableProfile, companyName: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Industry</Label>
                          <Input 
                            value={editableProfile.industry} 
                            onChange={(e) => setEditableProfile({...editableProfile, industry: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>GST Number</Label>
                          <Input 
                            value={editableProfile.gstNumber} 
                            onChange={(e) => setEditableProfile({...editableProfile, gstNumber: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input 
                            value={editableProfile.email} 
                            onChange={(e) => setEditableProfile({...editableProfile, email: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input 
                            value={editableProfile.phone} 
                            onChange={(e) => setEditableProfile({...editableProfile, phone: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Alternate Phone</Label>
                          <Input 
                            value={editableProfile.alternatePhone} 
                            onChange={(e) => setEditableProfile({...editableProfile, alternatePhone: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Textarea 
                          value={editableProfile.address} 
                          onChange={(e) => setEditableProfile({...editableProfile, address: e.target.value})}
                          disabled={!isEditing}
                          rows={2}
                        />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input 
                            value={editableProfile.city} 
                            onChange={(e) => setEditableProfile({...editableProfile, city: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>State</Label>
                          <Input 
                            value={editableProfile.state} 
                            onChange={(e) => setEditableProfile({...editableProfile, state: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Country</Label>
                          <Input 
                            value={editableProfile.country} 
                            onChange={(e) => setEditableProfile({...editableProfile, country: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Pincode</Label>
                          <Input 
                            value={editableProfile.pincode} 
                            onChange={(e) => setEditableProfile({...editableProfile, pincode: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5 text-cyan-600" />
                        Contact Person
                      </CardTitle>
                      <CardDescription>Primary point of contact</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input 
                            value={editableProfile.contactPerson} 
                            onChange={(e) => setEditableProfile({...editableProfile, contactPerson: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Role</Label>
                          <Input 
                            value={editableProfile.contactRole} 
                            onChange={(e) => setEditableProfile({...editableProfile, contactRole: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input 
                            value={editableProfile.contactEmail} 
                            onChange={(e) => setEditableProfile({...editableProfile, contactEmail: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input 
                            value={editableProfile.contactPhone} 
                            onChange={(e) => setEditableProfile({...editableProfile, contactPhone: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Shield className="h-5 w-5 text-cyan-600" />
                        License Information
                      </CardTitle>
                      <CardDescription>Your current subscription and license details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                        <div className="text-center p-4 bg-cyan-50 rounded-lg">
                          <p className="text-2xl font-bold text-cyan-700">{licenseData.type}</p>
                          <p className="text-xs text-gray-500 mt-1">License Type</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-700">{licenseData.status}</p>
                          <p className="text-xs text-gray-500 mt-1">Status</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-700">{licenseData.contractValue}</p>
                          <p className="text-xs text-gray-500 mt-1">Contract Value</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <p className="text-2xl font-bold text-purple-700">{licenseData.services}</p>
                          <p className="text-xs text-gray-500 mt-1">Total Services</p>
                        </div>
                        <div className="text-center p-4 bg-amber-50 rounded-lg">
                          <p className="text-2xl font-bold text-amber-700">{licenseData.activeServices}</p>
                          <p className="text-xs text-gray-500 mt-1">Active Services</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-lg font-bold text-gray-700">{licenseData.renewalDate}</p>
                          <p className="text-xs text-gray-500 mt-1">Renewal Date</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Included Features</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {licenseData.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lock className="h-5 w-5 text-cyan-600" />
                        Password Management
                      </CardTitle>
                      <CardDescription>Manage your account and report passwords</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">User Password</h4>
                          <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowPasswordDialog(true)}
                          className="border-cyan-600 text-cyan-600 hover:bg-cyan-50"
                        >
                          Change Password
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">PDF Report Password</h4>
                          <p className="text-sm text-gray-500">Password for encrypted PDF reports</p>
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowPdfPasswordDialog(true)}
                          className="border-cyan-600 text-cyan-600 hover:bg-cyan-50"
                        >
                          Set Password
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Bell className="h-5 w-5 text-cyan-600" />
                        Notification Preferences
                      </CardTitle>
                      <CardDescription>Customize how you receive updates</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5 text-gray-400" />
                          <div>
                            <h4 className="font-medium text-gray-900">Push Notifications</h4>
                            <p className="text-sm text-gray-500">Browser push notifications</p>
                          </div>
                        </div>
                        <Switch checked={notifications} onCheckedChange={setNotifications} />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <div>
                            <h4 className="font-medium text-gray-900">Email Alerts</h4>
                            <p className="text-sm text-gray-500">Security updates via email</p>
                          </div>
                        </div>
                        <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-gray-400" />
                          <div>
                            <h4 className="font-medium text-gray-900">SMS Alerts</h4>
                            <p className="text-sm text-gray-500">Critical alerts via SMS</p>
                          </div>
                        </div>
                        <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {darkMode ? <Moon className="h-5 w-5 text-gray-400" /> : <Sun className="h-5 w-5 text-gray-400" />}
                          <div>
                            <h4 className="font-medium text-gray-900">Dark Mode</h4>
                            <p className="text-sm text-gray-500">Switch between themes</p>
                          </div>
                        </div>
                        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tickets" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Ticket className="h-5 w-5 text-cyan-600" />
                        Support Tickets
                      </CardTitle>
                      <CardDescription>Your submitted tickets and their status</CardDescription>
                    </div>
                    <Button className="bg-cyan-600 hover:bg-cyan-700">
                      New Ticket
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-gray-50">
                            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Ticket ID</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Subject</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Priority</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Date</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ticketsData.map((ticket) => (
                            <tr key={ticket.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4 font-medium text-cyan-600">{ticket.id}</td>
                              <td className="py-3 px-4 text-gray-800">{ticket.subject}</td>
                              <td className="py-3 px-4">
                                <Badge className={getStatusBadge(ticket.status)}>{ticket.status}</Badge>
                              </td>
                              <td className="py-3 px-4">
                                <Badge className={getPriorityBadge(ticket.priority)}>{ticket.priority}</Badge>
                              </td>
                              <td className="py-3 px-4 text-gray-600">{ticket.date}</td>
                              <td className="py-3 px-4">
                                <Button variant="ghost" size="sm" className="text-cyan-600">
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Star className="h-5 w-5 text-cyan-600" />
                      Reviews Provided
                    </CardTitle>
                    <CardDescription>Your feedback on completed services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reviewsData.map((review) => (
                        <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-gray-900">{review.service}</h4>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Enter your current password and choose a new one
              </DialogDescription>
            </DialogHeader>
            
            {passwordSuccess ? (
              <div className="flex flex-col items-center py-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-lg font-medium text-gray-900">Password Changed!</p>
                <p className="text-sm text-gray-500">Your password has been updated successfully</p>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {passwordError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {passwordError}
                  </div>
                )}

                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handlePasswordChange} className="bg-cyan-600 hover:bg-cyan-700">
                    Update Password
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={showPdfPasswordDialog} onOpenChange={setShowPdfPasswordDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Set PDF Report Password</DialogTitle>
              <DialogDescription>
                This password will be used to encrypt your PDF reports
              </DialogDescription>
            </DialogHeader>
            
            {pdfPasswordSuccess ? (
              <div className="flex flex-col items-center py-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-lg font-medium text-gray-900">PDF Password Set!</p>
                <p className="text-sm text-gray-500">Your reports will now be encrypted</p>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>PDF Password</Label>
                  <Input
                    type="password"
                    value={pdfPassword}
                    onChange={(e) => setPdfPassword(e.target.value)}
                    placeholder="Enter PDF password"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Confirm PDF Password</Label>
                  <Input
                    type="password"
                    value={confirmPdfPassword}
                    onChange={(e) => setConfirmPdfPassword(e.target.value)}
                    placeholder="Confirm PDF password"
                  />
                </div>

                {pdfPasswordError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {pdfPasswordError}
                  </div>
                )}

                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowPdfPasswordDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handlePdfPasswordChange} className="bg-cyan-600 hover:bg-cyan-700">
                    Set Password
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Change Avatar</DialogTitle>
              <DialogDescription>
                Upload a logo or choose from preset avatars
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-cyan-600 text-white flex items-center justify-center text-3xl font-bold overflow-hidden">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : selectedAvatar ? (
                    avatarOptions.find(a => a.id === selectedAvatar)?.label
                  ) : (
                    "PP"
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Upload Logo</Label>
                <div className="mt-2">
                  <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-cyan-400 transition-colors">
                    <div className="text-center">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto" />
                      <span className="text-sm text-gray-500">Click to upload</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Or choose preset</Label>
                <div className="mt-2 flex gap-3 justify-center">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => {
                        setSelectedAvatar(avatar.id)
                        setAvatarPreview(null)
                      }}
                      className={`w-12 h-12 rounded-full ${avatar.color} text-white font-bold flex items-center justify-center transition-all ${
                        selectedAvatar === avatar.id ? "ring-2 ring-offset-2 ring-cyan-600" : ""
                      }`}
                    >
                      {avatar.label}
                    </button>
                  ))}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAvatarDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveAvatar} className="bg-cyan-600 hover:bg-cyan-700">
                  Save Avatar
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
