"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Calendar,
  DollarSign,
  Wrench,
  MapPin,
  FileText,
  Star,
  Clock,
} from "lucide-react"

export default function ServiceHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [selectedRecord, setSelectedRecord] = useState(null)

  const serviceHistory = [
    {
      id: 1,
      type: "Oil Change",
      vehicle: "2020 Honda Civic",
      date: "2024-11-15",
      mileage: 45000,
      cost: 45.99,
      provider: "Jiffy Lube",
      providerRating: 4.2,
      status: "completed",
      nextDue: "2024-02-15",
      nextMileage: 48000,
      parts: ["5W-30 Synthetic Oil", "Oil Filter"],
      laborCost: 25.0,
      partsCost: 20.99,
      notes: "Used full synthetic oil. Engine running smoothly. Next change recommended in 3,000 miles or 3 months.",
      warranty: "90 days or 3,000 miles",
      documents: ["receipt.pdf", "before_photo.jpg"],
    },
    {
      id: 2,
      type: "Brake Pads Replacement",
      vehicle: "2020 Honda Civic",
      date: "2024-10-28",
      mileage: 43500,
      cost: 189.99,
      provider: "Honda Dealership",
      providerRating: 4.8,
      status: "completed",
      nextDue: "2025-10-28",
      nextMileage: 63500,
      parts: ["Front Brake Pads", "Brake Fluid"],
      laborCost: 120.0,
      partsCost: 69.99,
      notes: "Replaced front brake pads due to wear. Rear pads still have 40% life remaining. Brake fluid topped off.",
      warranty: "12 months or 12,000 miles",
      documents: ["receipt.pdf", "brake_inspection.pdf"],
    },
    {
      id: 3,
      type: "Air Filter Replacement",
      vehicle: "2018 Toyota Camry",
      date: "2024-11-10",
      mileage: 67500,
      cost: 25.5,
      provider: "Mike's Auto Shop",
      providerRating: 4.6,
      status: "completed",
      nextDue: "2025-05-10",
      nextMileage: 82500,
      parts: ["Engine Air Filter"],
      laborCost: 15.0,
      partsCost: 10.5,
      notes:
        "Air filter was very dirty and restricting airflow. Replacement should improve fuel efficiency and engine performance.",
      warranty: "6 months or 6,000 miles",
      documents: ["receipt.pdf"],
    },
    {
      id: 4,
      type: "Tire Rotation",
      vehicle: "2018 Toyota Camry",
      date: "2024-10-15",
      mileage: 66800,
      cost: 35.0,
      provider: "Discount Tire",
      providerRating: 4.4,
      status: "completed",
      nextDue: "2025-04-15",
      nextMileage: 76800,
      parts: [],
      laborCost: 35.0,
      partsCost: 0,
      notes: "Rotated tires to ensure even wear. All tires in good condition with approximately 60% tread remaining.",
      warranty: "N/A",
      documents: ["receipt.pdf", "tire_inspection.jpg"],
    },
    {
      id: 5,
      type: "State Inspection",
      vehicle: "2020 Honda Civic",
      date: "2024-09-20",
      mileage: 42100,
      cost: 15.0,
      provider: "Quick Lube Plus",
      providerRating: 4.1,
      status: "completed",
      nextDue: "2025-09-20",
      nextMileage: null,
      parts: [],
      laborCost: 15.0,
      partsCost: 0,
      notes: "Passed state safety and emissions inspection. All systems functioning properly.",
      warranty: "N/A",
      documents: ["inspection_certificate.pdf"],
    },
  ]

  const filteredHistory = serviceHistory.filter((record) => {
    const matchesSearch =
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesVehicle = selectedVehicle === "all" || record.vehicle.includes(selectedVehicle)
    const matchesType = selectedType === "all" || record.type.toLowerCase().includes(selectedType.toLowerCase())

    return matchesSearch && matchesVehicle && matchesType
  })

  const totalCost = filteredHistory.reduce((sum, record) => sum + record.cost, 0)
  const averageCost = filteredHistory.length > 0 ? totalCost / filteredHistory.length : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Service History</h1>
            <p className="text-gray-600">View and manage your complete maintenance records</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by service type, vehicle, or provider..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle</Label>
                <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                  <SelectTrigger>
                    <SelectValue placeholder="All vehicles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vehicles</SelectItem>
                    <SelectItem value="Honda Civic">2020 Honda Civic</SelectItem>
                    <SelectItem value="Toyota Camry">2018 Toyota Camry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Service Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="oil">Oil Change</SelectItem>
                    <SelectItem value="brake">Brake Service</SelectItem>
                    <SelectItem value="tire">Tire Service</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                    <SelectItem value="filter">Filter Replacement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateRange">Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="30">Last 30 Days</SelectItem>
                    <SelectItem value="90">Last 3 Months</SelectItem>
                    <SelectItem value="365">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Wrench className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-100">Total Records</p>
                  <p className="text-2xl font-bold">{filteredHistory.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-100">Total Cost</p>
                  <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-100">Average Cost</p>
                  <p className="text-2xl font-bold">${averageCost.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-orange-100">Avg Rating</p>
                  <p className="text-2xl font-bold">4.4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Service Records</CardTitle>
            <CardDescription>{filteredHistory.length} records found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredHistory.map((record) => (
                <div key={record.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Wrench className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{record.type}</h3>
                          <Badge variant="outline">{record.status}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-600">Vehicle</p>
                            <p className="font-medium">{record.vehicle}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Date</p>
                            <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Mileage</p>
                            <p className="font-medium">{record.mileage?.toLocaleString() || "N/A"} miles</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Cost</p>
                            <p className="font-medium text-green-600">${record.cost}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{record.provider}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{record.providerRating}</span>
                          </div>
                          {record.documents.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <FileText className="h-4 w-4" />
                              <span>
                                {record.documents.length} document{record.documents.length > 1 ? "s" : ""}
                              </span>
                            </div>
                          )}
                        </div>

                        {record.nextDue && (
                          <div className="flex items-center space-x-1 text-sm">
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span className="text-gray-600">
                              Next due: {new Date(record.nextDue).toLocaleDateString()}
                              {record.nextMileage && ` or ${record.nextMileage.toLocaleString()} miles`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>
                              {record.type} - {record.vehicle}
                            </DialogTitle>
                            <DialogDescription>
                              Service performed on {new Date(record.date).toLocaleDateString()}
                            </DialogDescription>
                          </DialogHeader>

                          <Tabs defaultValue="details" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="details">Details</TabsTrigger>
                              <TabsTrigger value="costs">Costs</TabsTrigger>
                              <TabsTrigger value="documents">Documents</TabsTrigger>
                            </TabsList>

                            <TabsContent value="details" className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Service Provider</Label>
                                  <p className="font-medium">{record.provider}</p>
                                </div>
                                <div>
                                  <Label>Provider Rating</Label>
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">{record.providerRating}</span>
                                  </div>
                                </div>
                                <div>
                                  <Label>Mileage at Service</Label>
                                  <p className="font-medium">{record.mileage?.toLocaleString() || "N/A"} miles</p>
                                </div>
                                <div>
                                  <Label>Warranty</Label>
                                  <p className="font-medium">{record.warranty}</p>
                                </div>
                              </div>

                              {record.parts.length > 0 && (
                                <div>
                                  <Label>Parts Used</Label>
                                  <ul className="list-disc list-inside mt-1 space-y-1">
                                    {record.parts.map((part, index) => (
                                      <li key={index} className="text-sm">
                                        {part}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <div>
                                <Label>Service Notes</Label>
                                <p className="text-sm text-gray-600 mt-1">{record.notes}</p>
                              </div>

                              {record.nextDue && (
                                <div className="p-3 bg-orange-50 rounded-lg">
                                  <Label>Next Service Due</Label>
                                  <p className="text-sm mt-1">
                                    {new Date(record.nextDue).toLocaleDateString()}
                                    {record.nextMileage && ` or ${record.nextMileage.toLocaleString()} miles`}
                                  </p>
                                </div>
                              )}
                            </TabsContent>

                            <TabsContent value="costs" className="space-y-4 mt-4">
                              <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                  <span className="font-medium">Total Cost</span>
                                  <span className="text-lg font-bold text-green-600">${record.cost}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex justify-between">
                                    <span>Labor Cost</span>
                                    <span className="font-medium">${record.laborCost}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Parts Cost</span>
                                    <span className="font-medium">${record.partsCost}</span>
                                  </div>
                                </div>

                                {record.parts.length > 0 && (
                                  <div>
                                    <Label>Parts Breakdown</Label>
                                    <div className="space-y-2 mt-2">
                                      {record.parts.map((part, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                          <span>{part}</span>
                                          <span>Included in parts cost</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </TabsContent>

                            <TabsContent value="documents" className="space-y-4 mt-4">
                              <div>
                                <Label>Attached Documents</Label>
                                <div className="space-y-2 mt-2">
                                  {record.documents.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                                      <div className="flex items-center space-x-2">
                                        <FileText className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">{doc}</span>
                                      </div>
                                      <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-1" />
                                        Download
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>

                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredHistory.length === 0 && (
              <div className="text-center py-12">
                <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No records found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or add some maintenance records</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
