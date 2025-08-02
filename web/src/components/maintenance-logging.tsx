"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Wrench,
  Calendar,
  DollarSign,
  FileText,
  Upload,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

export default function MaintenanceLogging() {
  const [isLogDialogOpen, setIsLogDialogOpen] = useState(false)
  const [selectedMaintenanceType, setSelectedMaintenanceType] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState([])

  const maintenanceTypes = [
    { id: "oil-change", name: "Oil Change", category: "Engine" },
    { id: "tire-rotation", name: "Tire Rotation", category: "Tires" },
    { id: "brake-pads", name: "Brake Pads", category: "Brakes" },
    { id: "air-filter", name: "Air Filter", category: "Engine" },
    { id: "transmission", name: "Transmission Service", category: "Transmission" },
    { id: "coolant", name: "Coolant Flush", category: "Engine" },
    { id: "battery", name: "Battery Replacement", category: "Electrical" },
    { id: "inspection", name: "State Inspection", category: "Legal" },
  ]

  const serviceProviders = [
    { id: "jiffy-lube", name: "Jiffy Lube", rating: 4.2, location: "123 Main St" },
    { id: "valvoline", name: "Valvoline Instant Oil Change", rating: 4.5, location: "456 Oak Ave" },
    { id: "honda-dealer", name: "Honda Dealership", rating: 4.8, location: "789 Auto Blvd" },
    { id: "independent", name: "Mike's Auto Shop", rating: 4.6, location: "321 Repair Rd" },
  ]

  const recentMaintenance = [
    {
      id: 1,
      type: "Oil Change",
      vehicle: "2020 Honda Civic",
      date: "2024-11-15",
      mileage: 45000,
      cost: 45.99,
      provider: "Jiffy Lube",
      status: "completed",
      nextDue: "2024-02-15",
      nextMileage: 48000,
      parts: ["5W-30 Oil", "Oil Filter"],
      notes: "Used synthetic oil. Next change in 3,000 miles.",
    },
    {
      id: 2,
      type: "Brake Pads",
      vehicle: "2020 Honda Civic",
      date: "2024-10-28",
      mileage: 43500,
      cost: 189.99,
      provider: "Honda Dealership",
      status: "completed",
      nextDue: "2025-10-28",
      nextMileage: 63500,
      parts: ["Front Brake Pads", "Brake Fluid"],
      notes: "Replaced front brake pads. Rear pads still have 40% life remaining.",
    },
    {
      id: 3,
      type: "Air Filter",
      vehicle: "2018 Toyota Camry",
      date: "2024-11-10",
      mileage: 67500,
      cost: 25.5,
      provider: "Mike's Auto Shop",
      status: "completed",
      nextDue: "2025-05-10",
      nextMileage: 82500,
      parts: ["Engine Air Filter"],
      notes: "Filter was very dirty. Improved engine performance expected.",
    },
  ]

  const handleLogMaintenance = () => {
    // Log maintenance logic here
    setIsLogDialogOpen(false)
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setUploadedFiles([...uploadedFiles, ...files])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Maintenance Logging</h1>
            <p className="text-gray-600">Record and track all vehicle maintenance activities</p>
          </div>
          <Dialog open={isLogDialogOpen} onOpenChange={setIsLogDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Log Maintenance
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Log New Maintenance</DialogTitle>
                <DialogDescription>Record details of completed or scheduled maintenance</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="parts">Parts & Cost</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle">Vehicle</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="civic">2020 Honda Civic</SelectItem>
                          <SelectItem value="camry">2018 Toyota Camry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maintenanceType">Maintenance Type</Label>
                      <Select value={selectedMaintenanceType} onValueChange={setSelectedMaintenanceType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select maintenance type" />
                        </SelectTrigger>
                        <SelectContent>
                          {maintenanceTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name} ({type.category})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceDate">Service Date</Label>
                      <Input id="serviceDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mileage">Mileage at Service</Label>
                      <Input id="mileage" type="number" placeholder="45000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provider">Service Provider</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select or add provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceProviders.map((provider) => (
                            <SelectItem key={provider.id} value={provider.id}>
                              {provider.name} - {provider.location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nextDueDate">Next Due Date</Label>
                      <Input id="nextDueDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nextDueMileage">Next Due Mileage</Label>
                      <Input id="nextDueMileage" type="number" placeholder="48000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Service Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Describe the work performed, any issues found, recommendations, etc."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="warranty">Warranty Information</Label>
                    <Input id="warranty" placeholder="e.g., 12 months or 12,000 miles" />
                  </div>
                </TabsContent>

                <TabsContent value="parts" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="totalCost">Total Cost</Label>
                      <Input id="totalCost" type="number" step="0.01" placeholder="45.99" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="laborCost">Labor Cost</Label>
                      <Input id="laborCost" type="number" step="0.01" placeholder="25.00" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Parts Used</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Input placeholder="Part name" className="flex-1" />
                        <Input placeholder="Cost" type="number" step="0.01" className="w-24" />
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input placeholder="Part name" className="flex-1" />
                        <Input placeholder="Cost" type="number" step="0.01" className="w-24" />
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="taxIncluded" />
                    <Label htmlFor="taxIncluded">Tax included in total cost</Label>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div>
                      <Label>Upload Documents</Label>
                      <p className="text-sm text-gray-600 mb-2">Upload receipts, photos, or other related documents</p>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                        <input
                          type="file"
                          multiple
                          accept="image/*,.pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <Button variant="outline" onClick={() => document.getElementById("file-upload").click()}>
                          Choose Files
                        </Button>
                      </div>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label>Uploaded Files</Label>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setIsLogDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleLogMaintenance}>Log Maintenance</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl mx-auto mb-4 w-fit shadow-lg">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Oil Change</h3>
              <p className="text-sm text-gray-600">Quick log</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-green-50 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl mx-auto mb-4 w-fit shadow-lg">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Inspection</h3>
              <p className="text-sm text-gray-600">Schedule or log</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-purple-50 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl mx-auto mb-4 w-fit shadow-lg">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Repair</h3>
              <p className="text-sm text-gray-600">Log repair work</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-orange-50 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl mx-auto mb-4 w-fit shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Custom</h3>
              <p className="text-sm text-gray-600">Other maintenance</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Maintenance */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Maintenance Records</CardTitle>
            <CardDescription>Your latest maintenance activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMaintenance.map((record) => (
                <div key={record.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Wrench className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{record.type}</h3>
                          <Badge variant="outline">{record.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{record.vehicle}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{new Date(record.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{record.mileage.toLocaleString()} miles</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span>${record.cost}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{record.provider}</span>
                          </div>
                        </div>

                        {record.notes && <p className="text-sm text-gray-600 mt-2 italic">"{record.notes}"</p>}

                        <div className="flex items-center space-x-4 mt-3 text-sm">
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Next due: {new Date(record.nextDue).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            <span>or {record.nextMileage.toLocaleString()} miles</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
