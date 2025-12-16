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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  User, 
  Lock, 
  Camera, 
  Shield, 
  Calendar, 
  Mail, 
  Phone,
  Building,
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
  Settings,
  Edit,
  Save,
  X,
  Activity,
  Key,
  Briefcase,
  Target,
  ClipboardList,
  CheckCircle,
  Clock
} from "lucide-react"

interface TesterProfileProps {
  onBack: () => void
}

const profileData = {
  firstName: "Arjun",
  lastName: "Patel",
  email: "arjun.patel@necurity.com",
  phone: "+91 98765 67890",
  department: "Security Testing",
  role: "Senior Security Tester",
  employeeId: "EMP-025",
  joinDate: "Jun 15, 2023",
  lastLogin: "Dec 11, 2025, 08:30 AM",
  status: "Active",
  specialization: "Web Application Security",
  certifications: ["CEH", "OSCP", "GPEN"]
}

const recentTasks = [
  { id: 1, name: "API Security Assessment - Tech Corp", status: "In Progress", dueDate: "Dec 15, 2025", priority: "High" },
  { id: 2, name: "Network Penetration Test - Finance Ltd", status: "Completed", dueDate: "Dec 10, 2025", priority: "Medium" },
  { id: 3, name: "Web App Security - Retail Co", status: "Pending", dueDate: "Dec 20, 2025", priority: "High" },
  { id: 4, name: "Cloud Security Review - StartupXYZ", status: "In Progress", dueDate: "Dec 18, 2025", priority: "Medium" },
]

export default function TesterProfile({ onBack }: TesterProfileProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
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
  
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  
  const [editableProfile, setEditableProfile] = useState({ ...profileData })

  const avatarOptions = [
    { id: "ap", label: "AP", color: "bg-cyan-600" },
    { id: "st", label: "ST", color: "bg-blue-600" },
    { id: "pt", label: "PT", color: "bg-green-600" },
    { id: "te", label: "TE", color: "bg-purple-600" },
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
      case "Completed": return "bg-green-100 text-green-700"
      case "In Progress": return "bg-blue-100 text-blue-700"
      case "Pending": return "bg-amber-100 text-amber-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-700"
      case "Medium": return "bg-amber-100 text-amber-700"
      case "Low": return "bg-green-100 text-green-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-shrink-0 bg-white border-b px-4 md:px-6 py-3">
        <div className="flex items-center text-sm text-gray-500">
          <button onClick={onBack} className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
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
                <div className="w-20 h-20 rounded-full bg-cyan-600 flex items-center justify-center text-white text-2xl font-semibold">
                  {selectedAvatar ? avatarOptions.find(a => a.id === selectedAvatar)?.label : "AP"}
                </div>
                <button 
                  onClick={() => setShowAvatarDialog(true)}
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white border-2 border-cyan-600 flex items-center justify-center hover:bg-cyan-50 transition-colors"
                >
                  <Camera className="h-3.5 w-3.5 text-cyan-600" />
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profileData.firstName} {profileData.lastName}</h1>
                <p className="text-gray-500">{profileData.role}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-green-100 text-green-700">{profileData.status}</Badge>
                  <Badge className="bg-purple-100 text-purple-700">Tester</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4 mr-2" />Cancel
                  </Button>
                  <Button onClick={handleSaveProfile} className="bg-cyan-600 hover:bg-cyan-700">
                    <Save className="h-4 w-4 mr-2" />Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />Edit Profile
                </Button>
              )}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white border">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />Notifications
              </TabsTrigger>
              <TabsTrigger value="tasks" className="gap-2">
                <ClipboardList className="h-4 w-4" />Tasks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-cyan-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      {isEditing ? (
                        <Input value={editableProfile.firstName} onChange={(e) => setEditableProfile({...editableProfile, firstName: e.target.value})} />
                      ) : (
                        <p className="text-gray-900 font-medium">{profileData.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      {isEditing ? (
                        <Input value={editableProfile.lastName} onChange={(e) => setEditableProfile({...editableProfile, lastName: e.target.value})} />
                      ) : (
                        <p className="text-gray-900 font-medium">{profileData.lastName}</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-400" />Email</Label>
                      {isEditing ? (
                        <Input type="email" value={editableProfile.email} onChange={(e) => setEditableProfile({...editableProfile, email: e.target.value})} />
                      ) : (
                        <p className="text-gray-900 font-medium">{profileData.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-400" />Phone</Label>
                      {isEditing ? (
                        <Input value={editableProfile.phone} onChange={(e) => setEditableProfile({...editableProfile, phone: e.target.value})} />
                      ) : (
                        <p className="text-gray-900 font-medium">{profileData.phone}</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Building className="h-4 w-4 text-gray-400" />Department</Label>
                      <p className="text-gray-900 font-medium">{profileData.department}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-gray-400" />Role</Label>
                      <p className="text-gray-900 font-medium">{profileData.role}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gray-400" />Employee ID</Label>
                      <p className="text-gray-900 font-medium">{profileData.employeeId}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Target className="h-4 w-4 text-gray-400" />Specialization</Label>
                      <p className="text-gray-900 font-medium">{profileData.specialization}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-cyan-600" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.certifications.map((cert, index) => (
                      <Badge key={index} className="bg-cyan-100 text-cyan-700 text-sm px-3 py-1">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-cyan-600" />
                    Work Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-cyan-50 rounded-lg text-center">
                      <ClipboardList className="h-6 w-6 text-cyan-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-cyan-600">4</p>
                      <p className="text-sm text-gray-600">Active Tasks</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-600">28</p>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">156</p>
                      <p className="text-sm text-gray-600">Findings</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg text-center">
                      <Clock className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-amber-600">2</p>
                      <p className="text-sm text-gray-600">Pending Review</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lock className="h-5 w-5 text-cyan-600" />
                    Password & Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-gray-500">Last changed 60 days ago</p>
                    </div>
                    <Button variant="outline" onClick={() => setShowPasswordDialog(true)}>
                      <Key className="h-4 w-4 mr-2" />Change Password
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-cyan-600" />
                    Login Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Current Session</p>
                        <p className="text-xs text-gray-500">Chrome on Windows • Bangalore, India</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Dec 10, 2025 at 6:00 PM</p>
                        <p className="text-xs text-gray-500">Firefox on Linux • Bangalore, India</p>
                      </div>
                      <span className="text-xs text-gray-400">Ended</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="h-5 w-5 text-cyan-600" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-500">Receive push notifications in browser</p>
                    </div>
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Receive critical alerts via SMS</p>
                    </div>
                    <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notification Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Task Assignments</p>
                      <p className="text-xs text-gray-500">When new tasks are assigned to you</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Approval Updates</p>
                      <p className="text-xs text-gray-500">When your findings are approved or rejected</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Deadline Reminders</p>
                      <p className="text-xs text-gray-500">Reminders about upcoming task deadlines</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Team Messages</p>
                      <p className="text-xs text-gray-500">Messages from your team or manager</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-cyan-600" />
                    Recent Tasks
                  </CardTitle>
                  <CardDescription>Your recently assigned and completed tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{task.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                            <Badge className={getPriorityBadge(task.priority)}>{task.priority}</Badge>
                          </div>
                        </div>
                        <Badge className={getStatusBadge(task.status)}>{task.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="h-5 w-5 text-cyan-600" />
                    Display Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {darkMode ? <Moon className="h-5 w-5 text-gray-600" /> : <Sun className="h-5 w-5 text-amber-500" />}
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-gray-500">Switch to dark theme</p>
                      </div>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Language</p>
                        <p className="text-sm text-gray-500">Select your preferred language</p>
                      </div>
                    </div>
                    <select className="border rounded-md px-3 py-2 text-sm">
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="ta">Tamil</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-cyan-600" />Change Password
            </DialogTitle>
            <DialogDescription>Enter your current password and choose a new one</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {passwordError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                <AlertCircle className="h-4 w-4" />{passwordError}
              </div>
            )}
            {passwordSuccess && (
              <div className="flex items-center gap-2 p-3 bg-green-50 text-green-600 rounded-lg text-sm">
                <Check className="h-4 w-4" />Password changed successfully!
              </div>
            )}
            <div className="space-y-2">
              <Label>Current Password</Label>
              <div className="relative">
                <Input type={showCurrentPassword ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <div className="relative">
                <Input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <div className="relative">
                <Input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>Cancel</Button>
            <Button onClick={handlePasswordChange} className="bg-cyan-600 hover:bg-cyan-700">Change Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-cyan-600" />Change Profile Picture
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center gap-4">
              {avatarOptions.map((avatar) => (
                <button key={avatar.id} onClick={() => setSelectedAvatar(avatar.id)} className={`w-16 h-16 rounded-full ${avatar.color} flex items-center justify-center text-white text-lg font-semibold ring-offset-2 transition-all ${selectedAvatar === avatar.id ? 'ring-2 ring-cyan-600' : 'hover:ring-2 hover:ring-gray-300'}`}>
                  {avatar.label}
                </button>
              ))}
            </div>
            <div className="text-center text-sm text-gray-500">Or upload a custom image</div>
            <div className="flex justify-center">
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" id="avatar-upload" />
              <label htmlFor="avatar-upload" className="px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition-colors text-sm text-gray-600">Choose File</label>
            </div>
            {avatarPreview && (
              <div className="flex justify-center">
                <img src={avatarPreview} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAvatarDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveAvatar} className="bg-cyan-600 hover:bg-cyan-700">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
