"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Wrench,
  Car,
  Download,
  BarChart3,
  PieChart,
  LineChart,
  AlertTriangle,
} from "lucide-react"

export default function ReportsAnalytics() {
  const [selectedVehicle, setSelectedVehicle] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("12months")

  const costData = {
    monthly: [
      { month: "Jan", amount: 125.5 },
      { month: "Feb", amount: 89.99 },
      { month: "Mar", amount: 245.75 },
      { month: "Apr", amount: 67.5 },
      { month: "May", amount: 189.99 },
      { month: "Jun", amount: 45.99 },
      { month: "Jul", amount: 156.25 },
      { month: "Aug", amount: 78.5 },
      { month: "Sep", amount: 234.99 },
      { month: "Oct", amount: 189.99 },
      { month: "Nov", amount: 261.48 },
      { month: "Dec", amount: 95.75 },
    ],
    categories: [
      { name: "Oil Changes", amount: 275.94, percentage: 18.5, color: "bg-blue-500" },
      { name: "Brake Service", amount: 379.98, percentage: 25.4, color: "bg-red-500" },
      { name: "Tire Service", amount: 189.99, percentage: 12.7, color: "bg-green-500" },
      { name: "Filters", amount: 125.5, percentage: 8.4, color: "bg-yellow-500" },
      { name: "Inspections", amount: 75.0, percentage: 5.0, color: "bg-purple-500" },
      { name: "Other", amount: 445.09, percentage: 30.0, color: "bg-gray-500" },
    ],
  }

  const maintenanceFrequency = [
    { type: "Oil Change", frequency: 6, avgCost: 45.99, lastService: "Nov 15, 2024" },
    { type: "Tire Rotation", frequency: 4, avgCost: 35.0, lastService: "Oct 15, 2024" },
    { type: "Brake Service", frequency: 2, avgCost: 189.99, lastService: "Oct 28, 2024" },
    { type: "Air Filter", frequency: 3, avgCost: 25.5, lastService: "Nov 10, 2024" },
    { type: "State Inspection", frequency: 1, avgCost: 15.0, lastService: "Sep 20, 2024" },
  ]

  const vehicleComparison = [
    {
      vehicle: "2020 Honda Civic",
      totalCost: 856.45,
      avgMonthly: 71.37,
      services: 12,
      efficiency: "Good",
      trend: "stable",
    },
    {
      vehicle: "2018 Toyota Camry",
      totalCost: 1234.75,
      avgMonthly: 102.9,
      services: 18,
      efficiency: "Fair",
      trend: "increasing",
    },
  ]

  const upcomingCosts = [
    { service: "Oil Change", vehicle: "Honda Civic", estimatedCost: 45.99, dueDate: "Dec 15, 2024" },
    { service: "Brake Inspection", vehicle: "Toyota Camry", estimatedCost: 75.0, dueDate: "Dec 20, 2024" },
    { service: "Tire Rotation", vehicle: "Honda Civic", estimatedCost: 35.0, dueDate: "Jan 10, 2025" },
  ]

  const totalYearCost = costData.monthly.reduce((sum, month) => sum + month.amount, 0)
  const avgMonthlyCost = totalYearCost / 12
  const highestMonth = costData.monthly.reduce((max, month) => (month.amount > max.amount ? month : max))
  const lowestMonth = costData.monthly.reduce((min, month) => (month.amount < min.amount ? month : min))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Analyze your maintenance costs and patterns</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select vehicle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vehicles</SelectItem>
                <SelectItem value="civic">2020 Honda Civic</SelectItem>
                <SelectItem value="camry">2018 Toyota Camry</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="12months">12 Months</SelectItem>
                <SelectItem value="24months">24 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Total Annual Cost</CardTitle>
              <DollarSign className="h-5 w-5 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalYearCost.toFixed(2)}</div>
              <div className="flex items-center space-x-1 text-xs text-green-100">
                <TrendingUp className="h-3 w-3 text-green-200" />
                <span>+12% from last year</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Monthly Average</CardTitle>
              <Calendar className="h-5 w-5 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${avgMonthlyCost.toFixed(2)}</div>
              <div className="flex items-center space-x-1 text-xs text-blue-100">
                <TrendingDown className="h-3 w-3 text-red-500" />
                <span>-5% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Services Completed</CardTitle>
              <Wrench className="h-5 w-5 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">30</div>
              <p className="text-xs text-purple-100">Across all vehicles</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Cost per Mile</CardTitle>
              <Car className="h-5 w-5 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$0.08</div>
              <p className="text-xs text-orange-100">Average maintenance cost</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="costs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
            <TabsTrigger value="frequency">Service Frequency</TabsTrigger>
            <TabsTrigger value="comparison">Vehicle Comparison</TabsTrigger>
            <TabsTrigger value="forecast">Cost Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="costs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Cost Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="h-5 w-5" />
                    <span>Monthly Cost Trend</span>
                  </CardTitle>
                  <CardDescription>Maintenance costs over the past 12 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costData.monthly.map((month, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium w-12">{month.month}</span>
                        <div className="flex-1 mx-4">
                          <Progress
                            value={(month.amount / Math.max(...costData.monthly.map((m) => m.amount))) * 100}
                            className="h-2"
                          />
                        </div>
                        <span className="text-sm font-medium w-16 text-right">${month.amount}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>
                        Highest: {highestMonth.month} (${highestMonth.amount})
                      </span>
                      <span>
                        Lowest: {lowestMonth.month} (${lowestMonth.amount})
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cost by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5" />
                    <span>Cost by Category</span>
                  </CardTitle>
                  <CardDescription>Breakdown of maintenance expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costData.categories.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${category.color}`} />
                            <span className="text-sm font-medium">{category.name}</span>
                          </div>
                          <span className="text-sm font-medium">${category.amount}</span>
                        </div>
                        <Progress value={category.percentage} className="h-2" />
                        <div className="text-xs text-gray-600 text-right">{category.percentage}% of total</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="frequency" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Service Frequency Analysis</span>
                </CardTitle>
                <CardDescription>How often different services are performed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceFrequency.map((service, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{service.type}</h3>
                        <Badge variant="outline">{service.frequency}x this year</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Average Cost</p>
                          <p className="font-medium">${service.avgCost}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Last Service</p>
                          <p className="font-medium">{service.lastService}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Annual Total</p>
                          <p className="font-medium">${(service.avgCost * service.frequency).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Cost Comparison</CardTitle>
                <CardDescription>Compare maintenance costs across your vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vehicleComparison.map((vehicle, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">{vehicle.vehicle}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant={vehicle.efficiency === "Good" ? "default" : "secondary"}>
                            {vehicle.efficiency}
                          </Badge>
                          {vehicle.trend === "increasing" ? (
                            <TrendingUp className="h-4 w-4 text-red-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Cost</p>
                          <p className="text-xl font-bold text-green-600">${vehicle.totalCost}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Monthly Average</p>
                          <p className="text-xl font-bold">${vehicle.avgMonthly}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Services</p>
                          <p className="text-xl font-bold">{vehicle.services}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Cost/Service</p>
                          <p className="text-xl font-bold">${(vehicle.totalCost / vehicle.services).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <span>Upcoming Costs</span>
                  </CardTitle>
                  <CardDescription>Estimated costs for scheduled maintenance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingCosts.map((cost, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{cost.service}</p>
                          <p className="text-sm text-gray-600">{cost.vehicle}</p>
                          <p className="text-sm text-gray-600">Due: {cost.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">${cost.estimatedCost}</p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total Estimated</span>
                        <span className="text-green-600">
                          ${upcomingCosts.reduce((sum, cost) => sum + cost.estimatedCost, 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Recommendations</CardTitle>
                  <CardDescription>Suggested monthly maintenance budget</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Recommended Monthly Budget</p>
                    <p className="text-3xl font-bold text-blue-600">${(avgMonthlyCost * 1.2).toFixed(2)}</p>
                    <p className="text-sm text-gray-600">20% buffer included</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Current Average</span>
                      <span className="font-medium">${avgMonthlyCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Recommended Buffer</span>
                      <span className="font-medium">${(avgMonthlyCost * 0.2).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Total Budget</span>
                      <span className="font-bold">${(avgMonthlyCost * 1.2).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      💡 <strong>Tip:</strong> Setting aside this amount monthly will help you handle unexpected repairs
                      and regular maintenance without budget stress.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
