"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Car, DollarSign, AlertTriangle, CheckCircle, Plus, Bell, TrendingUp } from "lucide-react"

export default function Dashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState("2020 Honda Civic")

  const vehicles = [
    { id: 1, name: "2020 Honda Civic", vin: "1HGBH41JXMN109186", mileage: 45230, status: "good" },
    { id: 2, name: "2018 Toyota Camry", vin: "4T1BF1FK5GU260429", mileage: 67890, status: "attention" },
  ]

  const upcomingMaintenance = [
    { task: "Oil Change", vehicle: "Honda Civic", dueDate: "Dec 15, 2024", dueMileage: 47500, priority: "high" },
    { task: "Tire Rotation", vehicle: "Toyota Camry", dueDate: "Dec 20, 2024", dueMileage: 70000, priority: "medium" },
    { task: "Brake Inspection", vehicle: "Honda Civic", dueDate: "Jan 10, 2025", dueMileage: 50000, priority: "low" },
  ]

  const recentMaintenance = [
    { task: "Oil Change", vehicle: "Honda Civic", date: "Nov 15, 2024", cost: 45.99, status: "completed" },
    { task: "Air Filter", vehicle: "Toyota Camry", date: "Nov 10, 2024", cost: 25.5, status: "completed" },
    { task: "Brake Pads", vehicle: "Honda Civic", date: "Oct 28, 2024", cost: 189.99, status: "completed" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Car Maintenance Tracker
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" className="text-blue-600">
                Dashboard
              </Button>
              <Button variant="ghost">Vehicles</Button>
              <Button variant="ghost">Maintenance</Button>
              <Button variant="ghost">Reports</Button>
              <Button variant="ghost">Providers</Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />3
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Vehicles</CardTitle>
              <Car className="h-5 w-5 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <p className="text-xs text-blue-100">Active vehicles</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Pending Tasks</CardTitle>
              <AlertTriangle className="h-5 w-5 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-xs text-orange-100">Due soon</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">This Month</CardTitle>
              <DollarSign className="h-5 w-5 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$261.48</div>
              <p className="text-xs text-green-100">Maintenance costs</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-100">Completed</CardTitle>
              <CheckCircle className="h-5 w-5 text-emerald-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-emerald-100">This year</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vehicle Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vehicle Overview</CardTitle>
                  <CardDescription>Current status of your vehicles</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vehicle
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Car className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{vehicle.name}</h3>
                      <p className="text-sm text-gray-600">VIN: {vehicle.vin}</p>
                      <p className="text-sm text-gray-600">{vehicle.mileage.toLocaleString()} miles</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={vehicle.status === "good" ? "default" : "destructive"}>
                      {vehicle.status === "good" ? "Good" : "Needs Attention"}
                    </Badge>
                    <div className="mt-2">
                      <Progress value={vehicle.status === "good" ? 85 : 45} className="w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Maintenance */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Maintenance</CardTitle>
              <CardDescription>Tasks due soon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingMaintenance.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.priority === "high"
                          ? "bg-red-500"
                          : item.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-sm">{item.task}</p>
                      <p className="text-xs text-gray-600">{item.vehicle}</p>
                      <p className="text-xs text-gray-600">{item.dueDate}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Schedule
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Maintenance */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Maintenance</CardTitle>
                  <CardDescription>Latest completed services</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentMaintenance.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.task}</p>
                      <p className="text-xs text-gray-600">{item.vehicle}</p>
                      <p className="text-xs text-gray-600">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">${item.cost}</p>
                    <Badge variant="outline" className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Cost Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Analysis</CardTitle>
              <CardDescription>Monthly maintenance expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">November 2024</span>
                  <span className="font-semibold">$261.48</span>
                </div>
                <Progress value={75} />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Budget: $350/month</span>
                  <span>$88.52 remaining</span>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Oil Changes</span>
                    <span>$91.98</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Brake Service</span>
                    <span>$189.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Filters</span>
                    <span>$25.50</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Detailed Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
