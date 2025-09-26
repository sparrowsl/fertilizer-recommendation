import { type NextRequest, NextResponse } from "next/server";
import type {
	ApiResponse,
	CropRecommendation,
	FertilizerMix,
	FertilizerProduct,
	SoilAnalysisResult,
	SoilData,
} from "@/types";

// Mock AI analysis functions - replace with actual ML models
function analyzeSoilHealth(soilData: SoilData) {
	const deficiencies = [];
	const strengths = [];
	const recommendations = [];

	// Analyze pH
	if (soilData.pH < 6.0) {
		deficiencies.push("Acidic soil (low pH)");
		recommendations.push("Apply lime to increase soil pH");
	} else if (soilData.pH > 8.0) {
		deficiencies.push("Alkaline soil (high pH)");
		recommendations.push("Add organic matter or sulfur to lower pH");
	} else {
		strengths.push("Optimal pH range for most crops");
	}

	// Analyze nutrients
	if (soilData.nitrogen < 0.5) {
		deficiencies.push("Low nitrogen content");
		recommendations.push("Apply nitrogen-rich fertilizers or compost");
	} else if (soilData.nitrogen > 1.5) {
		strengths.push("Adequate nitrogen levels");
	}

	if (soilData.phosphorus < 0.1) {
		deficiencies.push("Phosphorus deficiency");
		recommendations.push("Apply phosphate fertilizers");
	} else {
		strengths.push("Good phosphorus levels");
	}

	if (soilData.potassium < 0.5) {
		deficiencies.push("Low potassium levels");
		recommendations.push("Apply potassium-rich fertilizers");
	} else {
		strengths.push("Adequate potassium content");
	}

	// Analyze organic matter
	if (soilData.organicMatter < 2.0) {
		deficiencies.push("Low organic matter");
		recommendations.push(
			"Increase organic matter through compost or cover crops",
		);
	} else {
		strengths.push("Good organic matter content");
	}

	// Calculate overall score
	const scores = [
		soilData.pH >= 6.0 && soilData.pH <= 7.5 ? 25 : 15,
		soilData.nitrogen >= 0.8 ? 25 : soilData.nitrogen * 30,
		soilData.phosphorus >= 0.15 ? 20 : soilData.phosphorus * 100,
		soilData.potassium >= 0.8 ? 20 : soilData.potassium * 25,
		soilData.organicMatter >= 2.5 ? 10 : soilData.organicMatter * 4,
	];

	const overallScore = Math.min(
		100,
		scores.reduce((a, b) => a + b, 0),
	);

	return {
		overallScore,
		deficiencies,
		strengths,
		recommendations,
	};
}

function generateCropRecommendations(soilData: SoilData): CropRecommendation[] {
	const crops = [];

	// Rice recommendations
	if (soilData.texture === "clay" || soilData.texture === "clay-loam") {
		crops.push({
			id: "rice-001",
			name: "Rice",
			scientificName: "Oryza sativa",
			suitabilityScore: 85,
			profitabilityRank: 1,
			estimatedYield: 4.5,
			marketPrice: 25,
			estimatedRevenue: 112500,
			growthPeriod: 120,
			waterRequirement: "high" as const,
			seasonality: ["monsoon", "winter"],
			reasons: [
				"Clay soil retains water well for rice cultivation",
				"Good market demand and stable prices",
			],
		});
	}

	// Wheat recommendations
	if (soilData.pH >= 6.0 && soilData.pH <= 7.5) {
		crops.push({
			id: "wheat-001",
			name: "Wheat",
			scientificName: "Triticum aestivum",
			suitabilityScore: 78,
			profitabilityRank: 2,
			estimatedYield: 3.2,
			marketPrice: 22,
			estimatedRevenue: 70400,
			growthPeriod: 90,
			waterRequirement: "medium" as const,
			seasonality: ["winter", "spring"],
			reasons: [
				"Optimal pH range for wheat cultivation",
				"Good nitrogen content supports growth",
			],
		});
	}

	// Tomato recommendations
	if (soilData.organicMatter >= 2.0 && soilData.texture !== "clay") {
		crops.push({
			id: "tomato-001",
			name: "Tomato",
			scientificName: "Solanum lycopersicum",
			suitabilityScore: 82,
			profitabilityRank: 1,
			estimatedYield: 25,
			marketPrice: 15,
			estimatedRevenue: 375000,
			growthPeriod: 75,
			waterRequirement: "medium" as const,
			seasonality: ["spring", "summer"],
			reasons: [
				"High organic matter supports vegetable growth",
				"Well-draining soil prevents root rot",
				"High market value crop",
			],
		});
	}

	// Maize recommendations
	if (soilData.nitrogen >= 0.8) {
		crops.push({
			id: "maize-001",
			name: "Maize",
			scientificName: "Zea mays",
			suitabilityScore: 75,
			profitabilityRank: 3,
			estimatedYield: 5.5,
			marketPrice: 18,
			estimatedRevenue: 99000,
			growthPeriod: 85,
			waterRequirement: "medium" as const,
			seasonality: ["summer", "monsoon"],
			reasons: [
				"Adequate nitrogen levels for corn growth",
				"Good yield potential in suitable conditions",
			],
		});
	}

	// Sort by profitability and suitability
	return crops.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}

function calculateFertilizerMix(soilData: SoilData): FertilizerMix {
	// Calculate needed nutrients based on deficiencies
	const nitrogenNeeded = Math.max(0, 1.2 - soilData.nitrogen) * 50;
	const phosphorusNeeded = Math.max(0, 0.2 - soilData.phosphorus) * 100;
	const potassiumNeeded = Math.max(0, 1.0 - soilData.potassium) * 40;

	// Base application rate
	const baseRate = 150; // kg per hectare

	return {
		npkRatio: {
			nitrogen: Math.round(nitrogenNeeded),
			phosphorus: Math.round(phosphorusNeeded),
			potassium: Math.round(potassiumNeeded),
		},
		applicationRate: baseRate,
		estimatedCost: baseRate * 2.5, // $2.5 per kg
		micronutrients: [
			{ name: "Zinc", amount: 5 },
			{ name: "Boron", amount: 2 },
			{ name: "Iron", amount: 10 },
		],
		applicationTiming: ["pre-planting", "mid-season"],
		instructions: [
			"Apply 70% of fertilizer before planting",
			"Apply remaining 30% during mid-growth stage",
			"Mix well with soil before sowing seeds",
			"Water thoroughly after application",
		],
	};
}

function getFertilizerProducts(
	fertilizerMix: FertilizerMix,
): FertilizerProduct[] {
	const { nitrogen, phosphorus, potassium } = fertilizerMix.npkRatio;

	return [
		{
			id: "fert-001",
			name: "NPK Complex Fertilizer",
			brand: "AgriGrow",
			npkRatio: `${nitrogen}-${phosphorus}-${potassium}`,
			price: 45,
			bagSize: 50,
			availability: "available" as const,
			supplier: "Local Agricultural Store",
			description: "Balanced NPK fertilizer suitable for most crops",
		},
		{
			id: "fert-002",
			name: "Organic Compost Blend",
			brand: "EcoFarm",
			npkRatio: "8-4-6",
			price: 25,
			bagSize: 25,
			availability: "available" as const,
			supplier: "Organic Suppliers Co.",
			description: "Slow-release organic fertilizer with micronutrients",
		},
		{
			id: "fert-003",
			name: "High Nitrogen Fertilizer",
			brand: "CropMax",
			npkRatio: `${Math.max(nitrogen, 20)}-5-5`,
			price: 55,
			bagSize: 50,
			availability: nitrogen > 15 ? "available" : ("limited" as const),
			supplier: "Agricultural Supply Center",
			description: "High nitrogen content for nitrogen-deficient soils",
		},
	];
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const soilData: SoilData = body.soilData;

		// Validate required fields
		const requiredFields = [
			"pH",
			"nitrogen",
			"phosphorus",
			"potassium",
			"organicMatter",
			"texture",
		];
		for (const field of requiredFields) {
			if (
				!(field in soilData) ||
				soilData[field as keyof SoilData] === undefined
			) {
				return NextResponse.json<ApiResponse>(
					{
						success: false,
						message: `Missing required field: ${field}`,
						error: "Validation error",
						timestamp: new Date().toISOString(),
					},
					{ status: 400 },
				);
			}
		}

		// Generate analysis
		const soilHealth = analyzeSoilHealth(soilData);
		const cropRecommendations = generateCropRecommendations(soilData);
		const fertilizerMix = calculateFertilizerMix(soilData);
		const fertilizerProducts = getFertilizerProducts(fertilizerMix);

		// Calculate estimated budget
		const avgSeedCost = 150; // per hectare
		const fertilizerCost = fertilizerMix.estimatedCost;
		const totalInputCost = avgSeedCost + fertilizerCost;
		const estimatedRevenue =
			cropRecommendations.length > 0
				? cropRecommendations[0].estimatedRevenue
				: 0;
		const estimatedProfit = estimatedRevenue - totalInputCost;

		const analysisResult: SoilAnalysisResult = {
			id: `analysis_${Date.now()}`,
			timestamp: new Date().toISOString(),
			soilData,
			soilHealth,
			cropRecommendations,
			fertilizerMix,
			fertilizerProducts,
			estimatedBudget: {
				seedCost: avgSeedCost,
				fertilizerCost,
				totalInputCost,
				estimatedProfit,
			},
		};

		return NextResponse.json<ApiResponse<SoilAnalysisResult>>({
			success: true,
			message: "Soil analysis completed successfully",
			data: analysisResult,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error analyzing soil:", error);

		return NextResponse.json<ApiResponse>(
			{
				success: false,
				message: "Failed to analyze soil data",
				error:
					error instanceof Error ? error.message : "Unknown error occurred",
				timestamp: new Date().toISOString(),
			},
			{ status: 500 },
		);
	}
}

export async function GET(request: NextRequest) {
	return NextResponse.json<ApiResponse>({
		success: true,
		message: "Soil analysis endpoint is ready",
		data: {
			requiredFields: [
				"pH",
				"nitrogen",
				"phosphorus",
				"potassium",
				"organicMatter",
				"texture",
			],
			supportedTextures: [
				"clay",
				"sand",
				"loam",
				"silt",
				"clay-loam",
				"sandy-loam",
				"silty-loam",
			],
			analysisFeatures: [
				"Soil health assessment",
				"Crop recommendations",
				"Fertilizer mix calculation",
				"Product recommendations",
				"Budget estimation",
			],
		},
		timestamp: new Date().toISOString(),
	});
}
