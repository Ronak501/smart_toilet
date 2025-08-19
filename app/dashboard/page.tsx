"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Search, LogOut } from "lucide-react"
import { ToiletCard } from "@/components/toilet-card"
import { NotificationItem } from "@/components/notification-item"
import { AcknowledgeCleaningModal } from "@/components/acknowledge-cleaning-modal"

const mockToilets = [
  {
    id: "toilet-3",
    name: "Toilet #3 – Railway Station",
    site: "City Terminal",
    region: "Downtown",
    ammoniaLevel: 4.5,
    footfall: "🚶‍♂️",
    lastCleaned: "08:32 1 hr",
    status: "clean" as const,
    notes: "No issues",
  },
  {
    id: "toilet-5",
    name: "Toilet #5 – Shopping Mall",
    site: "City Terminal",
    region: "Downtown",
    ammoniaLevel: 4.5,
    footfall: "321-α",
    lastSensorUpdate: "08:37 5 hr",
    status: "needs-cleaning" as const,
    notes: "No issues",
  },
  {
    id: "toilet-2",
    name: "Toilet #2 – City Park",
    site: "Central Park",
    region: "Uptown",
    ammoniaLevel: 3.2,
    footfall: "156",
    lastCleaned: "06:15 3 hr",
    status: "needs-cleaning" as const,
    notes: "High usage area",
  },
  {
    id: "toilet-7",
    name: "Toilet #7 – Bus Terminal",
    site: "Transport Hub",
    region: "Downtown",
    ammoniaLevel: 2.8,
    footfall: "89",
    lastCleaned: "09:45 30 min",
    status: "clean" as const,
    notes: "Recently serviced",
  },
]

const mockNotifications = [
  {
    id: "notif-1",
    message: "Toilet #2 – City Park not cleaned in last 3 hours",
    timestamp: "5 mins ago",
    type: "warning" as const,
  },
  {
    id: "notif-2",
    message: "Toilet #5 – Shopping Mall needs cleaning",
    timestamp: "7 mins ago",
    type: "alert" as const,
  },
  {
    id: "notif-3",
    message: "Toilet #3 – Railway Station not cleaned in last 3 hours",
    timestamp: "12 mins ago",
    type: "warning" as const,
  },
  {
    id: "notif-4",
    message: "Toilet #1 – Main Plaza sensor maintenance required",
    timestamp: "25 mins ago",
    type: "info" as const,
  },
  {
    id: "notif-5",
    message: "Toilet #6 – Airport Terminal high ammonia levels detected",
    timestamp: "1 hour ago",
    type: "alert" as const,
  },
]

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [onlyNeedsCleaning, setOnlyNeedsCleaning] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedToilet, setSelectedToilet] = useState<(typeof mockToilets)[0] | null>(null)
  const [toilets, setToilets] = useState(mockToilets)

  const filteredToilets = useMemo(() => {
    return toilets.filter((toilet) => {
      const matchesSearch =
        toilet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        toilet.site.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRegion =
        !selectedRegion || selectedRegion === "all" || toilet.region.toLowerCase() === selectedRegion.toLowerCase()

      const matchesStatus = !onlyNeedsCleaning || toilet.status === "needs-cleaning"

      return matchesSearch && matchesRegion && matchesStatus
    })
  }, [searchQuery, selectedRegion, onlyNeedsCleaning, toilets])

  const handleAcknowledgeCleaning = (toilet: (typeof mockToilets)[0]) => {
    setSelectedToilet(toilet)
    setIsModalOpen(true)
  }

  const handleConfirmCleaning = () => {
    if (selectedToilet) {
      setToilets((prev) =>
        prev.map((toilet) =>
          toilet.id === selectedToilet.id ? { ...toilet, status: "clean" as const, lastCleaned: "Just now" } : toilet,
        ),
      )
      console.log(`Cleaning acknowledged for ${selectedToilet.name}`)
    }
  }

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Swachh Sense</h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Ronak</span>
              <div className="w-px h-4 bg-gray-300"></div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search toilet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Region Filter */}
            <div className="w-full lg:w-48">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="uptown">Uptown</SelectItem>
                  <SelectItem value="suburbs">Suburbs</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Only Needs Cleaning Toggle */}
            <div className="flex items-center space-x-2">
              <Switch id="needs-cleaning" checked={onlyNeedsCleaning} onCheckedChange={setOnlyNeedsCleaning} />
              <Label htmlFor="needs-cleaning" className="text-sm font-medium whitespace-nowrap">
                Only needs cleaning
              </Label>
            </div>
          </div>
        </div>

        {/* Content Grid - This will be populated with toilet cards and notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area - Toilet Cards will go here */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredToilets.map((toilet) => (
                <ToiletCard key={toilet.id} toilet={toilet} onAcknowledgeCleaning={handleAcknowledgeCleaning} />
              ))}
              {filteredToilets.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <p className="text-gray-500">No toilets match your current filters.</p>
                </div>
              )}
            </div>
          </div>

          {/* Notifications Panel - Will be populated next */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {mockNotifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            {mockNotifications.filter((n) => n.type === "alert").length} active alerts
          </p>
        </div>
      </footer>

      {/* Acknowledgment Modal */}
      <AcknowledgeCleaningModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmCleaning}
        toiletName={selectedToilet?.name || ""}
      />
    </div>
  )
}
