"use client"

import { useState } from "react"
import { AuthForm } from "@/components/auth-forms"

export default function RegisterPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (username: string, password: string) => {
    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation
      if (username.length < 3) {
        setError("Username must be at least 3 characters long")
        return
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long")
        return
      }

      // Success - redirect to login
      window.location.href = "/login"
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return <AuthForm type="register" onSubmit={handleRegister} error={error} loading={loading} />
}
