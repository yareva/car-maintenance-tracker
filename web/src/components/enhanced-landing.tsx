"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wrench, Calendar, DollarSign, FileText } from "lucide-react"

export default function EnhancedLanding() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-black">Car Maintenance Tracker</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-6xl font-bold text-black">Track Your Vehicle Maintenance</h2>
                <p className="text-xl text-gray-600 mt-6">
                  Keep your car running smoothly with smart tracking and automated reminders
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center text-center space-y-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-blue-500 p-3 rounded-2xl shadow-lg">
                    <Wrench className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Service Tracking</h3>
                    <p className="text-sm text-gray-600">Log all maintenance activities</p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-green-500 p-3 rounded-2xl shadow-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Smart Reminders</h3>
                    <p className="text-sm text-gray-600">Automated scheduling</p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-purple-500 p-3 rounded-2xl shadow-lg">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Cost Analysis</h3>
                    <p className="text-sm text-gray-600">Track expenses & reports</p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-orange-500 p-3 rounded-2xl shadow-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Digital Records</h3>
                    <p className="text-sm text-gray-600">Store receipts & photos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Auth Form */}
            <div className="flex justify-center">
              <Card className="w-full max-w-md bg-white border shadow-2xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold">
                    {isLogin ? "Welcome Back" : "Start Your Journey"}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {isLogin ? "Sign in to your account" : "Join thousands of smart car owners"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={isLogin ? "login" : "register"} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                      <TabsTrigger
                        value="login"
                        onClick={() => setIsLogin(true)}
                        className="data-[state=active]:bg-black data-[state=active]:text-white"
                      >
                        Login
                      </TabsTrigger>
                      <TabsTrigger
                        value="register"
                        onClick={() => setIsLogin(false)}
                        className="data-[state=active]:bg-black data-[state=active]:text-white"
                      >
                        Register
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" className="h-12" />
                      </div>
                      <Button
                        className="w-full h-12 bg-black hover:bg-gray-800 text-white font-semibold shadow-lg"
                        size="lg"
                      >
                        Sign In
                      </Button>
                      <div className="text-center">
                        <Button variant="link" className="text-sm text-gray-600 hover:text-black">
                          Forgot your password?
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="register" className="space-y-4 mt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" className="h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" className="h-12" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="registerEmail">Email</Label>
                        <Input id="registerEmail" type="email" placeholder="your@email.com" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="registerPassword">Password</Label>
                        <Input id="registerPassword" type="password" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" className="h-12" />
                      </div>
                      <Button
                        className="w-full h-12 bg-black hover:bg-gray-800 text-white font-semibold shadow-lg"
                        size="lg"
                      >
                        Create Account
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
