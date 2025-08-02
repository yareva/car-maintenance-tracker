"use client"

import { useState } from "react"
import Dashboard from "@/components/dashboard"
import VehicleManagement from "@/components/vehicle-management"
import MaintenanceLogging from "@/components/maintenance-logging"
import ServiceHistory from "@/components/service-history"
import ReportsAnalytics from "@/components/reports-analytics"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LayoutDashboard, Car, Wrench, History, BarChart3, Menu, X } from "lucide-react"

export default function DemoPage() {
  const [currentView, setCurrentView] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, component: Dashboard },
    { id: "vehicles", name: "Vehicles", icon: Car, component: VehicleManagement },
    { id: "maintenance", name: "Log Maintenance", icon: Wrench, component: MaintenanceLogging },
    { id: "history", name: "Service History", icon: History, component: ServiceHistory },
    { id: "reports", name: "Reports", icon: BarChart3, component: ReportsAnalytics },
  ]

  const CurrentComponent = navigation.find((nav) => nav.id === currentView)?.component || Dashboard

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-white to-gray-50 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Car Maintenance Tracker
            </span>
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentView(item.id)
                    setSidebarOpen(false)
                  }}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Button>
              )
            })}
          </div>
        </nav>

        {/* Demo Notice */}
        <div className="absolute bottom-4 left-3 right-3">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-3">
              <p className="text-xs text-center">
                🚗 <strong>Demo Mode</strong>
                <br />
                This is a demonstration of the Car Maintenance Tracker. All data is simulated.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <CurrentComponent />
        </main>
      </div>
    </div>
  )
}
