import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Zap, Shield, Code, ArrowRight, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="h-4 w-4" />
              <span>Simple Web Hosting Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
              Host Your Websites with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Sriox</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Create beautiful websites with custom subdomains, automatic SSL certificates, and lightning-fast hosting.
              Get started in seconds, not hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              <Globe className="mr-2 h-5 w-5" />
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-slate-200 dark:border-slate-700 px-8 py-3 text-lg">
              View Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-shadow">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-slate-600 dark:text-slate-400">
                Deploy your websites instantly with our optimized infrastructure. Your sites load in milliseconds, not
                seconds.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-shadow">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Secure by Default</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-slate-600 dark:text-slate-400">
                Automatic SSL certificates, DDoS protection, and secure file management. Your websites are protected
                from day one.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-shadow">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Easy Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-slate-600 dark:text-slate-400">
                Upload, edit, and manage your files with our intuitive interface. No command line required.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">Ready to Get Started?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Join thousands of developers who trust Sriox for their web hosting needs.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              <a href="/register" className="flex items-center">
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-200 dark:border-slate-700 px-8 py-3">
              <a href="/login">Sign In</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
