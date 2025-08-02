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
import { Car, Plus, Edit, Wrench, DollarSign, FileText, AlertTriangle, CheckCircle } from "lucide-react"

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      make: "Honda",
      model: "Civic",
      year: 2020,
      vin: "1HGBH41JXMN109186",
      licensePlate: "ABC-1234",
      color: "Silver",
      mileage: 45230,
      purchaseDate: "2020-03-15",
      status: "good",
      nextService: "Oil Change - Due in 2,270 miles",
      totalMaintenanceCost: 1250.75,
      lastService: "Nov 15, 2024",
    },
    {
      id: 2,
      make: "Toyota",
      model: "Camry",
      year: 2018,
      vin: "4T1BF1FK5GU260429",
      licensePlate: "XYZ-5678",
      color: "Blue",
      mileage: 67890,
      purchaseDate: "2018-07-22",
      status: "attention",
      nextService: "Brake Inspection - Overdue by 890 miles",
      totalMaintenanceCost: 2150.3,
      lastService: "Oct 28, 2024",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const handleAddVehicle = () => {
    // Add vehicle logic here
    setIsAddDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Vehicle Management</h1>
            <p className="text-gray-600">Manage your vehicle fleet and information</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogDescription>Enter your vehicle information to start tracking maintenance</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select make" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="toyota">Toyota</SelectItem>
                      <SelectItem value="ford">Ford</SelectItem>
                      <SelectItem value="chevrolet">Chevrolet</SelectItem>
                      <SelectItem value="nissan">Nissan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" placeholder="e.g., Civic" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" type="number" placeholder="2020" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" placeholder="e.g., Silver" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="vin">VIN Number</Label>
                  <Input id="vin" placeholder="17-character VIN" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input id="licensePlate" placeholder="ABC-1234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mileage">Current Mileage</Label>
                  <Input id="mileage" type="number" placeholder="45000" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input id="purchaseDate" type="date" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Any additional information about this vehicle" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddVehicle}>Add Vehicle</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="p-6">
        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                      <Car className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </CardTitle>
                      <CardDescription>
                        {vehicle.color} • {vehicle.licensePlate}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={vehicle.status === "good" ? "default" : "destructive"}>
                      {vehicle.status === "good" ? "Good" : "Needs Attention"}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                    <TabsTrigger value="costs">Costs</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">VIN</p>
                        <p className="font-medium">{vehicle.vin}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Mileage</p>
                        <p className="font-medium">{vehicle.mileage.toLocaleString()} miles</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Purchase Date</p>
                        <p className="font-medium">{new Date(vehicle.purchaseDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Last Service</p>
                        <p className="font-medium">{vehicle.lastService}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        {vehicle.status === "good" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        )}
                        <p className="text-sm font-medium">Next Service</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{vehicle.nextService}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="maintenance" className="space-y-3 mt-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Recent Services</h4>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Log Service
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-2">
                          <Wrench className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">Oil Change</p>
                            <p className="text-xs text-gray-600">Nov 15, 2024 • 45,000 miles</p>
                          </div>
                        </div>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-2">
                          <Wrench className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">Brake Pads</p>
                            <p className="text-xs text-gray-600">Oct 28, 2024 • 43,500 miles</p>
                          </div>
                        </div>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="costs" className="space-y-3 mt-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">
                        ${vehicle.totalMaintenanceCost.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Total Maintenance Cost</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>This Year</span>
                        <span className="font-medium">$450.75</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last 30 Days</span>
                        <span className="font-medium">$45.99</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Average per Month</span>
                        <span className="font-medium">$87.50</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      View Cost Report
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {vehicles.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No vehicles added yet</h3>
              <p className="text-gray-600 mb-4">Add your first vehicle to start tracking maintenance and costs</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Vehicle
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
