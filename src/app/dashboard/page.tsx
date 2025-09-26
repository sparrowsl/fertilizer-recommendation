"use client";

import { useState } from "react";
import SoilInputForm from "@/components/SoilInputForm";
import AnalysisResults from "@/components/AnalysisResults";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { SoilInputForm, SoilAnalysisResult, SoilData } from "@/types";

export default function DashboardPage() {
  const [currentStep, setCurrentStep] = useState<"input" | "results">("input");
  const [analysisResults, setAnalysisResults] = useState<SoilAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: SoilInputForm) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze-soil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          soilData: formData.soilData,
          farmSize: formData.farmSize,
          budget: formData.budget,
          preferredCrops: formData.preferredCrops,
          farmingExperience: formData.farmingExperience,
          irrigationAvailable: formData.irrigationAvailable,
          organicFarmingPreference: formData.organicFarmingPreference,
        }),
      });

      const result = await response.json();

      if (result.success && result.data) {
        setAnalysisResults(result.data);
        setCurrentStep("results");
      } else {
        setError(result.message || "Failed to analyze soil data");
      }
    } catch (err) {
      setError("Network error occurred. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageAnalysis = (extractedData: Partial<SoilData>) => {
    // Show a success message or notification about extracted data
    console.log("Image analysis completed:", extractedData);
  };

  const handleNewAnalysis = () => {
    setCurrentStep("input");
    setAnalysisResults(null);
    setError(null);
  };

  if (currentStep === "results" && analysisResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnalysisResults
            results={analysisResults}
            onNewAnalysis={handleNewAnalysis}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌱 AI-Powered Crop & Fertilizer Recommendation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized crop and fertilizer recommendations based on your soil analysis.
            Upload soil test reports or enter data manually to get started.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep === "input" ? "text-blue-600" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep === "input" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
                }`}>
                1
              </div>
              <span className="font-medium">Input Soil Data</span>
            </div>
            <div className="w-16 h-1 bg-gray-300 rounded"></div>
            <div className={`flex items-center space-x-2 ${currentStep === "results" ? "text-green-600" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep === "results" ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"
                }`}>
                2
              </div>
              <span className="font-medium">Get Recommendations</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-red-700">
                <span className="text-lg">❌</span>
                <span className="font-medium">Error: {error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 text-blue-700">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
                <span className="font-medium">Analyzing your soil data...</span>
              </div>
              <p className="text-sm text-blue-600 mt-2">
                This may take a few moments as we process your data through our AI models.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Features Overview */}
        {currentStep === "input" && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-center gap-2">
                  📸 Image Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Upload soil test reports and let AI extract the data automatically
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-center gap-2">
                  🤖 AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Get personalized crop and fertilizer recommendations based on your soil
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-center gap-2">
                  💰 Budget Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Receive cost estimates and profitability projections for your farm
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Form */}
        <SoilInputForm
          onSubmit={handleFormSubmit}
          onImageAnalysis={handleImageAnalysis}
          loading={loading}
        />

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500">
          <p className="text-sm">
            🌾 Helping farmers make informed decisions for better yields and sustainable agriculture
          </p>
          <p className="text-xs mt-2">
            * Results are based on AI analysis and should be used as guidance. Consult with local agronomists for best results.
          </p>
        </div>
      </div>
    </div>
  );
}
