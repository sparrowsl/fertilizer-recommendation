"use client";

import { useState, useId } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analyzeImageForSoilData, isValidImageFile } from "@/lib/imageUtils";

interface SoilData {
  pH?: number;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  location?: string;
}

interface FormData {
  soilData: SoilData;
  farmSize: number;
  crops: string;
  imageFile?: File;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    soilData: {}
  });

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // Generate unique IDs for form fields
  const farmSizeId = useId();
  const locationId = useId();
  const cropsId = useId();
  const phId = useId();
  const nitrogenId = useId();
  const phosphorusId = useId();
  const potassiumId = useId();
  const [results, setResults] = useState<{
    recommendedCrops: Array<{
      name: string;
      suitability: number;
      expectedYield: string;
    }>;
    fertilizerRecommendation: {
      npkRatio: string;
      quantity: string;
      estimatedCost: string;
    };
    soilHealth: {
      status: string;
      improvements: string[];
    };
  } | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    setFormData(prev => ({ ...prev, imageFile: file }));

    try {
      // Validate file before processing
      if (!isValidImageFile(file)) {
        throw new Error("Invalid file format or size. Please upload a JPEG, PNG, or WebP image under 10MB.");
      }

      // Use utility function to analyze image
      const extractedData = await analyzeImageForSoilData(file);

      setFormData(prev => ({
        ...prev,
        soilData: { ...prev.soilData, ...extractedData }
      }));

    } catch (error) {
      console.error("Error analyzing image:", error);

      // Show error message to user
      alert(`Error analyzing image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate intelligent recommendations based on actual soil data
      const recommendations = await generateRecommendations(formData.soilData);
      setResults(recommendations);

    } catch (error) {
      console.error("Error getting recommendations:", error);

      // Fallback to basic recommendations
      const fallbackResults = {
        recommendedCrops: [
          {
            name: "Mixed Vegetables",
            suitability: 75,
            expectedYield: "15-20 tons/hectare"
          }
        ],
        fertilizerRecommendation: {
          npkRatio: "10-10-10",
          quantity: "200 kg/hectare",
          estimatedCost: "$150"
        },
        soilHealth: {
          status: "Needs Analysis",
          improvements: ["Get detailed soil test", "Monitor nutrient levels"]
        }
      };

      setResults(fallbackResults);
    } finally {
      setLoading(false);
    }
  };

  // AI-powered recommendation engine
  const generateRecommendations = async (soilData: SoilData) => {
    // Analyze soil parameters for recommendations
    const pH = soilData.pH || 6.5;
    const nitrogen = soilData.nitrogen || 0.8;
    const phosphorus = soilData.phosphorus || 0.15;
    const potassium = soilData.potassium || 0.9;

    // Determine soil health status
    let soilStatus = "Good";
    const improvements: string[] = [];

    if (pH < 6.0) {
      soilStatus = "Acidic";
      improvements.push("Apply lime to increase pH");
    } else if (pH > 7.5) {
      soilStatus = "Alkaline";
      improvements.push("Apply sulfur to decrease pH");
    }

    if (nitrogen < 0.5) {
      improvements.push("Increase nitrogen with organic compost");
    }
    if (phosphorus < 0.1) {
      improvements.push("Add phosphate fertilizer");
    }
    if (potassium < 0.8) {
      improvements.push("Apply potassium-rich fertilizer");
    }

    if (improvements.length === 0) {
      improvements.push("Maintain current nutrient balance", "Regular soil testing recommended");
    }

    // Crop recommendations based on soil conditions
    const recommendedCrops = [];

    // Tomatoes (prefer slightly acidic, high nutrients)
    if (pH >= 6.0 && pH <= 7.0 && nitrogen >= 0.6) {
      recommendedCrops.push({
        name: "Tomato",
        suitability: Math.min(95, 60 + (nitrogen * 30) + (7 - Math.abs(pH - 6.5)) * 5),
        expectedYield: `${Math.round(20 + nitrogen * 10)} tons/hectare`
      });
    }

    // Lettuce (tolerates wider pH range, lower nutrient needs)
    recommendedCrops.push({
      name: "Lettuce",
      suitability: Math.min(95, 70 + (phosphorus * 100) + (8 - Math.abs(pH - 6.8)) * 3),
      expectedYield: `${Math.round(12 + phosphorus * 20)} tons/hectare`
    });

    // Peppers (need good potassium)
    if (potassium >= 0.7) {
      recommendedCrops.push({
        name: "Pepper",
        suitability: Math.min(95, 65 + (potassium * 25) + (7.5 - Math.abs(pH - 6.8)) * 4),
        expectedYield: `${Math.round(15 + potassium * 8)} tons/hectare`
      });
    }

    // Ensure at least one crop recommendation
    if (recommendedCrops.length === 0) {
      recommendedCrops.push({
        name: "Hardy Vegetables",
        suitability: 70,
        expectedYield: "10-15 tons/hectare"
      });
    }

    // Calculate NPK ratio needed
    let nRatio = 10;
    let pRatio = 10;
    let kRatio = 10;

    if (nitrogen < 0.8) nRatio = 15;
    if (nitrogen < 0.5) nRatio = 20;

    if (phosphorus < 0.15) pRatio = 15;
    if (phosphorus < 0.1) pRatio = 20;

    if (potassium < 0.9) kRatio = 15;
    if (potassium < 0.7) kRatio = 20;

    const fertilizerCost = Math.round((nRatio + pRatio + kRatio) * 2.5 + 100);

    return {
      recommendedCrops: recommendedCrops.slice(0, 3), // Top 3 recommendations
      fertilizerRecommendation: {
        npkRatio: `${nRatio}-${pRatio}-${kRatio}`,
        quantity: `${Math.round(150 + (nRatio + pRatio + kRatio) * 3)} kg/hectare`,
        estimatedCost: `$${fertilizerCost}`
      },
      soilHealth: {
        status: soilStatus,
        improvements
      }
    };
  };

  const updateSoilData = (field: keyof SoilData, value: string) => {
    setFormData(prev => ({
      ...prev,
      soilData: {
        ...prev.soilData,
        [field]: field === 'location' ? value : parseFloat(value) || undefined
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            🌱 Smart Crop & Fertilizer Advisor
          </h1>
          <p className="text-lg text-green-600">
            Get AI-powered recommendations for your farm
          </p>
        </div>

        {!results ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📸 Upload Soil Test Report (Optional)
                </CardTitle>
                <CardDescription>
                  Upload a photo of your soil test report for automatic data extraction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                    className="cursor-pointer"
                  />
                  {imageUploading && (
                    <p className="text-sm text-blue-600 mt-2">
                      🔍 Analyzing soil test image...
                    </p>
                  )}
                  {formData.imageFile && !imageUploading && (
                    <p className="text-sm text-green-600 mt-2">
                      ✅ Image uploaded: {formData.imageFile.name}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>



            {/* Soil Data */}
            <Card>
              <CardHeader>
                <CardTitle>🧪 Soil Information</CardTitle>
                <CardDescription>
                  {Object.keys(formData.soilData).some(key => key !== 'location' && formData.soilData[key as keyof SoilData])
                    ? "Data extracted from uploaded image"
                    : "Enter your soil test results (if available)"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor={phId} className="text-sm font-medium">pH Level</label>
                  <Input
                    id={phId}
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={formData.soilData.pH || ""}
                    onChange={(e) => updateSoilData("pH", e.target.value)}
                    placeholder="6.5 (neutral)"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor={nitrogenId} className="text-sm font-medium">Nitrogen (%)</label>
                  <Input
                    id={nitrogenId}
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.soilData.nitrogen || ""}
                    onChange={(e) => updateSoilData("nitrogen", e.target.value)}
                    placeholder="0.8"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor={phosphorusId} className="text-sm font-medium">Phosphorus (%)</label>
                  <Input
                    id={phosphorusId}
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.soilData.phosphorus || ""}
                    onChange={(e) => updateSoilData("phosphorus", e.target.value)}
                    placeholder="0.15"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor={potassiumId} className="text-sm font-medium">Potassium (%)</label>
                  <Input
                    id={potassiumId}
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.soilData.potassium || ""}
                    onChange={(e) => updateSoilData("potassium", e.target.value)}
                    placeholder="0.9"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">🔄</span>
                  Analyzing Your Farm...
                </>
              ) : (
                "Get Smart Recommendations 🚀"
              )}
            </Button>
          </form>
        ) : (
          /* Results Display */
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                📊 Your Personalized Recommendations
              </h2>
              <p className="text-green-600">Based on your farm's soil conditions</p>
            </div>

            {/* Recommended Crops */}
            <Card>
              <CardHeader>
                <CardTitle>🌱 Best Crops for Your Soil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {results.recommendedCrops.map((crop, index) => (
                    <div key={`crop-${crop.name}-${index}`} className="bg-green-50 p-4 rounded-lg border">
                      <h3 className="font-semibold text-green-800">{crop.name}</h3>
                      <p className="text-sm text-green-600">
                        Suitability: {crop.suitability}%
                      </p>
                      <p className="text-sm text-gray-600">
                        Expected: {crop.expectedYield}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fertilizer Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle>🧪 Fertilizer Recommendation</CardTitle>
              </CardHeader>
              <CardContent className="bg-blue-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">NPK Ratio</p>
                    <p className="font-semibold text-blue-800">
                      {results.fertilizerRecommendation.npkRatio}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Quantity Needed</p>
                    <p className="font-semibold text-blue-800">
                      {results.fertilizerRecommendation.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Cost</p>
                    <p className="font-semibold text-blue-800">
                      {results.fertilizerRecommendation.estimatedCost}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Soil Health */}
            <Card>
              <CardHeader>
                <CardTitle>🌍 Soil Health Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-green-800 mb-2">
                    Status: {results.soilHealth.status}
                  </p>
                  <div>
                    <p className="text-sm font-medium mb-2">Recommendations:</p>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {results.soilHealth.improvements.map((improvement) => (
                        <li key={improvement}>{improvement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => {
                setResults(null);
                setFormData({
                  soilData: {}
                });
              }}
              variant="outline"
              className="w-full"
              size="lg"
            >
              🔄 Analyze Another Farm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
