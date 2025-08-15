"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === "priya@citycorp.in" && password === "password123") {
      router.push("/dashboard")
    } else {
      alert("Invalid credentials. Please use the demo credentials.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Login Panel - Left Side */}
      <div className="w-80 bg-white p-8 flex flex-col justify-center shadow-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Smart Toilet</h1>
          <h2 className="text-2xl font-bold text-gray-900">Cleanliness System</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium">
            Login
          </Button>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600 mb-1">Demo:</p>
          <p className="text-sm font-mono text-gray-800">priya@citycorp.in</p>
          <p className="text-sm font-mono text-gray-800">password123</p>
        </div>
      </div>

      {/* Main Content Area - Right Side */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <Image
                src="/images/toilet-icon.png"
                alt="Smart Toilet System"
                width={32}
                height={32}
                className="text-white"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SMART TOILET</h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">CLEANLINESS SYSTEM</h2>
          <p className="text-lg text-gray-600 max-w-md">
            Real-time monitoring and maintenance management for public washrooms
          </p>
        </div>
      </div>
    </div>
  )
}
