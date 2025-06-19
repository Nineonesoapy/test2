"use client"

import { useState } from "react"
import { CreateSiteForm } from "@/components/create-site-form"
import { SiteCreationLoading } from "@/components/loading-states"

export default function CreateSitePage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [creatingSubdomain, setCreatingSubdomain] = useState("")

  const handleCreateSite = async (subdomain: string, file: File) => {
    setLoading(true)
    setError("")
    setCreatingSubdomain(subdomain)

    try {
      // Simulate file upload and site creation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock validation
      if (subdomain.length < 3) {
        setError("Subdomain must be at least 3 characters long")
        return
      }

      if (!file.name.endsWith(".html")) {
        setError("Only HTML files are allowed")
        return
      }

      // Success - redirect to dashboard
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 3000)
    } catch (err) {
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  if (loading) {
    return <SiteCreationLoading subdomain={creatingSubdomain} />
  }

  return <CreateSiteForm onSubmit={handleCreateSite} error={error} loading={loading} />
}
