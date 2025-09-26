"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { SoilAnalysisResult } from "@/types";

interface AnalysisResultsProps {
  results: SoilAnalysisResult;
  onNewAnalysis: () => void;
}

export default function AnalysisResults({ results, onNewAnalysis }: AnalysisResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 80) return "🌟";
    if (score >= 60) return "⚠️";
    return "❌";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          🌱 Your Soil Analysis Results
        </h1>
        <p className="text-gray-600">
          Generated on {new Date(results.timestamp).toLocaleDateString()}
        </p>
      </div>

      {/* Soil Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getScoreEmoji(results.soilHealth.overallScore)} Soil Health Score
          </CardTitle>
          <CardDescription>Overall assessment of your soil condition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-lg font-bold text-xl ${getScoreColor(results.soilHealth.overallScore)}`}>
                {results.soilHealth.overallScore}/100
              </div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${results.soilHealth.overallScore >= 80 ? 'bg-green-500' : results.soilHealth.overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${results.soilHealth.overallScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {results.soilHealth.strengths.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-green-700 flex items-center gap-1">
                  ✅ Soil Strengths
                </h4>
                <ul className="space-y-1">
                  {results.soilHealth.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {results.soilHealth.deficiencies.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-red-700 flex items-center gap-1">
                  🚨 Areas for Improvement
                </h4>
                <ul className="space-y-1">
                  {results.soilHealth.deficiencies.map((deficiency, index) => (
                    <li key={index} className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded">
                      {deficiency}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {results.soilHealth.recommendations.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-700 flex items-center gap-1">
                  💡 Recommendations
                </h4>
                <ul className="space-y-1">
                  {results.soilHealth.recommendations.map((recommendation, index) => (
                    <li key={index} className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded">
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Soil Data Summary */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Soil Composition</CardTitle>
          <CardDescription>Your soil's current nutrient levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{results.soilData.pH}</div>
              <div className="text-sm text-gray-600">pH Level</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{results.soilData.nitrogen}%</div>
              <div className="text-sm text-gray-600">Nitrogen (N)</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{results.soilData.phosphorus}%</div>
              <div className="text-sm text-gray-600">Phosphorus (P)</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{results.soilData.potassium}%</div>
              <div className="text-sm text-gray-600">Potassium (K)</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-cyan-600">{results.soilData.organicMatter}%</div>
              <div className="text-sm text-gray-600">Organic Matter</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-amber-600 capitalize">{results.soilData.texture}</div>
              <div className="text-sm text-gray-600">Soil Texture</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crop Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>🌾 Recommended Crops</CardTitle>
          <CardDescription>Best crops for your soil conditions, ranked by suitability and profitability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.cropRecommendations.map((crop, index) => (
              <div key={crop.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                      #{crop.profitabilityRank}
                    </div>
                    <h3 className="text-lg font-semibold">{crop.name}</h3>
                    {crop.scientificName && (
                      <span className="text-sm italic text-gray-500">({crop.scientificName})</span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Suitability Score</div>
                    <div className="text-lg font-bold text-green-600">{crop.suitabilityScore}/100</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div className="text-center bg-blue-50 p-2 rounded">
                    <div className="text-lg font-semibold text-blue-600">{crop.estimatedYield}</div>
                    <div className="text-xs text-gray-600">tons/hectare</div>
                  </div>
                  <div className="text-center bg-green-50 p-2 rounded">
                    <div className="text-lg font-semibold text-green-600">${crop.marketPrice}</div>
                    <div className="text-xs text-gray-600">per ton</div>
                  </div>
                  <div className="text-center bg-purple-50 p-2 rounded">
                    <div className="text-lg font-semibold text-purple-600">${crop.estimatedRevenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">revenue/hectare</div>
                  </div>
                  <div className="text-center bg-amber-50 p-2 rounded">
                    <div className="text-lg font-semibold text-amber-600">{crop.growthPeriod}</div>
                    <div className="text-xs text-gray-600">days</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded text-xs">
                    💧 {crop.waterRequirement} water need
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                    🗓️ {crop.seasonality.join(", ")}
                  </span>
                </div>

                {crop.reasons.length > 0 && (
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-gray-700">Why this crop is recommended:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {crop.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fertilizer Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>🧪 Fertilizer Recommendations</CardTitle>
          <CardDescription>Custom fertilizer mix for your soil</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* NPK Ratio */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Recommended NPK Ratio</h3>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{results.fertilizerMix.npkRatio.nitrogen}</div>
                  <div className="text-sm text-gray-600">Nitrogen (N)</div>
                </div>
                <div className="text-2xl text-gray-400">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{results.fertilizerMix.npkRatio.phosphorus}</div>
                  <div className="text-sm text-gray-600">Phosphorus (P)</div>
                </div>
                <div className="text-2xl text-gray-400">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{results.fertilizerMix.npkRatio.potassium}</div>
                  <div className="text-sm text-gray-600">Potassium (K)</div>
                </div>
              </div>
            </div>

            {/* Application Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Application Rate</h4>
                <div className="text-2xl font-bold text-blue-600">{results.fertilizerMix.applicationRate} kg/hectare</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Estimated Cost</h4>
                <div className="text-2xl font-bold text-green-600">${results.fertilizerMix.estimatedCost}</div>
              </div>
            </div>

            {/* Micronutrients */}
            {results.fertilizerMix.micronutrients && results.fertilizerMix.micronutrients.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Recommended Micronutrients</h4>
                <div className="grid grid-cols-3 gap-3">
                  {results.fertilizerMix.micronutrients.map((nutrient, index) => (
                    <div key={index} className="text-center bg-amber-50 p-3 rounded">
                      <div className="font-semibold text-amber-800">{nutrient.name}</div>
                      <div className="text-sm text-amber-600">{nutrient.amount}g</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Application Instructions */}
            <div>
              <h4 className="font-semibold mb-3">Application Instructions</h4>
              <div className="space-y-2">
                {results.fertilizerMix.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 bg-gray-50 rounded">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="text-sm">{instruction}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Timing */}
            <div>
              <h4 className="font-semibold mb-2">Application Timing</h4>
              <div className="flex flex-wrap gap-2">
                {results.fertilizerMix.applicationTiming.map((timing, index) => (
                  <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                    {timing}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>🛒 Recommended Fertilizer Products</CardTitle>
          <CardDescription>Available products that match your soil needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.fertilizerProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${product.availability === 'available' ? 'bg-green-100 text-green-800' :
                      product.availability === 'limited' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                    {product.availability}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div>
                    <div className="text-sm text-gray-600">Brand</div>
                    <div className="font-semibold">{product.brand}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">NPK Ratio</div>
                    <div className="font-semibold">{product.npkRatio}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Price</div>
                    <div className="font-semibold">${product.price}/{product.bagSize}kg bag</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Supplier</div>
                    <div className="font-semibold text-sm">{product.supplier}</div>
                  </div>
                </div>

                {product.description && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{product.description}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Estimation */}
      <Card>
        <CardHeader>
          <CardTitle>💰 Budget Estimation</CardTitle>
          <CardDescription>Cost breakdown and profit projection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Input Costs (per hectare)</h4>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span>Seeds</span>
                  <span className="font-semibold">${results.estimatedBudget.seedCost}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Fertilizers</span>
                  <span className="font-semibold">${results.estimatedBudget.fertilizerCost}</span>
                </div>
                <div className="flex justify-between py-2 border-b font-semibold">
                  <span>Total Input Cost</span>
                  <span>${results.estimatedBudget.totalInputCost}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Profit Projection</h4>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${results.estimatedBudget.estimatedProfit.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Estimated Profit per Hectare</div>
                </div>
                <div className="mt-2 text-xs text-center text-gray-500">
                  *Based on current market prices and optimal yields
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        <Button onClick={onNewAnalysis} size="lg" className="px-8">
          🔄 Start New Analysis
        </Button>
      </div>
    </div>
  );
}
