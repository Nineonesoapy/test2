"use client"

import { useState } from "react"
import { AuthForm } from "@/components/auth-forms"

export default function LoginPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (username: string, password: string) => {
    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation
      if (username === "demo" && password === "demo") {
        window.location.href = "/dashboard"
      } else {
        setError("Invalid username or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return <AuthForm type="login" onSubmit={handleLogin} error={error} loading={loading} />
}
