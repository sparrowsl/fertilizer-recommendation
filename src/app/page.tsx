"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🌱</span>
              <h1 className="text-xl font-bold text-gray-900">AgriSmart</h1>
            </div>
            <Link href="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700">
                Get Started →
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI-Powered <span className="text-green-600">Crop & Fertilizer</span> Recommendations
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Transform your farming with personalized, data-driven insights.
              Increase yields, reduce costs, and make informed agricultural decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-4 bg-green-600 hover:bg-green-700">
                  🚀 Start Analysis
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                📖 Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-4 bg-white/60">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Challenge Farmers Face
            </h2>
            <p className="text-xl text-gray-600">
              Traditional farming methods often lead to suboptimal results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🌾</div>
              <h3 className="text-xl font-semibold mb-2">Poor Crop Selection</h3>
              <p className="text-gray-600">
                Growing crops unsuitable for soil conditions leads to low yields and wasted resources
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🧪</div>
              <h3 className="text-xl font-semibold mb-2">Blind Fertilizer Use</h3>
              <p className="text-gray-600">
                Applying fertilizers without soil analysis results in nutrient imbalances and increased costs
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">📉</div>
              <h3 className="text-xl font-semibold mb-2">Reduced Profitability</h3>
              <p className="text-gray-600">
                Inefficient farming practices directly impact income and sustainability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How AgriSmart Helps
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive AI-powered analysis for smarter farming decisions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <span className="text-2xl">📸</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI Image Analysis</h3>
                    <p className="text-gray-600">
                      Upload soil test reports and let our AI extract data automatically.
                      No manual data entry required.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Crop Recommendations</h3>
                    <p className="text-gray-600">
                      Get personalized crop suggestions based on soil conditions,
                      climate data, and profitability potential.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <span className="text-2xl">🧪</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Custom Fertilizer Mix</h3>
                    <p className="text-gray-600">
                      Receive precise NPK ratios and application instructions
                      tailored to your soil's specific needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Budget Planning</h3>
                    <p className="text-gray-600">
                      Get detailed cost estimates and profit projections
                      to make informed investment decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-4">Complete Analysis</h3>
                <p className="text-gray-700 mb-6">
                  Get comprehensive insights including soil health scores,
                  nutrient deficiencies, crop suitability rankings, and more.
                </p>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-1">85/100</div>
                  <div className="text-sm text-gray-600">Sample Soil Health Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-16 px-4 bg-white/60">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Who We Serve
            </h2>
            <p className="text-xl text-gray-600">
              Supporting the entire agricultural ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-5xl mb-4">👨‍🌾</div>
                <h3 className="text-xl font-semibold mb-2">Smallholder Farmers</h3>
                <p className="text-gray-600">
                  Get direct, actionable recommendations to increase yields and reduce input costs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-5xl mb-4">🔬</div>
                <h3 className="text-xl font-semibold mb-2">Agronomists & NGOs</h3>
                <p className="text-gray-600">
                  Assist farmers with data-driven insights and evidence-based recommendations
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-5xl mb-4">🏛️</div>
                <h3 className="text-xl font-semibold mb-2">Government & Policy</h3>
                <p className="text-gray-600">
                  Access aggregated insights for agricultural planning and policy making
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to better farming decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Input Soil Data</h3>
              <p className="text-gray-600">
                Upload soil test reports or enter data manually.
                Our AI will extract information from images automatically.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our advanced algorithms analyze your soil composition,
                climate data, and market conditions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive detailed crop and fertilizer recommendations
                with implementation guidance and cost estimates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers who are already using AI to increase their yields and profits
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 py-4 bg-white text-green-600 hover:bg-gray-100">
              🚀 Start Your Free Analysis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🌱</span>
                <span className="text-xl font-bold text-white">AgriSmart</span>
              </div>
              <p className="text-sm">
                AI-powered agricultural insights for sustainable and profitable farming.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/dashboard" className="hover:text-green-400">Dashboard</Link></li>
                <li><Link href="/dashboard" className="hover:text-green-400">Soil Analysis</Link></li>
                <li><Link href="/dashboard" className="hover:text-green-400">Crop Recommendations</Link></li>
                <li><Link href="/dashboard" className="hover:text-green-400">Fertilizer Calculator</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/docs" className="hover:text-green-400">Documentation</a></li>
                <li><a href="/blog" className="hover:text-green-400">Blog</a></li>
                <li><a href="/support" className="hover:text-green-400">Support</a></li>
                <li><a href="/api" className="hover:text-green-400">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:help@agrismart.com" className="hover:text-green-400">help@agrismart.com</a></li>
                <li><a href="tel:+15551234567" className="hover:text-green-400">+1 (555) 123-4567</a></li>
                <li><a href="https://twitter.com/agrismart" className="hover:text-green-400">Twitter</a></li>
                <li><a href="https://linkedin.com/company/agrismart" className="hover:text-green-400">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 AgriSmart. All rights reserved. Helping farmers grow sustainably.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
