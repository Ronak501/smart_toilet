"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, Gauge, CheckCircle } from "lucide-react"

interface ToiletData {
  id: string
  name: string
  site: string
  region: string
  ammoniaLevel: number
  footfall: string
  lastCleaned?: string
  lastSensorUpdate?: string
  status: "clean" | "needs-cleaning"
  notes: string
}

interface ToiletCardProps {
  toilet: ToiletData
  onAcknowledgeCleaning?: (toilet: ToiletData) => void
}

export function ToiletCard({ toilet, onAcknowledgeCleaning }: ToiletCardProps) {
  const statusConfig = {
    clean: {
      color: "bg-green-100 text-green-800 border-green-200",
      label: "Clean",
    },
    "needs-cleaning": {
      color: "bg-red-100 text-red-800 border-red-200",
      label: "Needs cleaning",
    },
  }

  const config = statusConfig[toilet.status]

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{toilet.name}</h3>
            <p className="text-sm text-gray-600">Site: {toilet.site}</p>
            <p className="text-sm text-gray-600">Region: {toilet.region}</p>
          </div>
          <Badge className={`${config.color} font-medium`}>{config.label}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Sensor Data */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Gauge className="w-4 h-4 text-gray-500 mr-1" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{toilet.ammoniaLevel}</div>
            <div className="text-xs text-gray-500">ppm</div>
            <div className="text-xs text-gray-500">Ammonia</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-gray-500 mr-1" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{toilet.footfall}</div>
            <div className="text-xs text-gray-500">Footfall (24h)</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-gray-500 mr-1" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {toilet.lastCleaned ? toilet.lastCleaned.split(" ")[0] : toilet.lastSensorUpdate?.split(" ")[0]}
            </div>
            <div className="text-xs text-gray-500">
              {toilet.lastCleaned ? toilet.lastCleaned.split(" ")[1] : toilet.lastSensorUpdate?.split(" ")[1]}
            </div>
            <div className="text-xs text-gray-500">{toilet.lastCleaned ? "Last cleaned" : "Last sensor up"}</div>
          </div>
        </div>

        {/* Notes */}
        <div className="pt-2 border-t">
          <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
          <p className="text-sm text-gray-600">{toilet.notes}</p>
        </div>

        {toilet.status === "needs-cleaning" && onAcknowledgeCleaning && (
          <div className="pt-3 border-t">
            <Button
              onClick={() => onAcknowledgeCleaning(toilet)}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              size="sm"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Acknowledge Cleaning
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
