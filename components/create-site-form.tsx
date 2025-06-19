"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Globe, Loader2, FileText } from "lucide-react"

interface CreateSiteFormProps {
  onSubmit: (subdomain: string, file: File) => Promise<void>
  error?: string
  loading?: boolean
}

export function CreateSiteForm({ onSubmit, error, loading }: CreateSiteFormProps) {
  const [subdomain, setSubdomain] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      await onSubmit(subdomain, file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0] && files[0].name.endsWith(".html")) {
      setFile(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setFile(files[0])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">Create New Website</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Choose a subdomain and upload your HTML file
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subdomain" className="text-slate-700 dark:text-slate-300">
                Subdomain
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="subdomain"
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  className="border-slate-200 dark:border-slate-700"
                  placeholder="mysite"
                  required
                />
                <span className="text-slate-600 dark:text-slate-400 whitespace-nowrap">.sriox.com</span>
              </div>
              {subdomain && (
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Your site will be available at: <strong>{subdomain}.sriox.com</strong>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300">HTML File</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive
                    ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "border-slate-300 dark:border-slate-600"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="space-y-2">
                    <FileText className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto" />
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{file.name}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFile(null)}
                      className="border-slate-200 dark:border-slate-700"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto" />
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Drag and drop your HTML file here, or{" "}
                      <label className="text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer">
                        browse
                        <input type="file" accept=".html" onChange={handleFileChange} className="hidden" />
                      </label>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Only HTML files are supported</p>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                <AlertDescription className="text-red-800 dark:text-red-300">{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading || !subdomain || !file}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Site...
                </>
              ) : (
                <>
                  <Globe className="mr-2 h-4 w-4" />
                  Create Website
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
