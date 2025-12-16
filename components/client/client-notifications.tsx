"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Shield,
  Calendar,
  FileText,
  Home,
  ChevronRight
} from "lucide-react"

interface ClientNotificationsProps {
  onBack: () => void
}

const notifications = [
  { 
    id: 1, 
    type: "security",
    title: "Security scan completed", 
    message: "Network Red Teaming scan finished successfully. 5 new vulnerabilities found.", 
    time: "2 hours ago", 
    read: false,
    icon: Shield
  },
  { 
    id: 2, 
    type: "alert",
    title: "Critical vulnerability detected", 
    message: "A critical vulnerability was detected in your API endpoints. Immediate action required.", 
    time: "5 hours ago", 
    read: false,
    icon: AlertTriangle
  },
  { 
    id: 3, 
    type: "calendar",
    title: "Audit scheduled", 
    message: "Cloud Security audit has been scheduled for December 15, 2025.", 
    time: "1 day ago", 
    read: true,
    icon: Calendar
  },
  { 
    id: 4, 
    type: "report",
    title: "Monthly report available", 
    message: "Your November 2025 security report is now available for download.", 
    time: "2 days ago", 
    read: true,
    icon: FileText
  },
  { 
    id: 5, 
    type: "info",
    title: "License renewal reminder", 
    message: "Your Enterprise license will renew on 02/11/2026. Review your subscription details.", 
    time: "3 days ago", 
    read: true,
    icon: Info
  },
  { 
    id: 6, 
    type: "security",
    title: "Phishing simulation completed", 
    message: "The phishing simulation campaign has concluded. View results in your dashboard.", 
    time: "5 days ago", 
    read: true,
    icon: Shield
  },
  { 
    id: 7, 
    type: "alert",
    title: "High risk vulnerability fixed", 
    message: "3 high-risk vulnerabilities have been marked as fixed in your last remediation cycle.", 
    time: "1 week ago", 
    read: true,
    icon: CheckCircle
  },
]

function getTypeColor(type: string) {
  switch (type) {
    case "security":
      return "bg-cyan-100 text-cyan-600"
    case "alert":
      return "bg-red-100 text-red-600"
    case "calendar":
      return "bg-amber-100 text-amber-600"
    case "report":
      return "bg-green-100 text-green-600"
    case "info":
      return "bg-blue-100 text-blue-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

export default function ClientNotifications({ onBack }: ClientNotificationsProps) {
  const [notificationList, setNotificationList] = useState(notifications)

  const markAllAsRead = () => {
    setNotificationList(notificationList.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotificationList(notificationList.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const unreadCount = notificationList.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-3">
        <div className="flex items-center text-sm text-gray-500">
          <button 
            onClick={onBack} 
            className="flex items-center gap-1 hover:text-cyan-600 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </button>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">Notifications</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
              <Bell className="h-5 w-5 text-cyan-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Notifications</h1>
              <p className="text-sm text-gray-500">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              className="text-cyan-600 border-cyan-600 hover:bg-cyan-50"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <Card>
          <CardContent className="p-0">
            {notificationList.map((notification, index) => {
              const IconComponent = notification.icon
              return (
                <div 
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    index !== notificationList.length - 1 ? 'border-b' : ''
                  } ${!notification.read ? 'bg-cyan-50/50' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(notification.type)}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-cyan-500" />
                      )}
                      <h3 className={`font-medium text-gray-800 ${!notification.read ? 'font-semibold' : ''}`}>
                        {notification.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <span className="text-xs text-gray-400 mt-2 inline-block">{notification.time}</span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      <footer className="bg-gray-100 border-t py-4 px-6 flex justify-between items-center text-sm text-gray-500">
        <span>Copyright. 2025. Necurity Solutions.</span>
        <span>Version 1.0.0</span>
      </footer>
    </div>
  )
}
