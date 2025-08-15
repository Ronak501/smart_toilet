import { AlertTriangle, Clock } from "lucide-react"

interface NotificationData {
  id: string
  message: string
  timestamp: string
  type: "warning" | "alert" | "info"
}

interface NotificationItemProps {
  notification: NotificationData
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const typeConfig = {
    warning: {
      icon: AlertTriangle,
      color: "text-orange-500",
    },
    alert: {
      icon: AlertTriangle,
      color: "text-red-500",
    },
    info: {
      icon: Clock,
      color: "text-blue-500",
    },
  }

  const config = typeConfig[notification.type]
  const Icon = config.icon

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${config.color}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 leading-relaxed">{notification.message}</p>
        <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
      </div>
    </div>
  )
}
